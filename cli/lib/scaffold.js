/*
 * corvina-sdk create project <dir>
 *
 * Creates a minimal SDK project: the Corvina typings and the dev server files come from the template
 * (see template.js), the CLI copies itself; package.json, webpack.config.js and tsconfig.json are
 * generated with just the build of TypeScript widgets. The technologies add their dependencies and
 * build changes when their first widget is created (see techs.js and setup.js).
 *
 * The widgets need no UI library at build time: "corvina" and Vue 2 are provided by Corvina at
 * runtime, and the typings in _corvina resolve the packages they import only when installed (the
 * others become `any`), so Vue is installed only by the projects with Vue 2 widgets.
 */
const fs = require("fs");
const path = require("path");
const { CliError, PLACEHOLDER_PACKAGE, isPlaceholderPackage } = require("./project");
const template = require("./template");

const TEMPLATES = path.join(__dirname, "..", "templates", "project");

/*
 * Build of the TypeScript widgets and of the package zip. webpack and TypeScript have the ranges of
 * corvina-frontend, which runs the widget bundles (loaderCustomWidget.ts) and generates _corvina;
 * the copied yarn.lock of the SDK resolves them to the same versions.
 */
const BUILD_DEPENDENCIES = {
  "@types/node": "^10.3.6",
  "cross-env": "^5.1.4",
  "css-loader": "^1.0.0",
  "esbuild-loader": "^2.15.1",
  "file-loader": "^1.1.4",
  "gulp": "^4.0.2",
  "gulp-zip": "^5.0.2",
  "html-webpack-plugin": "^5.6.0",
  "style-loader": "^0.23.0",
  "ts-loader": "^8.0.9",
  "typescript": "^5.9.3",
  "webpack": "^5.104.1",
  "webpack-cli": "^6.0.1",
  "webpack-dev-server": "^5.0.0"
};

// Same scripts of the SDK
const SCRIPTS = {
  dev: "cross-env --mode=development NODE_ENV=development webpack serve --progress --mode=development --hot",
  "dev:local": "cross-env CORVINA_RUNTIME=local NODE_ENV=development webpack serve --progress --mode=development --hot",
  build: "cross-env NODE_ENV=production webpack --progress && gulp",
  "corvina-sdk": "node cli/corvina-sdk.js"
};

// Name of the hot updates global in the index.html of the SDK, derived from its package name
const SDK_HMR_NAME = "vuex_corvina_app";
const HMR_NAME = "corvina_sdk_app";

const MAIN_TS = `declare var adjustPath;
import { registerWidget } from "corvina";
import manifest from "./manifest.json";

// Add widgets with: yarn corvina-sdk create widget <tech> <Name>
`;

function manifestJson(name) {
  return JSON.stringify({
    name,
    source: "sdk",
    main: "lib.js",
    widgets: [],
    resources: {
      images: ["corvina-widget1.png"],
      icon: ["corvina-widget1.png"]
    }
  }, null, 4) + "\n";
}

function packageJson(name) {
  return JSON.stringify({
    name,
    description: "Corvina dashboard widgets",
    version: "1.0.0",
    private: true,
    scripts: SCRIPTS,
    dependencies: {},
    devDependencies: BUILD_DEPENDENCIES
  }, null, 2) + "\n";
}

// npm package name from the folder name: lowercase, without spaces
function npmName(dir) {
  return path.basename(dir).toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^[._-]+/, "") || "corvina-widgets";
}

function validatePackageName(name) {
  // It is the prefix of the widget types (<name>.<Widget>), the name of the uploaded zip and the
  // identity of the package in Corvina: it must be unique in the organization
  if (!name)
    throw new CliError("Missing --package: the package name, unique in the organization (e.g. acme-gauges)");
  if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(name))
    throw new CliError(`Invalid package name "${name}": use letters, digits, "_" and "-", starting with a letter`);
  if (isPlaceholderPackage(name))
    throw new CliError(`"${PLACEHOLDER_PACKAGE}" is the package name of the SDK examples: choose a name unique in the ` +
      `organization (e.g. acme-gauges), packages uploaded with the same name replace each other`);
  return name;
}

/* Returns the files of the new project: the copied entries and the generated files */
function createProject(dir, { packageName, dryRun } = {}) {
  validatePackageName(packageName);
  const target = path.resolve(dir);
  if (fs.existsSync(target) && fs.readdirSync(target).length)
    throw new CliError(`${target} already exists and is not empty`);
  const root = template.templateRoot();
  for (const source of [root, template.CLI_ROOT])
    if (target === source || target.startsWith(source + path.sep))
      throw new CliError(`The new project cannot be inside ${source}, used as template`);

  const copied = template.templateEntries(root);
  const generated = {
    "package.json": packageJson(npmName(target)),
    "webpack.config.js": fs.readFileSync(path.join(TEMPLATES, "webpack.config.js.tpl"), "utf8").replace(/__hmrName__/g, HMR_NAME),
    "tsconfig.json": fs.readFileSync(path.join(TEMPLATES, "tsconfig.json.tpl"), "utf8"),
    "src/manifest.json": manifestJson(packageName),
    "src/main.ts": MAIN_TS
  };
  // Yarn 2+ installs into node_modules only with this setting, the build resolves from node_modules
  if (!copied.includes(".yarnrc.yml"))
    generated[".yarnrc.yml"] = "nodeLinker: node-modules\n";

  if (!dryRun) {
    for (const entry of copied)
      template.copyTemplateEntry(root, entry, target);
    template.copyCli(path.join(target, "cli"));
    // index.html dispatches the hot updates by the name set in webpack.config.js
    const indexHtml = path.join(target, "index.html");
    fs.writeFileSync(indexHtml, fs.readFileSync(indexHtml, "utf8").split(SDK_HMR_NAME).join(HMR_NAME));
    for (const [file, content] of Object.entries(generated)) {
      fs.mkdirSync(path.dirname(path.join(target, file)), { recursive: true });
      fs.writeFileSync(path.join(target, file), content);
    }
  }
  return { target, root, copied: [...copied, "cli"], generated: Object.keys(generated) };
}

module.exports = { createProject };
