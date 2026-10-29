# Update 1.2.0

## Help of the widgets
A widget can bring its own help, shown by the dashboard editor from the help button of its properties:
pages in Markdown, `docs/<locale>/<page>.md` next to the widget, compiled into the package by
`scripts/markdown-loader.js` (new devDependency `markdown-it`) and registered with the new `help` field
of `registerWidget` through `widgetHelp` (`src/help.ts`). One page, or a guide of several pages with
links between them; the editor picks the language of the user, falling back to english, and cleans the
html. The example `MyWidget` has two pages in english and italian. See
[doc/widget_help.md](doc/widget_help.md). The editor of Corvina shows it from the release that supports
it; the older ones ignore the field.

## TypeScript definitions
`WidgetRegistrationArgs.help`, and the types `XViewWidgetHelp`, `WidgetHelpPage`, `WidgetHelpGuide` and
`HelpTab` exported by `corvina`.

# Update 1.1.0
From this version the SDK follows [semantic versioning](https://semver.org): MAJOR for changes that
require changes to the existing widgets or projects, MINOR for new features, examples and toolchain
updates compatible with the existing widgets, PATCH for fixes. Up to 1.0.65 every release incremented
the patch number.

## Images in the asset storage
New example `ImageGallery` (`src/examples/ImageGallery`): it stores any number of images in the asset
storage of the dashboard and shows one of them, chosen at runtime by a datalink. `imageAssets.ts` has
reusable helpers around the asset API: storage status, asset names, upload, download as data URL,
save guard. The example is not registered in `src/main.ts`. See
[Images and assets](https://docs.corvina.cloud/docs/sdk-dashboard-widget/image_assets).

## Vue 2.7
The Vue 2 widgets are compiled with the Vue of corvina-frontend: `vue` and `vue-template-compiler`
2.7.16, `vue-loader` `^15.10.0`, `vuetify` 2.7.2; `vue-style-loader` is a devDependency. The CLI
creates the Vue 2 widgets with the same versions. Use the Options API, which runs also on the Corvina
versions with Vue 2.6: no `<script setup>`, no Composition API imported from `"vue"`.

## TypeScript definitions
`_corvina` is aligned with the `develop` branch of corvina-frontend (see
[doc/update_sdk.md](doc/update_sdk.md)). Among the others, the definitions now declare the asset API:
`projectStore.beginSaveGuard`, `flushSave` and `endSaveGuard`, `BaseWgt.getAssets`, `removeAsset` and
`freeAssetsByName`, and the `ts` argument of `BaseGraphicWgt.setPropertyValue`.

## Build warnings
`webpack.config.js` ignores the harmless warning of the recent webpack versions about the default
exports of the `<style>` blocks imported by vue-loader 15.

# Update 1.0.65
## Corvina instance of the dev server in .env
`setCommunicationSettings` in `index.ts` takes the host, the realm and the i18n host from `.env`
(`CORVINA_HOST`, `CORVINA_REALM`, `CORVINA_I18N_HOST`, see `.env.example`), with `corvina.cloud` and the
placeholder `realm` as defaults. webpack loads the file with its option `dotenv` (variables with
prefix `CORVINA_`, the shell ones win); `.env` is in `.gitignore`, `create project` copies `.env.example`.

## Widgets without Vue.js
The `component` field of `registerWidget` is optional: a widget class implementing `render(root)` draws itself,
with the DOM API or any UI library. Requires a Corvina version that includes the SDK render host.
See [doc/widgets_without_vue.md](doc/widgets_without_vue.md) and the examples `MyRenderWidget` and `MyLitWidget`.

## corvina-sdk CLI
`yarn corvina-sdk create widget <tech> <Name>` creates a widget with the DOM API, lit-html, React, Vue 3 or Vue 2,
preparing the build for the technology. `yarn corvina-sdk create project <dir>` creates a new SDK project.
The CLI is a separate package without dependencies, `@corvina/widget-sdk-cli` in `cli/`. See [doc/cli.md](doc/cli.md).

## Claude Code skill corvina-widget
`.claude/skills/corvina-widget` helps Claude to build widgets from a specification or from HTML code, in
every technology: properties in the class and in the view, datalinks, translations, serialization,
gallery defaults and property handlers, with a consistency check (`scripts/check-widget.js`).
`create project` copies it into the new projects, `corvina-sdk add skills` installs or updates it.
The properties handler of the created widgets extends `BaseGraphicPropsHandler` (position, size, style
and visibility in the properties panel).

## Isolation of the widget packages
- `static styles` of the widgets rendering themselves are scoped by Corvina to the widgets of the type
  (selectors prefixed with `[data-sdk-widget="<type>"]`); `static globalStyles` for the content outside
  the widget root; `static shadow = true` renders into a shadow root. See
  [doc/widgets_without_vue.md](doc/widgets_without_vue.md#styles).
- One file per package: `LimitChunkCountPlugin({ maxChunks: 1 })` in `webpack.config.js`, since
  Corvina runs only `lib.js` and a dynamic `import()` failed with `ChunkLoadError`. `create widget`
  adds it to the projects created before.
- `create project` requires `--package`, unique in the organization, and refuses `org` (packages with
  the same name replace each other when uploaded); `create widget` warns when the package is `org`.
- The root class of the created widgets is `<package>-<name>`.

## Compatibility with the existing widgets and Corvina versions
- The package is now `@corvina/widget-sdk`: `output.uniqueName` keeps the previous name
  (`vuex-corvina-app`), so the webpack globals and the hot updates dispatched by `index.html` are unchanged.
- `yarn dev` uses the released Corvina runtime, `yarn dev:local` a local build of corvina-frontend
  (see [doc/update_sdk.md](doc/update_sdk.md)).
- The examples without Vue.js are registered only in `src/examples/main.ts.example`: they need a
  Corvina version with the SDK render host.
- Dev server: the labels of the properties panel inherited from Corvina (e.g. `BasePropsHandler.id`)
  showed the i18n key, since `lib.js` registers the widgets before the texts are loaded: `index.ts`
  refreshes them when `initCorvina` resolves. It works with every Corvina version.

## webpack and TypeScript aligned with corvina-frontend
webpack `^5.104.1` (5.105.2) and TypeScript `^5.9.3` (5.9.3), the versions of corvina-frontend.

# Update 1.0.51
## Updated corvina-app library
Updated to corvina-app chart-1.0.51.
Compatible with login of version 1.0.51.

# Update 1.0.42-hotfix
## Updated corvina-app library
Updated to corvina-app chart-1.0.42-hotfix

# Update 1.0.42
## Updated corvina-app library
Updated to corvina-app chart-1.0.42

# Update 1.0.33
## Updated corvina-app library
Updated to corvina-app chart-1.0.33

# Update 1.0.1
## Updated corvina-app library
Updated to last corvina-app library

## Support for multiple widgets or a gallery of widgets
Is now possible to upload a gallery of widgets with the same sdk project.
Widget are organized in new hierarchy:
```
- > org
  - > widget1
    - > widget1.ts
    - > widget1.vue
    - > ...
  - > widget2
    - > widget2.ts
    - > widget2.vue
    - > ...
  - > ...
  - > widgetN
    - > widgetN.ts
    - > widgetN.vue
    - > ...
```
We suggest to use as widget type a name that respect the hierarchy:
e.g:
- Widget1: org.widget1
- Widget2: org.widget2
- Widget3: org.widget3

In manifest we need to specify the widgets of the current package.
```typescript
{
    "name": "org",
    "source": "sdk",
    "main": "lib.js",
    "widgets": ["org.MyWidget", "org.SimpleClockWidget"],
    "resources":
    {
        "images": [ "clockface.svg"],
        "icon": [ "corvina-widget1.png", "corvina-widget2.png" ]
    }
}
```
**Previous manifest** format and directories hierarchy is **still supported** but if you need to load a gallery of widgets correctly use the new format.

Widgets that belong to the same gallery will be uploaded and removed in block, the user interface inform you if are removing a single widget or a gallery of widgets.







