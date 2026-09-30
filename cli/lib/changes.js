/*
 * Changes to the files of a project, kept in memory until commit().
 *
 * The commands prepare all the changes first, so an error (e.g. a widget name already used) leaves
 * the project untouched, and --dry-run just lists them.
 */
const fs = require("fs");
const path = require("path");

class Changes {
  constructor(root) {
    this.root = root;
    this.files = new Map();   // relative path -> { content, created }
  }

  exists(file) {
    return this.files.has(file) || fs.existsSync(path.join(this.root, file));
  }

  read(file) {
    if (this.files.has(file)) return this.files.get(file).content;
    return fs.readFileSync(path.join(this.root, file), "utf8");
  }

  write(file, content) {
    const pending = this.files.get(file);
    const created = pending ? pending.created : !fs.existsSync(path.join(this.root, file));
    if (!created && !pending && this.read(file) === content) return;
    this.files.set(file, { content, created });
  }

  // Changed files, created first
  list() {
    return [...this.files.entries()]
      .map(([file, { created }]) => ({ file, created }))
      .sort((a, b) => Number(b.created) - Number(a.created));
  }

  commit() {
    for (const [file, { content }] of this.files) {
      const fullPath = path.join(this.root, file);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, content);
    }
  }
}

module.exports = { Changes };
