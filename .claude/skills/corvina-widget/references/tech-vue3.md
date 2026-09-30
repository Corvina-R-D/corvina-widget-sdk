# Binding in a Vue 3 widget (`vue3`)

Two files: the class `<Name>.ts` and the Vue 3 component `<Name>View.ts`. Vue 3 is the package
`vue3` (alias of `vue@3`): **import from `"vue3"`**, `"vue"` is the Vue 2 of Corvina. Created by
`corvina-sdk create widget vue3`.

The class mounts one Vue 3 app into `root` on the first `render()`, keeps it in a `WeakMap` by `root`
with a `shallowReactive` props object; the following renders copy the widget properties into it and
Vue 3 updates the view. `onUnmount` unmounts the app.

## The props of the view are the properties of the widget

```typescript
// <Name>.ts, render(): plain values, the widget is already observed by Vue 2
const props: TankViewProps = {
  label: this.label.unwrap(),
  level: Number( this.level.unwrap() ) || 0,
  fillColor: this.fillColor.unwrap(),
  showAlarm: !!this.showAlarm.unwrap()
};
```

```typescript
// <Name>View.ts: render functions, the .vue files of the project are compiled for Vue 2
export default defineComponent( {
  name: "TankView",
  props: {
    label: { type: String, default: "" },
    level: { type: Number, default: 0 },
    fillColor: { type: String, default: "#1976d2" },
    showAlarm: { type: Boolean, default: false }
  },
  setup( props ) {
    return () => h( "div", { class: "tank" }, [
      h( "span", { class: "label" }, props.label ),
      h( "div", { class: "level", style: { height: `${props.level}%`, background: props.fillColor } } ),
      props.showAlarm ? h( "span", { class: "alarm" }, "!" ) : null
    ] );
  }
} );
```

For every property: a field of `<Name>ViewProps`, a key in the object of `render()`, a prop of the
component, its use in the render function.

## Where each thing goes

| What | Where |
|---|---|
| Markup (from the HTML mockup) | `h( tag, { class, style, onClick, ... }, children )` in the render function |
| View state | `ref` / `reactive` in `setup()`: no `requestUpdate()` needed |
| Events that change a widget property | a callback prop (see "Writing a property" in class-and-serialization.md) |
| CSS | `static styles` of the class, scoped to the widget by Corvina: rules under the widget root class |

No `innerHTML` prop with property values. Vue 3 libraries that import `"vue"` (Vuetify 3, Pinia) do
not work in this setup.

## Checklist
- [ ] every prop of the component is filled by `render()` of the class
- [ ] imports from `"vue3"` only
- [ ] no `.vue` files for Vue 3 components
