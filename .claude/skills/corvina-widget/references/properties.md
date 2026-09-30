# Property handlers: the properties in the editor

The properties handler (`<Name>PropsHandler.ts`) declares, for each widget property, how the
properties panel shows and edits it. One instance per widget type (created by the gallery).

## The class

```typescript
import { IPropertyHandler, BaseGraphicPropsHandler } from "corvina";

export default class TankPropsHandler extends BaseGraphicPropsHandler {
  level: IPropertyHandler;
  label: IPropertyHandler;

  createCustomPropsHandler() {
    super.createCustomPropsHandler();
    this.level = { layer: "attributes", type: "numeric", propControl: "InputPropControl",
      attachTag: true, readOnly: false, display: "Level", description: "Tank level, 0-100",
      propControlOptions: { min: 0, max: 100 } };
    this.label = { layer: "attributes", type: "string", propControl: "InputPropControl",
      attachTag: false, supportI18n: true, readOnly: false, display: "Label", description: "Title" };
  }
}
```

- `BaseGraphicPropsHandler` adds the standard properties of the widget box: position and size
  (layer "Transform", shown in absolute layouts), `Visible` (`opacity`) and `disabled`, background and
  borders (layer "Style"), permissions. `BasePropsHandler` adds only `name`: the widget can still be
  moved and resized on the canvas, but those properties are not in the panel. Prefer
  `BaseGraphicPropsHandler` (the built-in widgets use it).
- Handlers are assigned in `createCustomPropsHandler()`, which runs after the inherited ones: a key
  with the same name replaces the inherited handler. It runs again on every language change: keep
  it idempotent (it is the place for `display` texts translated with `useCorvinaI18n`).
- Fields are declared with the type only (`level: IPropertyHandler;`). With a TypeScript `target`
  ES2022 or later (or `useDefineForClassFields`) such declarations reset the values after the base
  constructor: keep the target of the project (es2018) or write `declare level: IPropertyHandler;`.
- The key is the name of the widget property: the same name of the class field, of `serialize()`
  and of the gallery default (see SKILL.md).

## Fields

| Field | Effect |
|---|---|
| `type` | required: value type, passed to the control, it chooses the input of `InputPropControl` (see Types) |
| `layer` | section of the panel; **without `layer` the property is not shown**. See Layers |
| `propControl` | name of the control (see Controls) |
| `display` | label in the panel and in the project tree |
| `description` | documented as tooltip; set it, even if the panel may not show it |
| `attachTag` | `true`: the property accepts datalinks (tags, formulas, other widgets): tag/formula buttons, drop of tags, node in the project tree. **The class field must be a `Value`** |
| `attachTagPermission` | `"readwrite"` / `"write"`: the datalink editor lets choose read or read/write (for properties the widget writes, e.g. an input or a switch) |
| `supportI18n` | `true`: text translated per language (string and textarea inputs) |
| `readOnly` | `true`: not editable (InputPropControl) |
| `options` | for `type: "select"`: `[ { value, display } ]`; the `value` is stored as it is |
| `dynamicOptions` | `true`: options read from `wgt.getPropertyValue( "<prop>_options" )` (override `getPropertyValue` in the class) |
| `propControlOptions` | options of the control (see Controls) |
| `format` | only `"#"` (rounds numbers); any other value breaks the display |
| `hideConditions` | `{ otherProp: value }` or `{ otherProp: [values] }`: hidden when **any** entry matches |
| `showConditions` | `{ otherProp: value }`: shown only when all entries match. **Evaluated only if `hideConditions` is defined too**: write `hideConditions: {}` next to it |
| `exposed` | `true`: node in the project tree even without `attachTag` (`false`: never) |

Conditions compare the value of another property of the widget: that property should be a plain
field (a `Value` is compared as object and never matches).

## Types

| type | Input of `InputPropControl` | Class value |
|---|---|---|
| `string` | text field (`maxlength`) | string |
| `string-textarea` | multi-line text | string |
| `numeric` | number field (`min`, `max`); stored as `Number` | number |
| `boolean` | switch | boolean |
| `select` | select over `options` / `dynamicOptions` | the `value` of the option |
| `select-icon` | icon picker | icon name |
| `model` | text field; a dropped tag links its whole data model | object of the model |
| `color` | nothing: use `ColorPropControl` with `type: "string"` | `rgba(...)` string |
| `date` | nothing: use `TimePropControl` / `DatePropControl` | `Date` |
| `datetime` | nothing: use `CombinedDateTimePropControl` | `Date` |
| `array`, `object`, `range` | nothing useful: use the dedicated controls | array / object |

## Layers

- `"attributes"`: the main section, on top, not collapsible. Use it for the main properties.
- Any other string: a collapsible section, in order of first appearance. Known names are translated,
  e.g. `"Style"`, `"Display"`, `"Alarms"`, `"Legend"`, `"Datasets"`, `"Data Preview"`, `"Size"`,
  `"Alignment"`, `"Filters"`; other names are shown as written. Case matters (`"Style"` ≠ `"style"`).
