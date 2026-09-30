# Widgets without Vue.js

A widget can be registered without a Vue component: its class, extending `BaseGraphicWgt`, draws
itself by implementing `render(root)`. Corvina keeps managing the widget box (position, size, borders,
background, visibility), the content of `root` belongs to the widget.

No UI library is required: the widget can use the DOM API, a canvas, plotly, d3, or a template
library such as lit-html or preact, bundled into the widget package.

See the examples `src/examples/MyRenderWidget` (DOM API) and `src/examples/MyLitWidget` (lit-html).

## Registration

The `component` field is omitted:

```typescript
registerWidget({
  type: MyRenderWidgetType,
  class: MyRenderWidget,          // implements render()
  gfx: myRenderWidgetGallery.getDefaultConfiguration,
  props: myRenderWidgetGallery.getPropsHandler(),
  icon: adjustPath( iconMyWidget ),
  category: "MyGallery"
}, manifest);
```

Widgets registered with a Vue component keep working as before.

## Lifecycle

```
onMount(root) -> render(root) -> ( onResize(size, root) | render(root) )* -> onUnmount(root)
```

| Hook | When |
|---|---|
| `onMount(root)` | Once, when `root` is attached to the document, before the first render. Create here the DOM skeleton or the library instances |
| `render(root)` | After `onMount` and on every update. It must be idempotent |
| `onResize(size, root)` | When the size of `root` changes, before the render that follows |
| `onUnmount(root)` | Once, before `root` is removed. Release here timers, subscriptions and library instances |

Only `render` is mandatory. The interface `IRenderableWidget` exported by `corvina` describes the hooks.

`render` runs again when:
- a widget property changes through `setPropertyValue` (datalinks, properties panel, undo);
- the size of the widget changes;
- the language changes;
- the widget calls `this.requestUpdate()`, needed when the render depends on internal state.

Updates are batched: all the changes of the same task produce one render.
Moving the widget does not render it again.

## Drawing

`render(root)` can:

1. **draw into `root` and return nothing**, e.g. with the DOM API:
   ```typescript
   render( root: HTMLElement ) {
     root.querySelector( ".value" ).textContent = String( this.value.unwrap() );
   }
   ```
2. **return a DOM `Node`**, placed into `root` in place of its content;
3. **return any other value**, committed into `root` by the `static renderer` of the class.
   With lit-html:
   ```typescript
   import { html, render } from "lit-html";

   export default class MyLitWidget extends BaseGraphicWgt implements IRenderableWidget {
     // `host` binds `this` of the template event listeners to the widget
     static renderer: WidgetRenderer = ( template, root, widget ) => render( template, root, { host: widget } );

     render() {
       return html`<button @click=${this.increment}>${this.clicks}</button>`;
     }
   }
   ```
   With preact: `static renderer = ( vnode, root ) => preactRender( vnode, root )`.

Values coming from datalinks can contain any text: assign them as text (`textContent`) or through a
template library that escapes them, never concatenated into `innerHTML`.

## Styles

The styles are static members of the class; each one is a CSS string, an object with `cssText`
(such as the result of lit `css`), or an array of them.

| Member | Applies to | Isolation |
|---|---|---|
| `static styles` | the widgets of the type | scoped by Corvina: every selector is prefixed with `[data-sdk-widget="<type>"]`, the host element of the widgets of the type |
| `static globalStyles` | the whole page, as written | none: for what the widget places outside its root, e.g. a popup appended to `document.body`; prefix its selectors by hand |
| `static shadow = true` | — | the widget renders into a shadow root with its `styles`: isolation in both directions |

With the scoping, a selector of `static styles` cannot reach the rest of the page: `h2`, `button`,
`:root` or `.card` match only inside the widgets of the type (`:root` and `body` match nothing: CSS
variables go on the widget root class). `@media`, `@supports`, `@container`, `@layer` and nested
rules are scoped too; `@keyframes` and `@font-face` are global, so their names should be specific to
the widget. The styles are added once to the document for all the widgets of the type.

The CSS of Corvina still applies inside the widget (the widget is in the page). The scoped selectors
have one attribute more than the rules of Corvina with the same selector, so the rules of the widget
win on those, but what the widget does not set is inherited or comes from the rules of Corvina.
With `static shadow = true` the CSS of the page does not arrive: only the inherited properties (font,
color) and the CSS variables of the theme cross the shadow root. The classes of Corvina, e.g. the
icons of its font, do not work inside it.

The CSS files imported by the code (`import "./gauge.css"`, or the CSS of a library) are added to
the document by the build, as they are: they are global. Prefer `static styles`, or prefix their
selectors with the widget root class.

`root` fills the content box of the widget and has `position: relative`.

## Reactivity

Widgets are stored in the reactive state of the dashboard: every object assigned to a widget field is
observed by Vue, deeply. For library instances (charts, maps), caches and large data use
`markNonReactive` exported by `corvina`:

```typescript
import { markNonReactive } from "corvina";

onMount( root: HTMLElement ) {
  this.chart = markNonReactive( new Chart( root, options ) );
}
```

DOM nodes and primitive values are never observed.

## Errors

An exception thrown by a hook replaces the widget with the error placeholder, as for the widgets
rendered by Vue components.

## Compatibility

- Requires a Corvina version that includes the SDK render host: on previous versions a widget
  without `component` cannot be registered.
- Custom property controls (`registerPropControl`) are still Vue components.
- The package is one file, `lib.js`, the only one Corvina runs: the webpack configuration merges the
  chunks of the dynamic imports (`LimitChunkCountPlugin`, see [cli.md](cli.md)), which otherwise
  would never be loaded.
- The widget code runs with the page: `window`, `document` and `customElements` are the ones of
  Corvina. Globals, `window` listeners and custom elements defined by the widget are shared with the
  other packages (a custom element name can be defined once per page).
