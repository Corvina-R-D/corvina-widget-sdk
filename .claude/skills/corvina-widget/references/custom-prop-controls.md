# Custom property controls

Use one only when no built-in control fits (see properties.md): a custom control is a **Vue 2**
component, whatever the technology of the widget, running in the properties panel with the Vue of
Corvina.

## Contract

- A single file component in **object form** (`export default { name: ..., ... }`): not
  `Vue.extend`, not class components.
- Its `name` is the value of `propControl` in the property handler.
- Registered once in `src/main.ts`:
  ```typescript
  import { registerPropControl } from "corvina";
  import TankLevelsPropControl from "./widgets/Tank/TankLevelsPropControl.vue";
  registerPropControl( TankLevelsPropControl );
  ```
- The built-in controls are available in its template without imports (e.g. `InputPropControl`).

## Props received from the properties panel

| prop | content |
|---|---|
| `wgt` | the widget |
| `propName` | the name of the property (key of the handler) |
| `prop` | the current value (`wgt.getPropertyValue( propName )`, a `Value` already unwrapped) |
| `propertyHandler` | the handler object (`propControlOptions`, `options`, `readOnly`, ...) |
| `display` | `propertyHandler.display` |
| `type` | `propertyHandler.type` |

Declare only the ones used.

## Reading and writing the value

- Read `prop` (or `wgt.getPropertyValue( propName )`) and **watch** it: undo, datalinks and other
  controls can change it while the control is shown.
- Write through the store, never by assigning the widget field:
  ```javascript
  import { projectStore } from "corvina";
  projectStore.setWidgetValue( { wgtId: this.wgt.id, prop: this.propName, value: newValue, record: true } );
  ```
  `record: true` records the change for undo; the project is saved. For a `Value` field the store
  wraps the value. For objects and arrays pass a **new** object/array, never the current one
  mutated in place (undo keeps a reference to the old value).

## Example

```vue
<template>
  <div class="tank-levels">
    <label>{{ display }}</label>
    <div v-for="( level, i ) in levels" :key="i">
      <input type="number" :value="level" @change="setLevel( i, Number( $event.target.value ) )">
    </div>
    <button @click="addLevel">+</button>
  </div>
</template>

<script>
import { projectStore } from "corvina";

export default {
  name: "TankLevelsPropControl",
  props: [ "wgt", "propName", "prop", "display" ],
  computed: {
    levels() { return Array.isArray( this.prop ) ? this.prop : []; }
  },
  methods: {
    write( value ) {
      projectStore.setWidgetValue( { wgtId: this.wgt.id, prop: this.propName, value, record: true } );
    },
    setLevel( index, value ) {
      this.write( this.levels.map( ( level, i ) => ( i == index ? value : level ) ) );
    },
    addLevel() {
      this.write( [ ...this.levels, 0 ] );
    }
  }
};
</script>
```

Handler: `this.levels = { layer: "attributes", type: "array", propControl: "TankLevelsPropControl", attachTag: false, display: "Levels", description: "..." }`.

## Wrapping a built-in control

A control can wrap an exported built-in one and pass it fixed options, e.g. the dataset list of
`src/examples/WgtWithDataset/MyDatasetListPropControl.vue`:

```vue
<DatasetListPropControl v-bind="$props" datasetType="org.MyDataset" datasetTitlePropName="label"/>
```

## Datalinks

When the property gets a datalink the panel replaces the control with the datalink editor: a custom
control edits only the static value.

`src/examples/MyWidget/MyPropControl.vue` is an empty stub (it neither reads nor writes): do not copy it.
