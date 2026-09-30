# Binding in a React widget (`react`)

Two files: the class `<Name>.ts` (Corvina side: properties, serialization) and the React component
`<Name>View.tsx` (pure view). `render()` of the class returns
`createElement( <Name>View, props )`; the `static renderer` commits it into a React root created on
the first render and kept in a `WeakMap` by `root` (never on the widget: widgets are observed deeply
by Vue 2 in the dashboard store). Created by `corvina-sdk create widget react`.

## The props of the view are the properties of the widget

```typescript
// <Name>.ts
render() {
  // Plain values, never the widget or Value objects: React compares the props to decide what to update
  return createElement( TankView, {
    label: this.label.unwrap(),
    level: Number( this.level.unwrap() ) || 0,
    fillColor: this.fillColor.unwrap(),
    showAlarm: !!this.showAlarm.unwrap(),
    clicksLabel: String( i18n.t( "clicks" ) )
  } );
}
```

```tsx
// <Name>View.tsx
export interface TankViewProps { label: string; level: number; fillColor: string; showAlarm: boolean; clicksLabel: string }

export default function TankView( { label, level, fillColor, showAlarm }: TankViewProps ) {
  return (
    <div className="tank">
      <span className="label">{ label }</span>
      <div className="level" style={ { height: `${level}%`, background: fillColor } } />
      { showAlarm && <span className="alarm">!</span> }
    </div>
  );
}
```

For every property: a field of `<Name>ViewProps`, a key of the object in `render()`, its use in the JSX.

## Where each thing goes

| What | Where |
|---|---|
| Markup (from the HTML mockup) | JSX of `<Name>View.tsx`: `class` -> `className`, `for` -> `htmlFor`, inline `style` as objects, self-closing tags |
| Property values | props of the view, computed from the widget in `render()` |
| View state (hover, open panels, counters) | React hooks in the view (`useState`, ...): no `requestUpdate()` needed |
| Events that change a widget property | a callback prop created in `render()` (see "Writing a property" in class-and-serialization.md) |
| CSS | `static styles` of the class, scoped to the widget by Corvina: rules under the widget root class |
| Effects, timers | `useEffect` with cleanup in the view |

Never `dangerouslySetInnerHTML` with property values.

## Checklist
- [ ] `<Name>ViewProps` lists exactly the values passed by `render()`
- [ ] no `Value`, no widget object in the props
- [ ] the React root is created by the static renderer and unmounted in `onUnmount`
