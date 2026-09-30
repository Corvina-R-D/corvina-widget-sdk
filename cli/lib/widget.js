/*
 * corvina-sdk create widget <tech> <Name>
 *
 * Creates the files of the widget from templates/common and templates/<tech>, registers it in
 * src/main.ts, adds its type to src/manifest.json and prepares the build for the technology
 * (dependencies, webpack and tsconfig changes).
 */
const fs = require("fs");
const path = require("path");
const { Changes } = require("./changes");
const { applySetup } = require("./setup");
const { resolveTech, techs } = require("./techs");
const project = require("./project");
const { CliError } = project;

const TEMPLATES = path.join(__dirname, "..", "templates");
const DEFAULT_DIR = "src/widgets";
const DEFAULT_CATEGORY = "MyGallery";

// "TemperatureGauge", "temperature-gauge", "acme_gauges" -> the words of the name
function words(input) {
  return String(input)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
}

function kebab(input) {
  return words(input).map(w => w.toLowerCase()).join("-");
}

/* Names derived from the one given by the user: "temperature-gauge" -> TemperatureGauge, temperatureGauge, ... */
function widgetNames(input) {
  const parts = words(input);
  const Name = parts.map(w => w[0].toUpperCase() + w.slice(1)).join("");
  if (!/^[A-Z][A-Za-z0-9]*$/.test(Name))
    throw new CliError(`Invalid widget name "${input}": use letters and digits, starting with a letter (e.g. TemperatureGauge)`);
  return {
    Name,
    camelName: Name[0].toLowerCase() + Name.slice(1),
    kebabName: kebab(input),
    title: parts.map(w => w[0].toUpperCase() + w.slice(1)).join(" ")
  };
}

function fill(text, vars) {
  return text.replace(/__([A-Za-z]+)__/g, (token, name) => (name in vars ? vars[name] : token));
}

// Template files of a folder: "__Name__View.tsx.tpl" -> "TemperatureGaugeView.tsx"
function templateFiles(folder, vars) {
  const dir = path.join(TEMPLATES, folder);
  return fs.readdirSync(dir)
    .filter(file => file.endsWith(".tpl"))
    .map(file => ({
      name: fill(file.slice(0, -".tpl".length), vars),
      content: fill(fs.readFileSync(path.join(dir, file), "utf8"), vars)
    }));
}

function registrationBlock(tech, vars, importDir) {
  const { Name, camelName, type, category } = vars;
  const lines = [
    "",
    `// ${Name}: ${tech.label} (created by corvina-sdk create widget ${tech.key})`,
    `import ${Name} from "${importDir}/${Name}";`,
    ...(tech.component ? [`import ${Name}Vue from "${importDir}/${Name}.vue";`] : []),
    `import { ${camelName}Gallery } from "${importDir}/${Name}Gallery";`,
    `import { widgetType as ${Name}Type } from "${importDir}/defs";`,
    "registerWidget({",
    `  type: ${Name}Type,  // The value is ${type}`,
    `  class: ${Name},`,
    ...(tech.component ? [`  component: ${Name}Vue,`] : []),
    `  gfx: ${camelName}Gallery.getDefaultConfiguration,`,
    `  props: ${camelName}Gallery.getPropsHandler(),`,
    `  icon: adjustPath( require( "./resources/images/corvina-widget1.png" ) ),`,
    `  category: ${JSON.stringify(category)}`,
    "}, manifest);",
    ""
  ];
  return lines.join("\n");
}

function toPosix(p) {
  return p.split(path.sep).join("/");
}

/*
 * Prepares all the changes, then writes them unless dryRun. Returns what has been done and the
 * packages to install: the command installs them after the report.
 */
function createWidget(root, options) {
  const tech = resolveTech(options.tech);
  if (!tech)
    throw new CliError(`Unknown technology "${options.tech}". Available: ${Object.keys(techs).join(", ")}`);

  const changes = new Changes(root);
  const names = widgetNames(options.name);
  const manifest = project.readManifest(changes);
  if (!manifest.name)
    throw new CliError(`${project.MANIFEST}: missing "name", it is the prefix of the widget types`);
  const type = `${manifest.name}.${names.Name}`;
  // Class of the widget root: package and widget, as the type, so it is unique also among the packages
  const cssClass = `${kebab(manifest.name)}-${names.kebabName}`;
  const vars = { ...names, type, cssClass, category: options.category || DEFAULT_CATEGORY };
  const warnings = [];
  if (project.isPlaceholderPackage(manifest.name))
    warnings.push(`The package is named "${manifest.name}" (${project.MANIFEST}), the name of the SDK examples: ` +
      `rename it with a name unique in the organization before uploading it, packages with the same name replace each other`);

  // The widget folder must be inside src, where main.ts imports it and tsconfig compiles it
  const widgetDir = toPosix(path.relative(root, path.resolve(root, options.dir || DEFAULT_DIR, names.Name)));
  if (!widgetDir.startsWith("src/"))
    throw new CliError(`The widget folder must be inside src (got ${widgetDir})`);
  if (changes.exists(widgetDir))
    throw new CliError(`${widgetDir} already exists`);
  if ((manifest.widgets || []).includes(type))
    throw new CliError(`${type} is already listed in ${project.MANIFEST}`);
  const identifiers = [names.Name, `${names.Name}Type`, `${names.camelName}Gallery`, ...(tech.component ? [`${names.Name}Vue`] : [])];
  for (const identifier of identifiers)
    if (project.mainDeclares(changes, identifier))
      throw new CliError(`${project.MAIN} already declares ${identifier}: choose another widget name`);

  const files = [...templateFiles("common", vars), ...templateFiles(tech.template, vars)];
  for (const file of files)
    changes.write(`${widgetDir}/${file.name}`, file.content);

  const importDir = "./" + toPosix(path.relative("src", widgetDir));
  project.registerInMain(changes, registrationBlock(tech, vars, importDir));
  project.addWidgetToManifest(changes, type);
  const toInstall = project.addDependencies(changes, root, tech.dependencies, tech.devDependencies);
  // single-chunk for every technology: it fixes also the projects created before it was in the template
  const manual = applySetup(changes, ["single-chunk", ...(tech.setup || [])]);

  if (!options.dryRun) changes.commit();
  return { tech, type, widgetDir, changes: changes.list(), toInstall, manual, warnings };
}

module.exports = { createWidget, widgetNames };
