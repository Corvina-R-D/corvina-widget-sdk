# Widget SDK CLI

Scaffolding of SDK projects and widgets, in the technology of choice.

```bash
yarn corvina-sdk list                                         # available technologies
yarn corvina-sdk create widget react TemperatureGauge         # new widget in this project
yarn corvina-sdk create project ../my-widgets --package acme-gauges --tech vue3 --widget Tank
```

The CLI is the package `@corvina/widget-sdk-cli` in `cli/`, with its own `package.json` and no dependencies
(Node.js 20 or later): the SDK and its `package.json` are not needed to run it.

- In the SDK: `yarn corvina-sdk ...` (script of the SDK) or `node cli/corvina-sdk.js ...`.
- Published: `npx @corvina/widget-sdk-cli create project ...`, or installed, `corvina-sdk ...`.
- The created projects carry a copy of the CLI: `yarn corvina-sdk create widget ...` works there too.

### Publishing

```bash
cd cli
npm pack        # or npm publish, with the registry and the access of the @corvina scope
```

`create project` copies the Corvina typings, `static`, `index.html` and the other dev server files.
In the SDK repository they are read from the SDK folder; the published package carries a snapshot of
them in `template/`, made by `prepack` and removed by `postpack` (`lib/template.js`): publish from a
clean checkout of the SDK, the snapshot takes the files as they are. The package is about 0.5 MB.

## create widget

```bash
corvina-sdk create widget <tech> <Name> [--category <name>] [--dir <folder>] [--skip-install] [--dry-run]
```

Run inside an SDK project (the folder with `src/manifest.json` and `webpack.config.js`, or a subfolder).
The name can be written as `TemperatureGauge` or `temperature-gauge`. The command:

- creates `src/widgets/<Name>/` with the widget class, gallery, properties handler and `defs.ts`
  (type `<manifest name>.<Name>`), plus the view file for React, Vue 3 and Vue 2;
- registers the widget at the end of `src/main.ts` and adds its type to `src/manifest.json`;
- adds the missing dependencies of the technology to `package.json` and runs the install;
- applies the build changes of the technology to `webpack.config.js` and `tsconfig.json`, and for every
  technology the single file build (`LimitChunkCountPlugin`, see below) when it is missing, e.g. in the
  projects created before it was in the template.

