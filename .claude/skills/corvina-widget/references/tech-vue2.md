# Binding in a Vue 2 widget (`vue`, classic SDK widget)

Two files: the class `<Name>.ts` (no `render()`) and the Vue 2 single file component `<Name>.vue`,
registered with the `component` field of `registerWidget`. The dashboard renders the component with
the Corvina Vue 2 (2.6) and passes the widget as the prop `wgt`: the widget is reactive, the
component reads its properties with `wgt.getPropertyValue( "<name>" )`, which unwraps the `Value`s.
Created by `corvina-sdk create widget vue`.

```vue
<template>
  <div :style="widgetStyle">
    <div class="tank">
      <span class="label">{{ label }}</span>
      <div class="level" :style="{ height: level + '%', background: fillColor }"></div>
      <span v-if="showAlarm" class="alarm">!</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tank",
  props: ["wgt"],
  computed: {
    // Position, size, borders and background of the widget box: always on the outer element
    widgetStyle() { return this.wgt.getStyles(); },
    label() { return this.wgt.getPropertyValue( "label" ); },
    level() { return Number( this.wgt.getPropertyValue( "level" ) ) || 0; },
    fillColor() { return this.wgt.getPropertyValue( "fillColor" ); },
    showAlarm() { return !!this.wgt.getPropertyValue( "showAlarm" ); }
  }
};
</script>

<style scoped>
.tank { ... }
</style>
```

For every property: a computed reading `wgt.getPropertyValue`, its use in the template.

## Where each thing goes

| What | Where |
|---|---|
| Markup (from the HTML mockup) | `<template>`, inside the outer `<div :style="widgetStyle">` |
| Property values | computed properties from `wgt.getPropertyValue( name )`; `{{ }}` escapes them |
| View state | `data()` of the component |
| Events that change a widget property | see "Writing a property" in class-and-serialization.md |
| CSS | `<style scoped>` |

Never `v-html` with property values. Templates are compiled for Vue 2.6: no `<script setup>`, no
Vue 3 syntax.

## Checklist
- [ ] the outer element has `:style="widgetStyle"` (`wgt.getStyles()`)
- [ ] every property read through `wgt.getPropertyValue`
- [ ] the widget registered with `component` in `src/main.ts`
