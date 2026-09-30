# From an HTML mockup to a widget

The mockup (HTML, CSS, maybe some JavaScript) becomes the view of the widget in the technology of
the project; its variable parts become widget properties.

## 1. Find the properties

Read the mockup and list every part that the user of the dashboard should configure or that comes
from the field:

| In the mockup | Property | Usually |
|---|---|---|
| a number, a measure, a state shown as text | the value | datalink (`attachTag: true`), numeric/string |
| a fixed title, a label, a unit | a text | translatable (`supportI18n: true`) when meant for people |
| a color (fill, text, threshold) | a color | color control |
| a limit (min, max, threshold) | a number | numeric, sometimes datalink |
| an element shown or hidden | a boolean | boolean control, sometimes datalink |
| a choice among variants (layout, icon, style) | an enumeration | select control with options |

Everything else stays constant markup. Write the property plan (SKILL.md, step 2) before the code;
when a part is ambiguous (constant or property? datalink or not?) ask the user.

Sizes and position of the widget box are properties of the base class (width, height, x, y, border,
background): do not add them, and do not give the root element of the mockup a fixed size. The
background of the page (`body`) is not part of the widget: drop it. A background of the widget root
can become the default of the base background, `"bgColor": "<color>"` in `getDefaultConfiguration()`.

## 2. Adapt the markup

- The root of the view fills the widget box: `width: 100%; height: 100%` (the box has
  `position: relative`); fixed pixel sizes inside can become relative (%, flex) so the widget scales
  when resized.
- `<html>`, `<head>`, `<body>` are dropped: only the content of the body becomes the view.
- `id` attributes: remove them or make them unique per widget instance (a dashboard can hold many
  instances); select elements from `root` (DOM API) or with the technology bindings, never with
  `document.getElementById` / `document.querySelector`.
- Inline `onclick=...` and `<script>` become event handlers of the technology (see the tech file).
- Syntax of the technology: JSX (`className`, `style={{}}`), lit-html (`@click`, `?hidden`),
  `h()` for Vue 3, Vue 2 template (`:style`, `@click`, `v-if`).

## 3. Adapt the CSS

- DOM API, lit-html, React, Vue 3: the CSS goes into `static styles` of the class. Corvina scopes it to
  the widgets of the type (every selector is prefixed with `[data-sdk-widget="<type>"]`): `h2` or
  `button` style only the widget, while `body`, `html`, `:root` match nothing, so turn them into rules
  of the widget root. Keep the rules under the class of the widget root (`<package>-<name>`, e.g.
  `.acme-tank`, created by the CLI). CSS variables of the mockup go on the widget root; `@keyframes`
  names are global: prefix them with the root class.
- What the mockup places outside the widget (a popup or a tooltip appended to `document.body`) is not
  reached by `static styles`: its CSS goes into `static globalStyles`, global, with selectors prefixed
  by hand.
- The CSS of Corvina applies inside the widget too. When the mockup relies on the browser defaults or
  on its own reset, and the result differs in the dashboard, render into a shadow root:
  `static shadow = true` (the icons of the Corvina font do not work inside it).
- Vue 2: `<style scoped>` in the `.vue` file.
- Colors that become properties are set from the property (inline style or CSS variable on the root
  set in the view), not in the CSS.
- An element shown and hidden by a property (an alarm, a badge) in a box of fixed size: hide it with
  `visibility: hidden` to keep its space, so the rest does not move; `display: none` when the layout
  should close the gap.
- `@import` of fonts from external sites may be blocked in production: prefer fonts shipped with the
  widget (see resources).

## 4. Resources: images, icons, fonts

In the dashboard the widget files are served from the Corvina object store, not from the widget
folder. A resource works only when:

1. it is in `src/resources/images` (or a subfolder of `src/resources`) with a **unique file name** in
   the package (png, jpg, gif, svg for images; woff, woff2, ttf, eot for fonts);
2. the code gets its path with `require( "<relative path>" )` and passes it to `adjustPath( ... )`
   (global, declared with `declare var adjustPath;`):
   ```typescript
   const tankImage = require( "../../resources/images/tank.svg" );
   img.src = adjustPath( tankImage );
   ```
3. its file name is listed in `src/manifest.json`, `resources.images` (fonts: `resources.fonts`):
   ```json
   "resources": { "images": ["corvina-widget1.png", "tank.svg"], "icon": ["corvina-widget1.png"] }
   ```

`adjustPath` looks the file up by name in the manifest: a resource missing there works in the dev
server (where `adjustPath` returns the path as it is) and **breaks in the dashboard**. For the same
reason CSS `url(...)` does not work for images of the widget: set them from the code
(`style.backgroundImage = \`url(${adjustPath( image )})\``) or use `<img>`.

Inline SVG in the markup needs none of this, and its colors can be bound to properties.

## 5. JavaScript of the mockup

- Values computed from other values (e.g. a percentage from value/min/max) are computed in the view
  from the properties, every render.
- Animations and timers: start them when the widget is mounted, stop them when it is unmounted
  (`onMount`/`onUnmount`, `useEffect` cleanup, `onUnmounted`, `beforeDestroy`).
- Global variables, `window` listeners, `document.write`: rewrite them scoped to the widget.
- External libraries loaded from a CDN with `<script>`: install them as dependencies and import them,
  they are bundled into the widget package.

## 6. Check with the mockup

Run the dev server (`yarn dev`), add the widget to a dashboard and compare it with the mockup at
the default size of the gallery; then resize it and change every property from the properties panel.