Nothing is written when a check fails (name already used, folder existing, ...). `--dry-run` lists the
changes without writing them. Without arguments in a terminal, the technology and the name are asked.
When the package is still named `org` (the name of the SDK examples) the command warns: rename it in
`src/manifest.json` before uploading it, see [Isolation](#isolation-of-the-packages).

| Tech | Widget | Build changes |
|---|---|---|
| `dom` | draws with the DOM API in `render(root)` | none |
| `lit` | `render()` returns a lit-html template | `lit-html` |
| `react` | `render()` returns a React element, committed into a React root; component in `<Name>View.tsx` | `react`, `react-dom`, types; `.tsx` in the ts-loader rule and in `resolve.extensions`, `"jsx": "react-jsx"` |
| `vue3` | mounts a Vue 3 app into `root`, `render()` updates its reactive props; component in `<Name>View.ts` | `vue3` (alias of `vue@3`); Vue 3 flags in a `DefinePlugin` |
| `vue` | Vue 2 component registered with `component` (classic SDK widget) | `vue` and `vue-template-compiler` 2.6.14, `vue-loader` 15.9.8 (the versions of corvina-frontend), `vue-style-loader`, `vue-typescript-import-dts` as devDependencies; `VueLoaderPlugin`, `.vue` rule and extension, `vue-style-loader` for CSS |

All the widgets have the same two properties (`message`, translatable, and `value`, that accepts
datalinks) and a button with an internal counter, to show the three kinds of state: widget properties,
view state and i18n. See [widgets_without_vue.md](widgets_without_vue.md) for the render contract.

The React roots and the Vue 3 apps are kept in a `WeakMap` by `root`, out of the widget: widgets live
in the dashboard store, observed deeply by Vue 2.

The root element of the view has the class `<package>-<name>` (e.g. `acme-gauges-temperature-gauge`),
unique also among the packages. The `static styles` of the widgets rendering themselves are scoped by
Corvina anyway (see [widgets_without_vue.md](widgets_without_vue.md#styles)); the Vue 2 widgets use
`<style scoped>`.

### Vue 3 limits

- `vue` is the Vue 2 of Corvina (webpack external): Vue 3 is installed as `vue3` and imported from `"vue3"`.
- The `.vue` files are compiled for Vue 2 by vue-loader 15: Vue 3 components are written with `h()`.
- Vue 3 libraries importing `"vue"` (Vuetify 3, Pinia, vue-router 4) would receive Vue 2: they need a
  separate bundle, e.g. a Vite library or a custom element imported by the widget.

## create project

```bash
corvina-sdk create project <dir> --package <name> [--tech <tech> --widget <Name>] [--skip-install] [--dry-run]
```

Creates a minimal project, without UI libraries: each technology adds what it needs when its first
widget is created, so Vue is installed only by the projects with Vue 2 widgets.

`--package` is required (asked in a terminal): it is the name of `src/manifest.json`, the prefix of
the widget types (`<package>.<Name>`), the name of the uploaded zip and the identity of the package in
Corvina, so it must be unique in the organization (e.g. `acme-gauges`). `org`, the name of the SDK
examples, is refused.

- Copied from the SDK containing the CLI: `_corvina` (typings), `static`, `index.html`, `index.ts`,
  `.env.example`, `gulpfile.js`, `doc`, `scripts`, `src/resources`, `yarn.lock` and the CLI itself.
- Generated: `package.json` with just the build (webpack, ts-loader, TypeScript, loaders, dev server,
  gulp), `webpack.config.js` and `tsconfig.json` without Vue, an empty `src/main.ts`, and
  `src/manifest.json` named `--package`. The scripts are the ones of the SDK: `dev` with the released
  Corvina runtime, `dev:local` with a local build of corvina-frontend (see [update_sdk.md](update_sdk.md)).

With `--tech` and `--widget` it creates also the first widget. Then it runs the install: the copied
`yarn.lock` keeps the versions tested with the SDK, the packages not used by the project are dropped.

Why Vue is not needed at build time:
- `corvina` and Vue 2 are provided by Corvina at runtime (webpack externals);
- the typings in `_corvina` import many packages (vue, vuex, lodash, three, ...): those not installed
  become `any` inside the typings, ts-loader does not report errors in declaration files, and the types
  of the SDK classes (`BaseGraphicWgt`, `Value`, ...) are unchanged: the errors in the widget code are
  reported as in the SDK.

`package.json` takes the name of the folder: the hot updates are dispatched by `index.html` with the
`output.uniqueName` of `webpack.config.js` (`corvina_sdk_app`), not with the package name as in the SDK.

### Versions and corvina-frontend

corvina-frontend downloads `lib.js` and runs it with `new Function("self", "exports", "adjustPath", ...)`
(`loaderCustomWidget.ts`), where `self` holds only `corvina`, `vue`, `Vue`, `document` and
`webpackChunkvuex_corvina_app`: every package has its own webpack runtime (`runtimeChunk: false`) inside
that `self`, so it does not depend on the webpack of Corvina. The versions are aligned anyway:

- webpack and TypeScript have the ranges of corvina-frontend (`^5.104.1`, `^5.9.3`), in the SDK and in
  the created projects; the `yarn.lock` of the SDK resolves them to the versions of the frontend
  (5.105.2, 5.9.3), and the created projects inherit it. webpack is held there by
  `yarn set resolution "webpack@npm:^5.104.1" npm:5.105.2` (only in the lockfile): repeat it with the
  new version when the frontend moves;
- the Vue 2 widgets are compiled with the Vue 2 of corvina-frontend (2.6.14, vue-loader 15.9.8),
  the one that runs them.

With the recent webpack versions (5.111, not 5.105) vue-loader 15 gets a warning on the default import
of the `<style>` blocks, used only by CSS modules: the `vue` setup filters it with `ignoreWarnings`.

### Isolation of the packages

What keeps the packages of an organization apart when corvina-frontend loads them together:

| | How | Limit |
|---|---|---|
| webpack runtime, `lib` and chunk globals | one runtime per package inside the `self` of `loaderCustomWidget.ts` | — |
| UI libraries | React, Vue 3, lit-html are bundled into each `lib.js` | each package loads its own copy |
| Code splitting | `new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })`: the chunks of the dynamic imports are merged into `lib.js` | without it, an `import()` fails with `ChunkLoadError`: Corvina runs only `lib.js` |
| Widget types, Vue 2 component names | `<package>.<Name>`, `Sdk<Package><Name>` | the package name must be unique in the organization: a package uploaded with the name of another one replaces it |
| CSS | `static styles` scoped by Corvina, `static shadow` for a shadow root, `<style scoped>` for Vue 2, class `<package>-<name>` | imported CSS files and `static globalStyles` are global |
| Globals | none | `window`, `document`, `customElements`, the `corvina` module and, for Vue 2 widgets, the Vue of Corvina are shared by all the packages |

## Claude Code skills

The SDK has a Claude Code skill in `.claude/skills/corvina-widget`, to build widgets from a
specification or from HTML code: the properties in the class and in the view of the technology,
datalinks, translations, serialization, the gallery defaults and the property handlers. Claude
uses it by itself when asked to create or change a widget, or with `/corvina-widget`.

- `create project` copies it into the new projects;
- `corvina-sdk add skills` installs it, or updates it, in a project created before
  (`--dry-run` lists the files);
- `node .claude/skills/corvina-widget/scripts/check-widget.js src/widgets/<Name>` checks that every
  property of a widget is in the properties handler, the constructor, `serialize()` and the gallery
  defaults.

The skill is maintained in the SDK: the projects get the version of the CLI that creates or updates
them.

## Adding a technology

1. Add the templates in `cli/templates/<tech>/`: files ending in `.tpl`, where `__Name__`, `__camelName__`,
   `__kebabName__`, `__cssClass__` (`<package>-<kebab name>`, the class of the view root), `__title__` and
   `__type__` are replaced (also in the file names).
2. Add the technology to `cli/lib/techs.js`: dependencies, `component: true` for Vue 2 widgets, setup steps.
3. When the build needs changes, add a setup step to `cli/lib/setup.js`: it patches the files as text,
   must detect when the change is already there and, when the expected code is not found, return the
   change to do by hand instead of guessing.
4. Add the binding of the properties in the view to the skill:
   `.claude/skills/corvina-widget/references/tech-<tech>.md`, linked from its `SKILL.md`.
