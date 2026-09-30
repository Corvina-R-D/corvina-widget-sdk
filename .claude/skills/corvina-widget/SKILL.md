---
name: corvina-widget
description: Build or change Corvina dashboard widgets with the Corvina SDK, from a specification or from HTML code, in the technology of the project (DOM API/plain HTML, lit-html, React, Vue 3, Vue 2). Covers the widget properties in the class and their binding to the view, datalinks (Value), translatable texts, serialize() and deserialization, the gallery default configuration and the property handlers (propControl) shown in the editor. Use it whenever a Corvina widget is created, a property is added, renamed or removed, a mockup is turned into a widget, or a property control is configured.
---

# Corvina widgets

A widget of the SDK is a folder in `src/widgets/<Name>/`, registered in `src/main.ts` and listed in
`src/manifest.json` (examples in `src/examples/` of the SDK repository, not copied into the projects):

| File | Role |
|---|---|
| `<Name>.ts` | class extending `BaseGraphicWgt`: the properties, their deserialization (constructor) and `serialize()`; for DOM, lit-html, React and Vue 3 also `render()` |
| `<Name>View.tsx` / `<Name>View.ts` / `<Name>.vue` | the view, for React / Vue 3 / Vue 2 |
| `<Name>PropsHandler.ts` | the properties shown in the editor, with their control (`propControl`) |
| `<Name>Gallery.ts` | `getDefaultConfiguration()`: the state of a widget dropped from the gallery |
| `defs.ts` | the widget type, `<package>.<Name>` |

## Workflow

### 1. Technology and skeleton
- Technology: the one asked by the user; otherwise the one of the other widgets of the project (a
  `<Name>View.tsx` means React, a `<Name>View.ts` importing `"vue3"` Vue 3, a `.vue` Vue 2, `lit-html`
  imports lit-html, `render(root)` with the DOM API `dom`). Ask when the project has none.
- New widget: create the skeleton with the CLI, never by hand — it registers the widget, updates the
  manifest and prepares the build for the technology:
  ```bash
  yarn corvina-sdk create widget <dom|lit|react|vue3|vue> <Name>
  ```
  The skeleton is a sample: replace its properties (`message`, `value`) with the planned ones and
  remove the rest of the sample (the `clicks` texts of `useCorvinaI18n`, the button and the counter,
  `clicksLabel` in React and Vue 3).

### 2. Property plan
Before writing code, list the properties in a table and show it to the user when the specification
leaves choices open:

| name | meaning | type | control | layer | datalink | i18n | default |
|---|---|---|---|---|---|---|---|
| `level` | tank level, % | numeric | `InputPropControl` | attributes | yes | no | `50` |
| `label` | title shown on top | string | `InputPropControl` | attributes | no | yes | `"Tank"` |
| `fillColor` | color of the liquid | string | `ColorPropControl` | Style | no | no | `"#1976d2"` |

Layers: the main properties (values, texts) in `"attributes"`, colors and appearance in `"Style"`,
alarms and thresholds in `"Alarms"`, other groups in a section named after them.

From a specification: one row per configurable or live aspect. From HTML: follow
[references/from-html.md](references/from-html.md). The size, position, border and background of the
widget box are already properties of the base class: never add them.

Choose type, control, layer and options in [references/properties.md](references/properties.md);
a custom control only when none fits: [references/custom-prop-controls.md](references/custom-prop-controls.md).

### 3. Write every property in all its places
Each property has the **same name** in:

1. the properties handler (extending `BaseGraphicPropsHandler`, after `super.createCustomPropsHandler()`):
   `this.<name> = { layer, type, propControl, attachTag, supportI18n, display, description, ... }`;
2. the class: a field (a `Value` when it accepts datalinks), read in the constructor from
   `args.initState.<name>` **with its default** (`?? <default>`: dashboards saved before the
   property existed do not have the key);
3. `serialize()`: `serializedWgt.<name> = ...` (the value: `.v` or `.unwrap()` for a `Value`);
4. `getDefaultConfiguration()` of the gallery: `"<name>": <default>`;
5. the view, following the technology:
   [DOM API](references/tech-dom.md) · [lit-html](references/tech-lit.md) ·
   [React](references/tech-react.md) · [Vue 3](references/tech-vue3.md) · [Vue 2](references/tech-vue2.md).
   When the view changes a property (an input, a switch of the widget) it calls
   `setPropertyValue`, with `attachTagPermission: "readwrite"` in the handler to write it to the tag.

Class, datalinks, translations and serialization rules:
[references/class-and-serialization.md](references/class-and-serialization.md).

Removing or renaming a property: change all the places; a rename breaks the dashboards already
saved, keep reading the old key in the constructor when that matters.

### 4. Check
```bash
node .claude/skills/corvina-widget/scripts/check-widget.js src/widgets/<Name>
yarn build
```
The script lists every property with the places where it was found and reports the missing ones
(e.g. a property never serialized, a datalink property that is not a `Value`). `yarn build`
type-checks the widget. Then the widget is tried with `yarn dev`, which needs a login to a Corvina
instance: drop it from the gallery, change every property in the properties panel, save and reload
the dashboard (the values must survive). When that is not possible (no account, unattended work),
rely on the check and the build, and list for the user what to try.

## Rules
- Values from datalinks and from the properties panel are data: show them as text (`textContent`,
  template expressions), never through `innerHTML`, `v-html`, `dangerouslySetInnerHTML`, `unsafeHTML`.
- CSS of the widgets rendering themselves goes into `static styles`, scoped by Corvina to the widget:
  keep its rules under the widget root class (`<package>-<name>`), never rely on `body`, `html`,
  `:root` (they match nothing). Only what the widget places outside its root (popups on
  `document.body`) goes into `static globalStyles`, prefixed by hand; imported `.css` files are global.
- One file per package: `webpack.config.js` must keep `LimitChunkCountPlugin({ maxChunks: 1 })`
  (Corvina runs only `lib.js`, a dynamic `import()` would fail otherwise).
- Images, icons and fonts: `require` + `adjustPath`, and listed in `src/manifest.json` (see
  from-html.md), or they break in the dashboard.
- Library instances, caches and large data: never plain fields of the widget (the widget is
  observed deeply by Vue 2): keep them in a `WeakMap` by `root`, or wrap them with `markNonReactive`
  from `corvina`. Create them, and timers, when mounted; release them when unmounted.
- Custom property controls are Vue 2 components, whatever the technology of the widget (see
  custom-prop-controls.md).
- Widgets that act on input (buttons, switches, inputs writing properties or tags): do nothing in the
  editor (`projectStore.getInEditor`) and when the widget is disabled
  (`this.getPropertyValue( "disabled" )`); see "Writing a property" in class-and-serialization.md.
