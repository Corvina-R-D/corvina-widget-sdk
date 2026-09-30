<template>
  <div :style="widgetStyle">
    <div class="center">
      <h1>{{myWidgetLabel}}</h1>
      <h2>{{ wgt.getPropertyValue( "message") }}:{{ wgt.getPropertyValue( "linkableProp" ) }}</h2>
      <div class="info-organization">
        <img class="icon" :src="myicon"/>
      </div>
    </div>
  </div>
</template>

<script>
const iconPath = require( "../../resources/images/corvina-widget1.png" );
import { useCorvinaI18n } from "corvina";
const i18n = useCorvinaI18n({
  "en-US": {"message": "My Widget"},
  "it-IT": {"message": "Il mio Widget"},
  "ja-JP": {"message": "-メッセージ"}
});
export default {
  name:"MyWidget",
  props: ["wgt"],
  data: function() {
    return {
      myicon: adjustPath( iconPath ),
      i18n: i18n
    }
  },
  computed: {
    widgetStyle() {
      return this.wgt.getStyles();
    },
    myWidgetLabel() {
      console.log( this.i18n.t("message") );
      return this.i18n.t("message");
    }
  }
};
</script>

<style scoped>
.center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.info-organization{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.icon{
  width: 50px;
  height: 50px;
}
</style>
