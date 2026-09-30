# The widget class: properties, datalinks, serialization

The class extends `BaseGraphicWgt`. For every property it has a field, read in the constructor from
the saved state (`args.initState`) and written back by `serialize()`. The same round trip
(serialize -> constructor) happens on save/load, copy/paste, undo of a removal and the drag preview.

## Value or plain field

| Property | Field | Why |
|---|---|---|
| can receive a datalink (`attachTag: true`) | `Value<T>` | only a `Value` gets the datalink flag: the panel shows the datalink editor, timestamps and history work |
| editor-only setting (`attachTag: false`) | a `Value` or a plain field | both work; a `Value` keeps the class uniform |

`Value` (from `corvina`): `v` value, `q` quality, `ts` timestamp; `unwrap()` returns the value.
`new Value( undefined )` holds `""`, not `undefined`.

Never replace a datalinked `Value` after the constructor (`this.level = new Value( ... )` in a
method): the datalink flag is on the instance created at load. Change it with
`this.setPropertyValue( { prop: "level", value } )`.

## Constructor: reading the state with defaults

```typescript
constructor( args ) {
  super( args );
  this.type = widgetType;
  const state = args.initState;
  this.label = new Value( state.label ?? "Tank" );
  this.level = new Value( state.level ?? 50 );                          // ?? keeps 0
  this.fillColor = new Value( state.fillColor ?? "#1976d2" );
  this.showAlarm = new Value( state.showAlarm !== undefined ? state.showAlarm : true );  // keeps false
}
```

- The gallery defaults are used **only** for a widget dropped from the gallery. A dashboard saved
  before a property existed loads without its key: the constructor must give the default too.
  Use `??` or `!== undefined`: `||` replaces also `0`, `false` and `""`.
- A throwing constructor turns the widget into an error placeholder: tolerate missing or old keys.
- Renaming a property: read the old key as fallback (`state.level ?? state.percent ?? 50`).
- Declare the fields with their type only (`level: Value<number>;`) and assign them in the
  constructor, after `super( args )`: the base constructor copies the state keys onto the widget,
  the constructor of the class replaces them with the typed fields.

## serialize()

```typescript
serialize() {
  let serializedWgt = super.serialize();
  serializedWgt.label = this.label.v;
  serializedWgt.level = this.level.v;
  serializedWgt.fillColor = this.fillColor.v;
  serializedWgt.showAlarm = this.showAlarm.v;
  return serializedWgt;
}
```

- Write the value, never the `Value` object: `.v` or `.unwrap()` (`unwrap()` also resolves nested
  legacy values). Plain fields as they are.
- JSON only: numbers, strings, booleans, arrays, plain objects. Dates as numbers
  (`this.from.unwrap().getTime()`, and `new Date( state.from )` in the constructor); Maps and Sets
  as arrays.
- The datalinks are serialized by the base class: `serialize()` stores only the static value (with
  a running datalink `.v` is the last live value, restored until the datalink refreshes it).
- The base classes serialize their own keys: never use these names for widget properties —
  `type`, `class`, `name`, `id`, `parentId`, `version`, `wgts`, `datalinks`, `events`, `props`,
  `assets`, `position`, `visible`, `disabled`, `x`, `y`, `width`, `height`, `cx`, `cy`, `mtx`,
  `opacity`, `display`, `layout`, `bgColor`, `elevation`, `pinned`, `depth`, the strokes
  (`topStroke`, `topStrokeColor`, ...) and paddings (`paddingTop`, ...).

## Gallery: getDefaultConfiguration()

```typescript
getDefaultConfiguration() {
  return {
    "type": widgetType,        // registry key: equal to registerWidget type and to the manifest entry
    "id": "Tank",              // conventional, the dashboard generates the real id
    "class": "Tank",           // a unique string (not a built-in class name like "GroupWgt")
    "label": "Tank",
    "level": 50,
    "fillColor": "#1976d2",
    "showAlarm": true,
    "width": 160, "height": 220,
    "x": 0, "y": 0,            // required: without x the size becomes 0
    "cx": 80, "cy": 110        // center: width / 2, height / 2
  }
}
```

It is called unbound and at registration time: no `this`, no dashboard state, a new object on every
call. One key per property, with the same default of the constructor.

## Reading the properties

