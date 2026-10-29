/*
 * Copies a local build of the Corvina SDK bundle into dist/corvina, loaded by the dev server started
 * with `yarn dev:local` (`yarn dev` loads the released runtime). Build it first in corvina-frontend/frontend-new:
 *
 *   NODE_ENV=production yarn run build-sdk-lib
 *   node scripts/use-local-corvina.js [path of corvina-frontend/frontend-new]
 *   yarn dev:local
 *
 * Copied:
 * - the sdk-* chunks and static.js; the entry points also without hash, as the Corvina server does for /dist/sdk-*.js
 * - fonts and images emitted by file-loader: the bundle loads them relative to its own url
 * - the static folders the app loads from /static/ (e.g. gallery icons), served before ./static (see webpack.config.js)
 * - when built (yarn build:dashboard in corvina-frontend), corvina-dashboard into dist/corvina-dashboard: the new
 *   dashboard editor, opened by Dashboards in an iframe when the instance has the dashboardNew flag, and with it
 *   Corvina's documentation, which its help reads from /static/docs/brand/ (the Corvina server's alias of its brand)
 */
const fs = require("fs");
const path = require("path");

const frontendDir = path.resolve(process.argv[2] || "../corvina-frontend/frontend-new");
const sourceDir = path.join(frontendDir, "dist");
const targetDir = path.resolve(__dirname, "../dist/corvina");
const entries = ["runtime", "vue", "BrandData", "corvina"];
const staticFolders = ["images", "img", "fonts", "css"];
const dashboardSourceDir = path.join(frontendDir, "..", "corvina-dashboard", "dist");
const dashboardTargetDir = path.resolve(__dirname, "../dist/corvina-dashboard");
const docsSourceDir = path.join(frontendDir, "static", "docs", "brands", "corvina");

if (!fs.existsSync(sourceDir)) {
  console.error(`${sourceDir} not found: run "yarn run build-sdk-lib" in corvina-frontend/frontend-new`);
  process.exit(1);
}

const isFile = (file) => fs.statSync(path.join(sourceDir, file)).isFile();
const chunks = fs.readdirSync(sourceDir)
  .filter(file => file.startsWith("sdk-") || file.startsWith("static.js"))
  .filter(file => !file.endsWith(".gz"));
// file-loader output: every file of dist that is not javascript (the app chunks are not needed)
const assets = fs.readdirSync(sourceDir)
  .filter(file => !/\.(js|map|gz|html)$/.test(file) && isFile(file));

// dist is not cleaned between builds: the entry point of the last build is the most recent one
const latest = (entry) => chunks
  .filter(file => new RegExp(`^sdk-${entry}\\.[0-9a-f]+\\.js$`).test(file))
  .map(file => ({ file, mtime: fs.statSync(path.join(sourceDir, file)).mtimeMs }))
  .sort((a, b) => b.mtime - a.mtime)[0];

const missing = entries.filter(entry => !latest(entry)).map(entry => `sdk-${entry}.<hash>.js`);
if (!chunks.includes("static.js")) missing.push("static.js");
if (missing.length) {
  console.error(`Missing in ${sourceDir}: ${missing.join(", ")}`);
  process.exit(1);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });
for (const file of [...chunks, ...assets])
  fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
for (const entry of entries) {
  const { file } = latest(entry);
  fs.copyFileSync(path.join(targetDir, file), path.join(targetDir, `sdk-${entry}.js`));
  console.log(`sdk-${entry}.js -> ${file}`);
}
for (const folder of staticFolders)
  fs.cpSync(path.join(frontendDir, "static", folder), path.join(targetDir, "static", folder), { recursive: true });

console.log(`Copied ${chunks.length} chunks, ${assets.length} assets and static/{${staticFolders.join(",")}} to ${targetDir}`);

fs.rmSync(dashboardTargetDir, { recursive: true, force: true });
if (fs.existsSync(dashboardSourceDir)) {
  fs.cpSync(dashboardSourceDir, dashboardTargetDir, { recursive: true });
  if (fs.existsSync(docsSourceDir))
    fs.cpSync(docsSourceDir, path.join(targetDir, "static", "docs", "brand"), { recursive: true });
  console.log(`Copied corvina-dashboard to ${dashboardTargetDir}${fs.existsSync(docsSourceDir) ? ", and Corvina's documentation" : ""}`);
} else {
  console.log(`${dashboardSourceDir} not found: the new dashboard editor is missing (yarn build:dashboard in corvina-frontend)`);
}
