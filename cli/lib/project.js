/*
 * Reads and updates the files of an SDK project: src/manifest.json, src/main.ts, package.json.
 * The edits go through a Changes object (see changes.js).
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { appendToArray } = require("./text");

const MANIFEST = "src/manifest.json";
const MAIN = "src/main.ts";

/*
 * Package name of the SDK examples. The package name identifies the package in Corvina: a package
 * uploaded with the name of another one of the organization replaces it, as an update.
 */
const PLACEHOLDER_PACKAGE = "org";

class CliError extends Error {}

function isPlaceholderPackage(name) {
  return String(name).toLowerCase() === PLACEHOLDER_PACKAGE;
}

/* Walks up from dir to the root of an SDK project: the folder with src/manifest.json and webpack.config.js */
function findProjectRoot(dir) {
  let current = path.resolve(dir);
  for (;;) {
    if (fs.existsSync(path.join(current, MANIFEST)) && fs.existsSync(path.join(current, "webpack.config.js")))
      return current;
    const parent = path.dirname(current);
    if (parent === current)
      throw new CliError(`No Corvina SDK project found in ${dir} or its parents (looking for ${MANIFEST} and webpack.config.js)`);
    current = parent;
  }
}

function readManifest(changes) {
  try {
    return JSON.parse(changes.read(MANIFEST));
  } catch (err) {
    throw new CliError(`${MANIFEST}: ${err.message}`);
  }
}

/* Adds the widget type to the "widgets" array, editing the text to keep the formatting of the file */
function addWidgetToManifest(changes, type) {
  const text = changes.read(MANIFEST);
  const edited = appendToArray(text, "widgets", type);
  if (edited !== null) {
    changes.write(MANIFEST, edited);
    return;
  }
  const manifest = JSON.parse(text);
  manifest.widgets = [...(manifest.widgets || []), type];
  changes.write(MANIFEST, JSON.stringify(manifest, null, 4));
}

/* Appends the registration of a widget to src/main.ts, adding the imports it needs when missing */
function registerInMain(changes, block) {
  let text = changes.read(MAIN);
  const header = [];
  if (!/declare\s+var\s+adjustPath/.test(text))
    header.push("declare var adjustPath;");
  if (!/import\s*\{[^}]*\bregisterWidget\b[^}]*\}\s*from\s*["']corvina["']/.test(text))
    header.push("import { registerWidget } from \"corvina\";");
  if (!/import\s+manifest\s+from\s*["']\.\/manifest\.json["']/.test(text))
    header.push("import manifest from \"./manifest.json\";");
  if (header.length)
    text = `${header.join("\n")}\n${text}`;
  changes.write(MAIN, `${text.trimEnd()}\n${block}`);
}

function mainDeclares(changes, identifier) {
  return new RegExp(`\\b(import|as|const|let|var|class|function)\\s+${identifier}\\b`).test(changes.read(MAIN));
}

/* Adds the missing dependencies to package.json, returns the names of the packages to install */
function addDependencies(changes, root, dependencies = {}, devDependencies = {}) {
  const text = changes.read("package.json");
  const pkg = JSON.parse(text);
  const toInstall = [];
  let edited = false;
  for (const [field, deps] of [["dependencies", dependencies], ["devDependencies", devDependencies]]) {
    for (const [name, version] of Object.entries(deps)) {
      const declared = pkg.dependencies?.[name] || pkg.devDependencies?.[name];
      if (!declared) {
        pkg[field] = { ...pkg[field], [name]: version };
        edited = true;
      }
      if (!declared || !fs.existsSync(path.join(root, "node_modules", name, "package.json")))
        toInstall.push(name);
    }
  }
  if (edited) {
    const indent = text.match(/^\{\r?\n([ \t]+)/)?.[1] ?? "  ";
    changes.write("package.json", JSON.stringify(pkg, null, indent) + (text.endsWith("\n") ? "\n" : ""));
  }
  return toInstall;
}

function packageManager(root) {
  if (fs.existsSync(path.join(root, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(root, "package-lock.json"))) return "npm";
  return "yarn";
}

/* Installs the dependencies of package.json with the package manager of the project */
function install(root, log) {
  const pm = packageManager(root);
  log.step(`${pm} install`);
  const result = spawnSync(pm, ["install"], { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
  if (result.error || result.status !== 0)
    throw new CliError(`${pm} install failed${result.error ? `: ${result.error.message}` : ""}. Run it by hand in ${root}`);
}

module.exports = {
  CliError,
  MAIN,
  MANIFEST,
  PLACEHOLDER_PACKAGE,
  addDependencies,
  addWidgetToManifest,
  findProjectRoot,
  install,
  isPlaceholderPackage,
  mainDeclares,
  packageManager,
  readManifest,
  registerInMain
};
