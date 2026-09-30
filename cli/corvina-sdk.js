#!/usr/bin/env node
/*
 * corvina-sdk: scaffolding of Corvina SDK projects and widgets (see doc/cli.md).
 *
 *   corvina-sdk create project <dir> [--package <name>] [--tech <tech> --widget <Name>]
 *   corvina-sdk create widget <tech> <Name> [--category <name>] [--dir <folder>]
 *   corvina-sdk list
 *
 * From the SDK: yarn corvina-sdk ... or node cli/corvina-sdk.js ...
 */
const path = require("path");
const readline = require("readline/promises");
const { parseArgs } = require("util");
const { createProject } = require("./lib/scaffold");
const { createWidget, widgetNames } = require("./lib/widget");
const { resolveTech, techs } = require("./lib/techs");
const { addSkills } = require("./lib/skills");
const project = require("./lib/project");
const { CliError } = project;

const HELP = `corvina-sdk: scaffolding of Corvina SDK projects and widgets

Usage:
  corvina-sdk create project <dir> [options]   New SDK project, from the SDK of this CLI
  corvina-sdk create widget <tech> <Name>      New widget in the current SDK project
  corvina-sdk add skills                       Install or update the Claude Code skills in the project
  corvina-sdk list                             Available technologies

Options of create project:
  --package <name>    Package name, unique in the organization: prefix of the widget types
                      and name of the uploaded package (required, asked in a terminal)
  --tech <tech>       Create also a first widget with this technology...
  --widget <Name>     ...and this name

Options of create widget:
  --category <name>   Gallery category of the widget (default: MyGallery)
  --dir <folder>      Folder of the widgets, inside src (default: src/widgets)

Common options:
  --skip-install      Do not run the package manager install
  --dry-run           Show the changes without writing them
  -h, --help          Show this help

Examples:
  corvina-sdk create widget react TemperatureGauge
  corvina-sdk create project ../my-widgets --package acme --tech vue3 --widget Tank
`;

const color = (code) => (text) => (process.stdout.isTTY ? `\x1b[${code}m${text}\x1b[0m` : text);
const green = color(32), yellow = color(33), bold = color(1), dim = color(2);

const log = {
  info: (text) => console.log(text),
  step: (text) => console.log(`${bold(">")} ${text}`),
  file: (action, file) => console.log(`  ${action == "update" ? yellow(action) : green(action)} ${file}`),
  warn: (text) => console.log(`${yellow("!")} ${text}`)
};

function listTechs() {
  const width = Math.max(...Object.keys(techs).map(k => k.length));
  log.info("Technologies for corvina-sdk create widget <tech>:\n");
  for (const [key, tech] of Object.entries(techs)) {
    const aliases = tech.aliases ? dim(` (also: ${tech.aliases.join(", ")})`) : "";
    // Type packages aside, what the technology installs
    const deps = Object.keys({ ...tech.dependencies, ...tech.devDependencies }).filter(d => !d.startsWith("@types/"));
    log.info(`  ${bold(key.padEnd(width))}  ${tech.label}${aliases}${deps.length ? dim(`  [${deps.join(", ")}]`) : ""}`);
  }
}

async function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    return (await rl.question(question)).trim();
  } finally {
    rl.close();
  }
}

// Missing arguments are asked in an interactive terminal, required otherwise
async function required(value, question, usage) {
  if (value) return value;
  if (!process.stdin.isTTY) throw new CliError(`Missing argument. Usage: ${usage}`);
  const answer = await ask(question);
  if (!answer) throw new CliError(`Missing argument. Usage: ${usage}`);
  return answer;
}

async function askTech(value) {
  if (value || !process.stdin.isTTY) return value;
  const keys = Object.keys(techs);
  keys.forEach((key, i) => log.info(`  ${i + 1}) ${bold(key)}  ${techs[key].label}`));
  const answer = await ask(`Technology [1-${keys.length}]: `);
  return keys[Number(answer) - 1] || answer;
}

// willInstall: the command runs the install after the report
function reportWidget(result, root, { dryRun, willInstall }) {
  const { tech, type, changes, toInstall, manual, warnings } = result;
  log.step(`${dryRun ? "Would create" : "Created"} widget ${bold(type)} (${tech.label})`);
  for (const { file, created } of changes) log.file(created ? "create" : "update", file);
  for (const warning of warnings) log.warn(warning);
  for (const note of tech.notes || []) log.warn(note);
  for (const change of manual) log.warn(`To do by hand, ${change}`);
  if (toInstall.length && !willInstall)
    log.warn(`Install the new dependencies (${toInstall.join(", ")}): ${project.packageManager(root)} install`);
}

