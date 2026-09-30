#!/usr/bin/env node
/*
 * Consistency check of the properties of a Corvina SDK widget.
 *
 *   node .claude/skills/corvina-widget/scripts/check-widget.js src/widgets/<Name>
 *
 * Every custom property must be in four places, with the same name:
 *   - the properties handler (<Name>PropsHandler.ts): this.<prop> = { ... }
 *   - the constructor of the class: this.<prop> = ... args.initState.<prop>
 *   - serialize() of the class: serializedWgt.<prop> = this.<prop>(.v)
 *   - the default configuration of the gallery (<Name>Gallery.ts): "<prop>": <default>
 * A property with attachTag: true (datalinks) must be a Value, serialized with .v.
 *
 * The check reads the files as text, following the conventions of the files created by
 * `corvina-sdk create widget`: it is a help, not a parser. Exit code 1 when it finds errors.
 */
const fs = require("fs");
const path = require("path");

// Keys serialized by the base classes (BaseWgt, BaseGraphicWgt): not widget properties
const BASE_KEYS = new Set([
  "type", "class", "name", "id", "parentId", "unselectable", "version", "wgts", "datalinks", "events",
  "mapAssets", "disabled", "childrenOverflow", "eventsAlias", "props", "assets", "position", "visible",
  "x", "y", "minY", "tx", "ty", "tz", "rx", "ry", "rz", "sx", "sy", "sz", "supportedIn3D", "displayAsBillboard",
  "width", "height", "prevHeight", "prevWidth", "prevX", "prevY", "fullscreenMode", "placeholderWidth",
  "placeholderHeight", "pinned", "depth", "cx", "cy", "mtx", "xformScaling", "keepAspectRatio", "opacity",
  "display", "layout", "layoutConfiguration", "bgColor", "elevation", "showPermissions", "usePermissions",
  "enabledForGroups", "visibleForGroups",
  ...["top", "bottom", "left", "right"].flatMap(side => [`${side}Stroke`, `${side}StrokeStyle`, `${side}StrokeColor`]),
  ...["Top", "Bottom", "Left", "Right"].map(side => `padding${side}`)
]);
// Keys the gallery default configuration must have
const REQUIRED_DEFAULTS = ["type", "x", "y", "width", "height"];

function read(file) {
  return fs.readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
}

// Body of the block starting at the first "{" after index, with balanced braces
function blockAfter(text, index) {
  const start = text.indexOf("{", index);
  if (start < 0) return "";
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] == "{") depth++;
    else if (text[i] == "}" && --depth == 0) return text.slice(start + 1, i);
  }
  return text.slice(start + 1);
}

function methodBody(text, name) {
  const match = new RegExp(`\\b${name}\\s*\\([^)]*\\)\\s*(:[^{]+)?\\{`).exec(text);
  return match ? blockAfter(text, match.index + match[0].length - 1) : null;
}