- In the class and in `render()`: `this.level.unwrap()` (a plain field: `this.level`).
- From outside the class and in Vue 2 components: `wgt.getPropertyValue( "level" )` (unwraps `Value`s).
- Datalinks do not convert types: a tag without a value yet gives `null`, a formula can give a
  string. Convert where the value is used: `Number( this.level.unwrap() ) || 0`,
  `!!this.showAlarm.unwrap()`, `String( this.label.unwrap() ?? "" )`.
- A value not arrived yet (`null`, `undefined`, `""`) is better shown as a placeholder (`--`) than as
  `0`: `const raw = this.level.unwrap(); const known = raw !== null && raw !== undefined && raw !== "";`

## Writing a property from the widget

When the view changes a property (a slider, a switch, an input in the widget), use
`setPropertyValue`: it updates the `Value`, writes to the linked tag when the datalink is
read/write, notifies the listeners and renders again the widgets drawing themselves.

```typescript
import { projectStore } from "corvina";

toggle() {
  // In the editor a click selects the widget: never act there, nor when the widget is disabled
  if ( projectStore.getInEditor || this.getPropertyValue( "disabled" ) ) return;
  this.setPropertyValue( { prop: "isOn", value: !this.isOn.unwrap() } );
}
```

- The handler of the property: `attachTag: true` and `attachTagPermission: "readwrite"`, so the
  datalink can be read/write.
- Datalinks do not convert types on write either: write the type of the tag (a boolean for a boolean
  tag, a number for a numeric one); a formula on the datalink can convert.
- This is a runtime change, not an edit of the dashboard: it is not recorded for undo. Editor changes
  go through the property controls (custom-prop-controls.md).

To react to property changes, override `setPropertyValue` and call `super`. The value is a `Value`
when it comes from the properties panel and a raw value from datalinks and undo:

```typescript
setPropertyValue( { prop, value, ts }: { prop: string, value: any, ts?: number } ) {
  if ( prop == "level" && value instanceof Value ) value = value.unwrap();
  super.setPropertyValue( { prop, value, ts } );
}
```

After changing a field directly (not through `setPropertyValue`), widgets drawing themselves must
call `this.requestUpdate()`.

## Translatable properties

With `supportI18n: true` the editor stores a text per language (in the language manager of the
dashboard, by widget id and property name) and sets the property to the text of the current
language on load and on language change. The widget reads it as any other property and serializes
the current value: nothing else to do. Use top-level property names.

The default (gallery and constructor) is a single text, used for every language until the
translations are entered in the editor (translate icon of the property): write it in the language of
most users of the dashboards, usually English, and list the other translations for the user.

Fixed texts of the view (not properties) are translated with `useCorvinaI18n`:

```typescript
const i18n = useCorvinaI18n( { "en-US": { "alarm": "Alarm" }, "it-IT": { "alarm": "Allarme" } } );
i18n.t( "alarm" );
```

Widgets drawing themselves are rendered again on language change; in Vue 2 components put `i18n` in
`data()`. Languages: `en-US`, `it-IT`, `de-DE`, `fr-FR`, `es-ES`, `ja-JP`; a missing text falls back
to `en-US`. Parameters: `{name}` in the text, `i18n.t( "confirm", { name: label } )`.

## Default datalinks

`loadDefaultConfiguration()` of the class runs when the widget is dropped from the gallery: it can
link properties to other widgets of the dashboard, e.g. the time window of `DataWindow`
(`src/examples/WgtWithDataset/WgtWithDataset.ts`):

```typescript
public loadDefaultConfiguration(): void {
  const dataWindow = this.getProject().getWidget( "DataWindow" );
  this.connectWidgetProperties( dataWindow, new Map( [
    [ "from", { name: "startDate", permission: "read/write" } ],
    [ "to", { name: "endDate", permission: "read/write" } ] ] ) );
}
```

## Events

Every widget has the built-in events of the editor (mouse click, property update) configured in the
Events panel: nothing to implement. Custom events are not available to SDK widgets.

## Historical data and datasets

Examples in `src/examples`: `HistoryDataWidget` (history of the tag linked to a property,
`DataLink.fetchHistoricalData`), `MyDataset` + `WgtWithDataset` (a list of datasets as child widgets,
edited with the dataset list control).