async function createWidgetCommand(positionals, values) {
  const usage = "corvina-sdk create widget <tech> <Name>";
  const tech = await askTech(positionals[0]);
  if (!tech)
    throw new CliError(`Missing argument. Usage: ${usage}`);
  if (!resolveTech(tech))
    throw new CliError(`Unknown technology "${tech}". Run corvina-sdk list`);
  const options = {
    tech,
    name: await required(positionals[1], "Widget name (e.g. TemperatureGauge): ", usage),
    category: values.category,
    dir: values.dir,
    dryRun: values["dry-run"]
  };
  const root = project.findProjectRoot(process.cwd());
  const result = createWidget(root, options);
  const willInstall = result.toInstall.length > 0 && !options.dryRun && !values["skip-install"];
  reportWidget(result, root, { dryRun: options.dryRun, willInstall });
  if (willInstall) project.install(root, log);
  if (!options.dryRun) log.info(`\nStart the dev server with: ${project.packageManager(root)} run dev`);
}

async function createProjectCommand(positionals, values) {
  const usage = "corvina-sdk create project <dir>";
  const dir = await required(positionals[0], "Project folder: ", usage);
  if (Boolean(values.tech) != Boolean(values.widget))
    throw new CliError("--tech and --widget go together");
  if (values.tech && !resolveTech(values.tech))
    throw new CliError(`Unknown technology "${values.tech}". Run corvina-sdk list`);
  // Checked before copying the project
  if (values.widget) widgetNames(values.widget);
  // The package name identifies the package in Corvina: there is no default, packages with the same name replace each other
  const packageName = values.package ||
    (process.stdin.isTTY ? await ask("Package name, unique in the organization (e.g. acme-gauges): ") : undefined);

  const dryRun = values["dry-run"];
  const { target, root, copied, generated } = createProject(dir, { packageName, dryRun });
  log.step(`${dryRun ? "Would create" : "Created"} project ${bold(target)} ${dim(`(template: ${root})`)}`);
  for (const entry of copied) log.file("copy", entry);
  for (const file of generated) log.file("create", file);
  if (dryRun) return;

  const willInstall = !values["skip-install"];
  if (values.tech)
    reportWidget(createWidget(target, { tech: values.tech, name: values.widget }), target, { willInstall });
  const pm = project.packageManager(target);
  if (willInstall) project.install(target, log);
  const relative = path.relative(process.cwd(), target) || ".";
  log.info(`\nNext steps:\n  cd ${relative}${values["skip-install"] ? `\n  ${pm} install` : ""}\n  ${pm} run dev`);
}

function addSkillsCommand(values) {
  const root = project.findProjectRoot(process.cwd());
  const dryRun = values["dry-run"];
  const changes = addSkills(root, { dryRun });
  log.step(`${dryRun ? "Would add" : "Added"} the Claude Code skills to ${bold(root)}`);
  if (!changes.length) log.info("  already up to date");
  for (const { file, created } of changes) log.file(created ? "create" : "update", file);
}

async function main(argv) {
  const { positionals, values } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      package: { type: "string" },
      tech: { type: "string" },
      widget: { type: "string" },
      category: { type: "string" },
      dir: { type: "string" },
      "skip-install": { type: "boolean" },
      "dry-run": { type: "boolean" },
      help: { type: "boolean", short: "h" }
    }
  });
  const [command, subject, ...rest] = positionals;

  if (values.help || !command || command == "help") return log.info(HELP);
  if (command == "list") return listTechs();
  if (command == "add" && subject == "skills") return addSkillsCommand(values);
  if (command == "create" && subject == "widget") return createWidgetCommand(rest, values);
  if (command == "create" && subject == "project") return createProjectCommand(rest, values);
  throw new CliError(`Unknown command "${positionals.join(" ")}". Run corvina-sdk --help`);
}

main(process.argv.slice(2)).catch(err => {
  // Errors of the user (bad arguments, name clashes) without stack trace
  if (err instanceof CliError || err.code?.startsWith?.("ERR_PARSE_ARGS")) {
    console.error(`error: ${err.message}`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
