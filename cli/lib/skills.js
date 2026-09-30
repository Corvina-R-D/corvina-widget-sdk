/*
 * corvina-sdk add skills
 *
 * Installs, or updates, the Claude Code skills of the SDK (.claude/skills of the template) into the
 * current project. `create project` copies them already: this command is for the projects created
 * before, or to get a newer version of the skills.
 */
const fs = require("fs");
const path = require("path");
const { Changes } = require("./changes");
const { CliError } = require("./project");
const template = require("./template");

const SKILLS = ".claude/skills";

function listFiles(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(full, base) : [path.relative(base, full)];
  });
}

/* Prepares the copy of the skills into root, writes it unless dryRun. Returns the changed files */
function addSkills(root, { dryRun } = {}) {
  const templateRoot = template.templateRoot();
  const source = path.join(templateRoot, SKILLS);
  // The copy of the CLI inside a project takes the skills from the project itself
  if (path.resolve(root) === path.resolve(templateRoot))
    throw new CliError(`This CLI takes the skills from ${root} itself. To install or update them run, inside the ` +
      `project, the CLI of the SDK (node <sdk>/cli/corvina-sdk.js add skills) or the published one ` +
      `(npx ${require("../package.json").name} add skills)`);
  if (!fs.existsSync(source))
    throw new CliError(`No skills in the template (${source})`);

  const changes = new Changes(root);
  for (const file of listFiles(source))
    changes.write(path.posix.join(SKILLS, ...file.split(path.sep)), fs.readFileSync(path.join(source, file), "utf8"));
  if (!dryRun) changes.commit();
  return changes.list();
}

module.exports = { addSkills, SKILLS };
