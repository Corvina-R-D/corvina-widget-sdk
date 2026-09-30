<template>
  <div :style="widgetStyle">
    <div class="__cssClass__">
      <h2>{{ message }}: {{ value }}</h2>
      <div class="bar"><div class="bar-fill" :style="{ width: percent + '%' }"></div></div>
      <button @click="clicks++">{{ i18n.t( "clicks" ) }}: {{ clicks }}</button>
    </div>
  </div>
</template>

<script>
import { useCorvinaI18n } from "corvina";
const i18n = useCorvinaI18n({
  "en-US": { "clicks": "Clicks" },
  "it-IT": { "clicks": "Click" }
});

export default {
  name: "__Name__",
  props: ["wgt"],
  data: function() {
    return {
      i18n: i18n,
      clicks: 0
    }
  },
  computed: {
    // Position, size, borders and background of the widget box
    widgetStyle() {
      return this.wgt.getStyles();
    },
    message() {
      return this.wgt.getPropertyValue( "message" );
    },
    value() {
      return Number( this.wgt.getPropertyValue( "value" ) ) || 0;
    },
    percent() {
      return Math.min( Math.max( this.value, 0 ), 100 );
    }
  }
};
</script>

<style scoped>
.__cssClass__ { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; height: 100%; }
.__cssClass__ h2 { margin: 0; }
.bar { width: 80%; height: 8px; border-radius: 4px; background: #e0e0e0; overflow: hidden; }
.bar-fill { height: 100%; background: var(--color-primary, #1976d2); transition: width .3s; }
</style>