- `"Transform"`: shown only in absolute layouts (position and size of the base handler).
- `"model"`: a separate section on top that ignores conditions: avoid it.
- The Events section (mouse click, property update) is always added by the panel.

## Controls usable by SDK widgets

| propControl | Edits | type | Handler fields / `propControlOptions` |
|---|---|---|---|
| `InputPropControl` | text, textarea, number, switch, select, icon, model | `string`, `string-textarea`, `numeric`, `boolean`, `select`, `select-icon`, `model` | `readOnly`, `supportI18n`, `attachTag`, `options`, `dynamicOptions`, `format`; options `{ maxlength, min, max, visible: false (hides it), emptyStringsAsUndefined, appendIcon, appendIconTooltip }` |
| `SimpleInputPropControl` | as InputPropControl, without the formula button | as above | as above |
| `ColorPropControl` | color, writes `rgba(r,g,b,a)` | `string` | `attachTag` |
| `CombinedDateTimePropControl` | date and time (`Date`) | `datetime` | `attachTag` |
| `TimePropControl` | time of a `Date` | `date` | — |
| `DatePropControl` | date (`Date`) | `date` | — |
| `IconPropControl` | icon name | `string` | — |
| `FilePropControl` | image (PNG/JPEG) as data URL / asset; field initialized (not `undefined`) | `string` | `attachTag` (URL tab) |
| `SelectListPropControl` | list of `{ value, display }`; initialize to an array | `model` | `supportI18n`, `readOnly` |
| `CheckBoxListPropControl` | list of `{ text, value, selected }`; initialize to an array | `array` | — |
| `RangePropControl` | `{ min, max }`; initialize the object | `range` | — |
| `TimeShiftPropControl` | `{ value, unit }` | `object` | `options` (units) |
| `ColorPalettePropControl` | id of a color scheme of the dashboard | `string` | — |
| `GroupsListPropControl` | list of user group names | `object` | — |
| `CardPropControl` | array of objects edited as cards (add, remove, sort) | `object` | `propControlOptions: { propertyHandler: { field: handler, ... } \| ( wgt, path, index, value ) => handlers, titleField, showAddButton, showRemoveButton, showDragHandler, maxItems }` |
| `FlatCardPropControl` | object, every key with one handler | `object` | `propControlOptions: { propertyHandler: handler \| ( wgt, path, key, value ) => handler }` |
| `DatasetListPropControl` | child dataset widgets (see `src/examples/WgtWithDataset`) | `object` | key `wgts`; `propControlOptions: { datasetType, datasetTitlePropName }` or a wrapper component; the widget answers `getPropertyValue( "datasets" )` |
| `MonacoFormulaPropControl` | a formula attached to the property | any | formula options |

Not to declare: `DatalinkPropControl` (the panel shows it by itself when the property has a
datalink). Not usable: `LabelPropControl` (empty), `DatetimePropControl` (legacy),
`AutoCompletePropControl`, and the controls of specific built-in widgets (alarms, clocks, dashboards,
device slots, VPN apps, color palettes, trend datasets, ...).

There is no slider, font or step control: numbers use `InputPropControl` with `min`/`max`, fonts
are string/select/numeric properties (family, size, weight).

When nothing fits, write a custom control: [custom-prop-controls.md](custom-prop-controls.md).

## Choosing the control

| Property | Handler |
|---|---|
| live value (number) | `type: "numeric"`, `InputPropControl`, `attachTag: true` |
| live state (on/off) | `type: "boolean"`, `InputPropControl`, `attachTag: true` |
| title, label, unit meant for people | `type: "string"`, `InputPropControl`, `supportI18n: true` |
| long text | `type: "string-textarea"`, `InputPropControl` |
| limit, threshold | `type: "numeric"`, `InputPropControl`, `propControlOptions: { min, max }` (`attachTag` if it can come from the field) |
| color | `type: "string"`, `ColorPropControl` |
| one among fixed variants | `type: "select"`, `InputPropControl`, `options: [ { value, display } ]` |
| icon | `type: "select-icon"`, `InputPropControl` |
| image chosen by the user | `type: "string"`, `FilePropControl` (images of the widget itself: resources, see from-html.md) |
| date / time | `type: "datetime"`, `CombinedDateTimePropControl` (`Date` in the class, a number in `serialize()`) |
| list of items with fields | `type: "object"`, `CardPropControl` with an inner handler set |
| property meaningful only for some values of another | `hideConditions` / `showConditions: { other: value }` + `hideConditions: {}` |
| written by the widget (input, switch) | `attachTag: true`, `attachTagPermission: "readwrite"` |

## Hiding an inherited property

Replace it in `createCustomPropsHandler()` or hide it with conditions that never match
(`this.bgColor.showConditions = { type: "never" }; this.bgColor.hideConditions = {};`). Never
assign `undefined` to a handler key: the panel reads every key.
