# Binding in a DOM API widget (`dom`, plain HTML)

The class extends `BaseGraphicWgt` and implements `IRenderableWidget`: no UI library, it draws with
the DOM API. Contract in `doc/widgets_without_vue.md`.

```
onMount(root) -> render(root) -> ( onResize(size, root) | render(root) )* -> onUnmount(root)
```

## Where each thing goes

| What | Where |
|---|---|
| Markup (from the HTML mockup) | `onMount(root)`: `root.innerHTML = \`...\`` with **static markup only**, elements marked with `data-ref="<name>"` |
| Event listeners | `onMount(root)`, on the elements of the skeleton |
| Property values | `render(root)`: assign them to the elements, never through `innerHTML` |
| CSS | `static styles = \`...\``, scoped to the widget by Corvina: rules under the widget root class |
| Timers, subscriptions, library instances | created in `onMount`, released in `onUnmount` |
| Listeners on elements of `root` | added in `onMount`; they go away with `root`, no cleanup needed |
| Listeners on `window` / `document`, observers | added in `onMount`, removed in `onUnmount` |

## Reading the properties in render()

```typescript
render( root: HTMLElement ) {
  const ref = ( name: string ) => root.querySelector( `[data-ref=${name}]` ) as HTMLElement;
  const value = Number( this.value.unwrap() ) || 0;           // Value: unwrap() gives the current value
  ref( "label" ).textContent = this.label.unwrap();            // text: textContent, never innerHTML
  ref( "bar" ).style.width = `${Math.min( Math.max( value, 0 ), 100 )}%`;
  ref( "bar" ).style.background = this.barColor.unwrap();      // colors, sizes: style properties
  ref( "alarm" ).hidden = !this.showAlarm.unwrap();            // visibility: hidden / classList
  ref( "icon" ).setAttribute( "src", adjustPath( iconPath ) ); // images: see from-html.md
}
```

`render()` runs after every property change (datalinks, properties panel, undo), size change,
language change and `requestUpdate()`: it must be **idempotent**, set every dynamic part every time.

## Internal state

State that is not a widget property (e.g. an expanded panel, a click counter) is a plain field of the
class: change it in the listener, then call `this.requestUpdate()`. It is not serialized.

## Checklist
- [ ] `innerHTML` only in `onMount`, with a constant string
- [ ] every dynamic element has a `data-ref` and is updated in `render()`
- [ ] listeners added in `onMount` (once), not in `render()`
- [ ] `onUnmount` releases timers, observers and listeners outside `root` created by `onMount`
