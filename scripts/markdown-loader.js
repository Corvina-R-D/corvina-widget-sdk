/*
 * Webpack loader of the help pages of the widgets: a `.md` file becomes a module exporting its html, a string.
 *
 *   - every heading gets an id (GitHub's slug, as the Corvina documentation), so `[…](#data-range)` reaches
 *     "## Data range"; a link to another page of the widget is written `ranges.md` or `ranges.md#min`, and the
 *     help panel of the editor follows it without leaving the panel;
 *   - an image with a relative path (`![](./img/gauge.png)`) is emitted by file-loader like the other
 *     resources, and its URL is the one of the uploaded package: `adjustPath`, which Corvina passes to the
 *     code of the package, resolves it by file name among the `resources.images` of `src/manifest.json`.
 *     So the name must be listed there, and be unique in the package: the loader warns otherwise.
 *
 * The editor cleans the html before showing it: no scripts, event handlers, iframes, <style> or forms.
 * See src/help.ts for how the pages become the `help` of a widget.
 */
const fs = require("fs");
const path = require("path");
const markdownIt = require("markdown-it");

const slug = (text) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s/g, "-");

/** The ids of the headings, unique in the page. */
function headingIds(md) {
  md.core.ruler.push("heading_ids", (state) => {
    const used = new Set();
    state.tokens.forEach((token, i) => {
      if (token.type !== "heading_open" || token.attrGet("id")) return;
      const base = slug(state.tokens[i + 1].content);
      let id = base;
      for (let n = 1; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);
      token.attrSet("id", id);
    });
  });
}

const isRelative = (src) => !!src && !/^([a-z][a-z0-9+.-]*:|\/|#)/i.test(src);

module.exports = function markdownLoader(source) {
  const { manifest } = this.getOptions() || {};
  const md = markdownIt({ html: true });
  md.use(headingIds);

  // the relative images, replaced by a marker while rendering and by their URL in the module
  const images = [];
  const defaultImage = md.renderer.rules.image;
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const src = tokens[idx].attrGet("src");
    if (isRelative(src)) {
      tokens[idx].attrSet("src", `\u0000${images.length}\u0000`);
      images.push(src);
    }
    return defaultImage(tokens, idx, options, env, self);
  };
  const html = md.render(source);

  if (manifest && images.length) {
    const manifestPath = path.resolve(this.rootContext, manifest);
    this.addDependency(manifestPath);
    const listed = JSON.parse(fs.readFileSync(manifestPath, "utf8")).resources?.images || [];
    for (const src of images) {
      const name = path.basename(src.split(/[?#]/)[0]);
      if (!listed.includes(name))
        this.emitWarning(
          new Error(`${name}: add it to resources.images of ${manifest}, or it is missing once uploaded`)
        );
    }
  }

  const parts = html.split(/\u0000(\d+)\u0000/);
  const code = parts
    .map((part, i) =>
      i % 2 ? `adjustPath(require(${JSON.stringify(images[Number(part)])}))` : JSON.stringify(part)
    )
    .join(" + ");
  return `module.exports = ${code};\n`;
};
