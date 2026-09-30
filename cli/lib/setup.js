/*
 * Build changes required by some technologies, applied to webpack.config.js and tsconfig.json.
 *
 * The files belong to the project and can be customized, so they are patched as text: every step
 * checks whether it is already applied, and when the expected code is not found it does not guess,
 * it returns the change to do by hand.
 *
 * An edit returns null when the change is already there, { text } with the new content of the file,
 * or { manual } describing the change to do by hand.
 */
const { appendToArray, arrayIncludes } = require("./text");

const setups = {
  /*
   * One file per package, whatever the technology: Corvina runs only lib.js (loaderCustomWidget.ts),
   * the chunks of dynamic imports (also inside libraries) would never be loaded
   */
  "single-chunk": [
    ["webpack.config.js", text => {
      if (text.includes("LimitChunkCountPlugin")) return null;
      const manual = "add to plugins: new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })";
      if (!/\bwebpack\s*=\s*require\(\s*['"]webpack['"]\s*\)/.test(text)) return { manual };
      return insertPlugin(text, [
        "// One file per package: Corvina runs only lib.js, the chunks of dynamic imports would never be loaded",
        "new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),"
      ], manual);
    }]
  ],

  // Compile .tsx files: ts-loader rule, resolved extensions and JSX transform
  tsx: [
    ["webpack.config.js", text => {
      if (/test:\s*\/\\\.tsx\?\$\//.test(text)) return null;
      if (!text.includes("test: /\\.ts$/")) return { manual: "make the ts-loader rule match .tsx files (test: /\\.tsx?$/)" };
      return { text: text.replace("test: /\\.ts$/", () => "test: /\\.tsx?$/") };
    }],

    ["webpack.config.js", text => addExtension(text, ".tsx")],

    ["tsconfig.json", text => {
      const jsx = text.match(/"jsx"\s*:\s*"([^"]*)"/);
      if (jsx) return jsx[1] == "react-jsx" ? null : { manual: `set "jsx": "react-jsx" in compilerOptions (now "${jsx[1]}")` };
      const options = text.match(/("compilerOptions"\s*:\s*\{)(\r?\n)([ \t]*)/);
      if (!options) return { manual: "add \"jsx\": \"react-jsx\" to compilerOptions" };
      const [whole, open, eol, indent] = options;
      return { text: text.replace(whole, () => `${open}${eol}${indent}"jsx": "react-jsx",${eol}${indent}`) };
    }]
  ],

  // Compile-time flags of the Vue 3 esm-bundler build: without them Vue 3 warns at startup
  "vue3-flags": [
    ["webpack.config.js", text => {
      if (text.includes("__VUE_OPTIONS_API__")) return null;
      return insertPlugin(text, [
        "// Compile-time flags of Vue 3, used by the widgets importing \"vue3\"",
        "new webpack.DefinePlugin({",
        "  __VUE_OPTIONS_API__: JSON.stringify(true),",
        "  __VUE_PROD_DEVTOOLS__: JSON.stringify(false),",
        "  __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)",
        "}),"
      ], "add to plugins: new webpack.DefinePlugin({ __VUE_OPTIONS_API__: 'true', " +
        "__VUE_PROD_DEVTOOLS__: 'false', __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false' })");
    }]
  ],

  // Vue 2 single file components, compiled by vue-loader 15 (Vue 2 itself is provided by Corvina)
  "vue2-sfc": [
    ["webpack.config.js", text => {
      if (text.includes("vue-loader/lib/plugin")) return null;
      const webpackRequire = text.match(/^.*require\(\s*['"]webpack['"]\s*\).*$/m);
      if (!webpackRequire) return { manual: "add const VueLoaderPlugin = require('vue-loader/lib/plugin')" };
      return { text: text.replace(webpackRequire[0], () => `${webpackRequire[0]}\nconst VueLoaderPlugin = require('vue-loader/lib/plugin')`) };
    }],

    ["webpack.config.js", text => {
      if (/loader:\s*['"]vue-loader['"]/.test(text)) return null;
      const rules = text.match(/^[ \t]*rules:\s*\[[ \t]*\r?\n([ \t]*)/m);
      if (!rules) return { manual: "add the rule { test: /\\.vue$/, loader: 'vue-loader' }" };
      const indent = rules[1];
      const rule = [`{`, `  test: /\\.vue$/,`, `  loader: 'vue-loader'`, `},`].map(line => indent + line).join("\n");
      return { text: text.replace(rules[0], () => `${rules[0]}${rule.slice(indent.length)}\n${indent}`) };
    }],

    ["webpack.config.js", text => {
      if (/new VueLoaderPlugin\(/.test(text)) return null;
      return insertPlugin(text, ["new VueLoaderPlugin(),"], "add new VueLoaderPlugin() to plugins");
    }],

    ["webpack.config.js", text => addExtension(text, ".vue")],

    // The <style> blocks are imported by vue-loader as modules with a default export
    ["webpack.config.js", text => {
      if (text.includes("vue-style-loader")) return null;
      const loader = text.match(/(['"])style-loader\1/);
      if (!loader) return { manual: "use 'vue-style-loader' in the .css rule" };
      return { text: text.replace(loader[0], () => `${loader[1]}vue-style-loader${loader[1]}`) };
    }],

    // Recent webpack versions (5.111, not 5.105) warn on that default import, used only by CSS modules
    ["webpack.config.js", text => {
      if (text.includes("ignoreWarnings")) return null;
      const plugins = text.match(/^([ \t]*)plugins:\s*\[/m);
      if (!plugins) return null;
      const indent = plugins[1];
      const lines = [
        "// vue-loader 15 imports the <style> blocks as default exports, used only by CSS modules:",
        "// the warning of the recent webpack versions about them is harmless",
        "ignoreWarnings: [ /export 'default' \\(imported as 'style\\d+'\\) was not found/ ],"
      ];
      return { text: text.replace(plugins[0], () => `${lines.map(line => indent + line).join("\n")}\n${plugins[0]}`) };
    }],

    // Type of the .vue imports
    ["tsconfig.json", text => {
      if (arrayIncludes(text, "types", "vue-typescript-import-dts")) return null;
      const edited = appendToArray(text, "types", "vue-typescript-import-dts");
      return edited ? { text: edited } : { manual: "add \"vue-typescript-import-dts\" to compilerOptions.types" };
    }]
  ]
};

// Inserts lines at the beginning of the plugins array of the configuration
function insertPlugin(text, lines, manual) {
  const plugins = text.match(/^[ \t]*plugins:\s*\[[ \t]*\r?\n([ \t]*)/m);
  if (!plugins) return { manual };
  const indent = plugins[1];
  return { text: text.replace(plugins[0], () => `${plugins[0]}${lines.join(`\n${indent}`)}\n${indent}`) };
}

// Adds an extension to resolve.extensions, after '.ts'
function addExtension(text, extension) {
  const match = text.match(/extensions:\s*\[([^\]]*)\]/);
  const ts = match && match[1].match(/(['"])\.ts\1/);
  if (!ts) return { manual: `add '${extension}' to resolve.extensions` };
  if (new RegExp(`['"]\\${extension}['"]`).test(match[1])) return null;
  const extensions = match[1].replace(ts[0], () => `${ts[0]}, ${ts[1]}${extension}${ts[1]}`);
  return { text: text.replace(match[0], () => match[0].replace(match[1], () => extensions)) };
}

/* Adds the edits of the setup steps to changes, returns the changes to do by hand */
function applySetup(changes, steps) {
  const manual = [];
  for (const step of steps || []) {
    if (!setups[step]) throw new Error(`Unknown setup step ${step}`);
    for (const [file, edit] of setups[step]) {
      if (!changes.exists(file)) {
        manual.push(`${file} not found`);
        continue;
      }
      const result = edit(changes.read(file));
      if (result?.manual) manual.push(`${file}: ${result.manual}`);
      else if (result) changes.write(file, result.text);
    }
  }
  return manual;
}

module.exports = { applySetup };
