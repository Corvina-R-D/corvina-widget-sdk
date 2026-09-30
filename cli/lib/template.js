/*
 * The SDK files used as template by `create project`.
 *
 * In the SDK repository the template is the SDK containing the CLI (cli/..). The published package
 * carries a snapshot of the same files in template/, made by `npm pack` / `npm publish`:
 *   prepack:  node lib/template.js snapshot
 *   postpack: node lib/template.js clean
 */
const fs = require("fs");
const path = require("path");
const { CliError } = require("./project");

const CLI_ROOT = path.resolve(__dirname, "..");
const SDK_ROOT = path.resolve(CLI_ROOT, "..");
const SNAPSHOT = path.join(CLI_ROOT, "template");

// Copied into the new projects
const TEMPLATE_ENTRIES = [
  "_corvina",
  "static",
  "doc",
  "scripts",
  ".vscode",
  ".gitignore",
  ".env.example",
  "gulpfile.js",
  "index.html",
  "index.ts",
  "README.md",
  "src/resources",
  // Claude Code skills to build widgets (only the skills: .claude can hold local settings)
  ".claude/skills",
  // The install keeps the versions tested with the SDK and drops the packages not used by the project
  "yarn.lock"
];

// Copied only from the SDK, never published: it can hold settings of the local machine
const LOCAL_ENTRIES = [".yarnrc.yml"];

// npm never publishes the .gitignore files: in the snapshot they are stored with these names
const SNAPSHOT_NAMES = { ".gitignore": "gitignore" };

// Editor backups and swap files
const SKIPPED_FILE = /(~|\.un~|\.swp)$/;

function copyEntry(from, to, filter = () => true) {
  fs.cpSync(from, to, { recursive: true, filter: source => !SKIPPED_FILE.test(source) && filter(source) });
}

/* Root of the template: the snapshot of the published package, or the SDK containing the CLI */
function templateRoot() {
  if (fs.existsSync(path.join(SNAPSHOT, "_corvina"))) return SNAPSHOT;
  if (fs.existsSync(path.join(SDK_ROOT, "_corvina"))) return SDK_ROOT;
  throw new CliError(`SDK template not found: neither ${SNAPSHOT} nor the SDK folder ${SDK_ROOT} contain _corvina`);
}

// Path of an entry in the template root
function sourceOf(root, entry) {
  return path.join(root, root === SNAPSHOT ? SNAPSHOT_NAMES[entry] || entry : entry);
}

/* Entries of the template root to copy into a new project */
function templateEntries(root) {
  const entries = root === SNAPSHOT ? TEMPLATE_ENTRIES : [...TEMPLATE_ENTRIES, ...LOCAL_ENTRIES];
  return entries.filter(entry => fs.existsSync(sourceOf(root, entry)));
}

/* Copies an entry of the template root into the new project */
function copyTemplateEntry(root, entry, target) {
  copyEntry(sourceOf(root, entry), path.join(target, entry));
}

/* Copies the CLI itself into a new project, without the snapshot of the published package */
function copyCli(target) {
  // Relative paths: the published CLI is itself inside a node_modules folder
  copyEntry(CLI_ROOT, target, source => {
    const parts = path.relative(CLI_ROOT, source).split(path.sep);
    return parts[0] !== "template" && !parts.includes("node_modules");
  });
}

function snapshot() {
  fs.rmSync(SNAPSHOT, { recursive: true, force: true });
  for (const entry of TEMPLATE_ENTRIES) {
    const from = path.join(SDK_ROOT, entry);
    if (!fs.existsSync(from)) throw new CliError(`${from} not found: the snapshot is made from the SDK containing the CLI`);
    copyEntry(from, sourceOf(SNAPSHOT, entry));
  }
  console.log(`SDK template copied into ${SNAPSHOT}`);
}

function clean() {
  fs.rmSync(SNAPSHOT, { recursive: true, force: true });
}

if (require.main === module) {
  const command = process.argv[2];
  if (command == "snapshot") snapshot();
  else if (command == "clean") clean();
  else {
    console.error("Usage: node lib/template.js snapshot|clean");
    process.exit(1);
  }
}

module.exports = { CLI_ROOT, copyCli, copyTemplateEntry, templateEntries, templateRoot };
