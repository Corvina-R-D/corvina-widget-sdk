/*
 * Webpack loader of the help pages of the widgets: a `.md` file becomes a module exporting its html, a string.
 *
 *   - every heading gets an id (GitHub's slug, as the Corvina documentation), so `[…](#data-range)` reaches
 *     "## Data range"; a link to another page of the widget is written `ranges.md` or `ranges.md#min`, and the
 *     help panel of the editor follows it without leaving the panel;
 *   - an image with a relative path (`![](./img/gauge.png)`) is emitted by file-loader like the other
 *     resources, and its URL is the one of the uploaded package: `adjustPath`, which Corvina passes to the
 *     code of the package, resolves it by file name among the `resources.images` of `src/manifest.json`.
 *     So the name must be listed there (the loader warns when it is not), and be unique among the images of
 *     the help pages: two different files with the same name would be emitted to the same file of the package,
 *     and the loader fails the build naming both.
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

// The text of a heading as shown: `The [min](ranges.md) value` is "The min value"
const plainText = (inline) =>
  (inline.children || [])
    .filter((token) => token.type === "text" || token.type === "code_inline")
    .map((token) => token.content)
    .join("");

/** The ids of the headings, unique in the page. */
function headingIds(md) {
  md.core.ruler.push("heading_ids", (state) => {
    const used = new Set();
    state.tokens.forEach((token, i) => {
      if (token.type !== "heading_open" || token.attrGet("id")) return;
      const base = slug(plainText(state.tokens[i + 1]));
      let id = base;
      for (let n = 1; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);
      token.attrSet("id", id);
    });
  });
}

const isRelative = (src) => !!src && !/^([a-z][a-z0-9+.-]*:|\/|#)/i.test(src);

const fileName = (src) => path.basename(src.split(/[?#]/)[0]);

/*
 * The images of the help pages, by page, of each compiler: in watch mode the loader runs again only on the changed
 * pages, the others keep the images of their last build.
 */
const imagesByCompiler = new WeakMap();

const sameContent = (a, b) => {
  try {
    return fs.readFileSync(a).equals(fs.readFileSync(b));
  } catch {
    return false;
  }
};

/**
 * Fails the build when an image of the page has the name of a different image of another page, or of the page.
 * Returns the indexes of those images: the module does not require them, otherwise webpack would stop writing the
 * second file with the same name, before reporting this error.
 */
function checkUniqueNames(loader, images) {
  const key = loader._compiler || loader;
  if (!imagesByCompiler.has(key)) imagesByCompiler.set(key, new Map());
  const byPage = imagesByCompiler.get(key);
  const page = loader.resourcePath;
  const files = images.map((src) => ({
    name: fileName(src),
    file: path.resolve(loader.context, src.split(/[?#]/)[0]),
  }));
  byPage.set(page, files);

  const relative = (file) => path.relative(loader.rootContext, file);
  const reported = new Set();
  const clashing = new Set();
  files.forEach(({ name, file }, i) => {
    const others = [...byPage].flatMap(([otherPage, otherFiles]) =>
      otherFiles
        .filter((other, j) => (otherPage !== page || j < i) && other.name === name && other.file !== file)
        .map((other) => ({ ...other, page: otherPage }))
    );
    const clash = others.find((other) => !sameContent(file, other.file));
    if (!clash) return;
    clashing.add(i);
    if (reported.has(name)) return;
    reported.add(name);
    loader.emitError(
      new Error(
        `${name}: two different images have this name, ${relative(file)} (in ${relative(page)}) and ` +
          `${relative(clash.file)} (in ${relative(clash.page)}). They would be the same file of the package: ` +
          `rename one of them, also in its page and in resources.images of the manifest.`
      )
    );
  });
  return clashing;
}

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

  const clashing = checkUniqueNames(this, images);

  if (manifest && images.length) {
    const manifestPath = path.resolve(this.rootContext, manifest);
    this.addDependency(manifestPath);
    const listed = JSON.parse(fs.readFileSync(manifestPath, "utf8")).resources?.images || [];
    for (const src of images) {
      const name = fileName(src);
      if (!listed.includes(name))
        this.emitWarning(
          new Error(`${name}: add it to resources.images of ${manifest}, or it is missing once uploaded`)
        );
    }
  }

  const parts = html.split(/\u0000(\d+)\u0000/);
  const code = parts
    .map((part, i) =>
      i % 2
        ? clashing.has(Number(part))
          ? '""'
          : `adjustPath(require(${JSON.stringify(images[Number(part)])}))`
        : JSON.stringify(part)
    )
    .join(" + ");
  return `module.exports = ${code};\n`;
};
