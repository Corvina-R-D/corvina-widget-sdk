<template>
  <div :style="widgetStyle">
    <p class="center">Use widget org.WgtWithDataset</p>
  </div>
</template>    
<script>
export default {
  name:"MyDataset",
  props: ["wgt"],
  data: function() {
    return {
      myicon: adjustPath( "" )
    }
  },
  computed: {
    widgetStyle() {
      return this.wgt.getStyles();
    }
  }
}
</script>

<style scoped>
.center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>