// Top-level keys of an object literal body
function objectKeys(body) {
  const keys = [];
  let depth = 0;
  for (const match of body.matchAll(/[{}]|(?:^|[,{\s])["']?([A-Za-z_$][\w$]*)["']?\s*:/g)) {
    if (match[0] == "{") depth++;
    else if (match[0] == "}") depth--;
    else if (depth == 0) keys.push(match[1]);
  }
  return keys;
}

// Files by content: the properties handler can also be in the gallery file, or imported by it
function findFiles(dir) {
  const files = fs.readdirSync(dir).filter(f => /\.(ts|tsx)$/.test(f)).map(f => ({ f, text: read(path.join(dir, f)) }));
  const having = (re) => files.find(({ text }) => re.test(text))?.f;
  const found = {
    classFile: having(/extends\s+BaseGraphicWgt\b/),
    propsFile: having(/extends\s+Base(Graphic)?PropsHandler\b/),
    galleryFile: having(/extends\s+BaseGallery\b/)
  };
  if (!found.propsFile && found.galleryFile) {
    const gallery = read(path.join(dir, found.galleryFile));
    const handlerClass = gallery.match(/propsHandler\s*=\s*new\s+([A-Za-z_$][\w$]*)/)?.[1];
    const from = handlerClass && gallery.match(new RegExp(`import\\s+${handlerClass}\\s+from\\s*["'](\\.[^"']+)["']`))?.[1];
    const file = from && [".ts", ".tsx"].map(ext => path.join(dir, from + ext)).find(f => fs.existsSync(f));
    if (file) found.propsFile = path.relative(dir, file);
  }
  return found;
}

function propsHandler(text) {
  const body = methodBody(text, "createCustomPropsHandler") || "";
  const props = {};
  for (const match of body.matchAll(/this\.([A-Za-z_$][\w$]*)\s*=\s*\{/g)) {
    const handler = blockAfter(body, match.index + match[0].length - 1);
    const field = (name) => handler.match(new RegExp(`\\b${name}\\s*:\\s*(["'][^"']*["']|true|false|[\\w.]+)`))?.[1]?.replace(/["']/g, "");
    props[match[1]] = { type: field("type"), propControl: field("propControl"), attachTag: field("attachTag") == "true",
      supportI18n: field("supportI18n") == "true", attachTagPermission: field("attachTagPermission") };
  }
  return props;
}

function classInfo(text) {
  let constructorBody = methodBody(text, "constructor") || "";
  // Aliases of the state: const state = args.initState; state.level ?? 50
  for (const alias of constructorBody.matchAll(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*[A-Za-z_$][\w$]*\.initState\b[^;\n]*/g))
    constructorBody = constructorBody.replace(new RegExp(`(^|[^\\w$.])${alias[1]}\\s*(\\?\\.|\\.|\\[)`, "g"), "$1initState$2");
  const read = {}, unread = {};
  for (const match of constructorBody.matchAll(/this\.([A-Za-z_$][\w$]*)\s*=\s*([^;]*)/g)) {
    const expression = match[2];
    const isValue = /new\s+Value\s*[<(]/.test(expression);
    // Keys of initState read by the expression: the one named as the field, else the first one
    const keys = [...expression.matchAll(/initState\s*(?:\?\.|\.)\s*([A-Za-z_$][\w$]*)|initState\s*\[\s*["']([^"']+)["']\s*\]/g)]
      .map(m => m[1] || m[2]);
    const initState = keys.length ? [null, keys.includes(match[1]) ? match[1] : keys[0]] : null;
    // A default in the constructor: initState.x || d, initState.x ?? d, initState.x ? ... : d
    const hasDefault = /\|\||\?\?|\?[^.]/.test(expression);
    if (initState) read[match[1]] = { key: initState[1], isValue, hasDefault, expression };
    else if (isValue) unread[match[1]] = { isValue };
  }
  const serializeBody = methodBody(text, "serialize") || "";
  const variable = serializeBody.match(/(?:let|const|var)\s+([A-Za-z_$][\w$]*)\s*=\s*super\.serialize\(\s*\)/)?.[1];
  const serialized = {};
  if (variable) {
    for (const match of serializeBody.matchAll(new RegExp(`\\b${variable}\\.([A-Za-z_$][\\w$]*)\\s*=\\s*([^;]*)`, "g")))
      // The value of a Value: .v, .unwrap() or .resolve() (maybe converted, e.g. .unwrap().getTime())
      serialized[match[1]] = { expression: match[2].trim(), usesV: /\.(v\b|unwrap\s*\(|resolve\s*\()/.test(match[2]) };
  }
  return { read, unread, serialized, hasSerialize: !!variable };
}

function galleryKeys(text) {
  const body = methodBody(text, "getDefaultConfiguration");
  if (!body) return null;
  const ret = body.match(/return\s*\{/);
  return ret ? objectKeys(blockAfter(body, ret.index + ret[0].length - 1)) : null;
}

function main(dir) {
  if (!dir || !fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    console.error("Usage: node check-widget.js <widget folder>");
    process.exit(2);
  }
  const files = findFiles(dir);
  const errors = [], warnings = [];
  for (const [name, file] of Object.entries(files))
    if (!file) errors.push(`${name.replace("File", "")} file not found in ${dir}`);
  if (errors.length) return report(dir, null, errors, warnings);

  const props = propsHandler(read(path.join(dir, files.propsFile)));
  const cls = classInfo(read(path.join(dir, files.classFile)));
  const defaults = galleryKeys(read(path.join(dir, files.galleryFile)));
  if (!cls.hasSerialize) errors.push(`${files.classFile}: serialize() with "let s = super.serialize()" not found`);
  if (!defaults) errors.push(`${files.galleryFile}: getDefaultConfiguration() returning an object not found`);

  // Fields of the class read from initState, by serialized key
  const byKey = {};
  for (const [field, info] of Object.entries(cls.read)) byKey[info.key] = { field, ...info };

  for (const key of REQUIRED_DEFAULTS)
    if (defaults && !defaults.includes(key)) errors.push(`${files.galleryFile}: getDefaultConfiguration() without "${key}"` +
      (key == "x" || key == "y" ? " (without x the widget gets size 0)" : ""));

  // Base properties (e.g. wgts edited by a dataset list control) are serialized by the base classes
  const custom = (name) => !BASE_KEYS.has(name);
  const names = new Set([...Object.keys(props), ...Object.keys(byKey), ...Object.keys(cls.serialized),
    ...(defaults || [])].filter(custom));
  for (const name of Object.keys(byKey).filter(n => !custom(n)))
    errors.push(`${name}: reserved name of the base classes, used as widget property`);
  const rows = [];
  for (const name of names) {
    const handler = props[name], ctor = byKey[name], ser = cls.serialized[name];
    const inDefaults = (defaults || []).includes(name);
    rows.push({ name, handler, ctor, ser, inDefaults });

    // Values not read from initState: filled only by datalinks (e.g. the source of a dataset)
    const datalinkOnly = !ctor && cls.unread[name];
    if (datalinkOnly && !handler?.attachTag) warnings.push(`${name}: Value not read from args.initState and without attachTag: it is never set`);
    if (handler && !ctor && !datalinkOnly) errors.push(`${name}: in the properties handler, not read from args.initState in the constructor`);
    if (ctor && !ser) errors.push(`${name}: read in the constructor, not written by serialize() (lost when the dashboard is saved)`);
    if (ser && !ctor) warnings.push(`${name}: written by serialize(), not read in the constructor`);
    if (handler && !inDefaults && !ctor?.hasDefault && !datalinkOnly) warnings.push(`${name}: no default in getDefaultConfiguration() of the gallery nor in the constructor`);
    if (inDefaults && !ctor && !datalinkOnly) warnings.push(`${name}: default in the gallery, not read by the constructor (leftover?)`);
    if (!handler && ctor) warnings.push(`${name}: not in the properties handler (not editable in the editor): intended?`);
    if (handler?.attachTag && ctor && !ctor.isValue) errors.push(`${name}: attachTag: true, the field must be a Value (new Value( args.initState.${name} ))`);
    if (ctor?.isValue && ser && !ser.usesV) errors.push(`${name}: Value field, serialize() must write its value (this.${ctor.field}.v or .unwrap()), not the Value`);
    if (ctor && !ctor.isValue && ser?.usesV) errors.push(`${name}: plain field, serialize() reads it as a Value`);
    if (ctor?.expression?.includes("||") && ["numeric", "boolean"].includes(handler?.type))
      warnings.push(`${name}: default with || in the constructor replaces also ${handler.type == "numeric" ? "0" : "false"}: use ?? or !== undefined`);
    if (ctor && ctor.field != name) warnings.push(`${name}: stored in the field this.${ctor.field}, the property name is ${name}`);
  }
  // Properties written by the widget at runtime (buttons, switches, inputs of the view)
  const sources = fs.readdirSync(dir).filter(f => /\.(ts|tsx|vue)$/.test(f)).map(f => read(path.join(dir, f))).join("\n");
  const written = new Set([...sources.matchAll(/setPropertyValue\s*\(\s*\{\s*prop\s*:\s*["']([^"']+)["']/g)].map(m => m[1]));
  for (const name of written) {
    const handler = props[name];
    if (!handler) warnings.push(`${name}: written by the widget with setPropertyValue, not in the properties handler`);
    else if (!handler.attachTag) warnings.push(`${name}: written by the widget, without attachTag the value is not written to any tag: intended?`);
    else if (!["readwrite", "write"].includes(handler.attachTagPermission))
      warnings.push(`${name}: written by the widget, add attachTagPermission: "readwrite" to let the datalink write the tag`);
  }
  if (written.size && !/getInEditor/.test(sources))
    warnings.push(`writes ${[...written].join(", ")} at runtime: check projectStore.getInEditor to do nothing in the editor`);

  report(dir, rows, errors, warnings);
}

function report(dir, rows, errors, warnings) {
  console.log(`Widget ${dir}`);
  if (rows) {
    const mark = (ok) => (ok ? "x" : "-");
    console.log("\n  property              handler  constructor  serialize  default  Value  datalink  i18n");
    for (const { name, handler, ctor, ser, inDefaults } of rows)
      console.log(`  ${name.padEnd(22)}${mark(handler).padEnd(9)}${mark(ctor).padEnd(13)}${mark(ser).padEnd(11)}` +
        `${mark(inDefaults).padEnd(9)}${mark(ctor?.isValue).padEnd(7)}${mark(handler?.attachTag).padEnd(10)}${mark(handler?.supportI18n)}`);
  }
  for (const e of errors) console.log(`\nerror: ${e}`);
  for (const w of warnings) console.log(`\nwarning: ${w}`);
  console.log(`\n${errors.length} errors, ${warnings.length} warnings`);
  process.exit(errors.length ? 1 : 0);
}

main(process.argv[2]);
