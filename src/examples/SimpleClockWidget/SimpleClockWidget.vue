<template>
  <div :style="widgetStyle">
    <div class="center">
      <h1>SDK SimpleClockWidget</h1><br>
      <div class="clock simple" :style="clockFaceStyle" >
        <div class="hours-container">
          <div class="hours" :style="rotHours" ></div>
        </div>
        <div class="minutes-container">
          <div class="minutes" :style="rotMinutes"></div>
        </div>
        <div class="seconds-container">
          <div class="seconds" :style="rotSeconds"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const imgClockface = require( "../../resources/images/clockface.svg" );
export default {
  name:"SimpleClockWidget",
  props: ["wgt"],
  data: function() {
    return {
      clockfacePath: adjustPath( imgClockface )
    }
  },
  computed: {
    widgetStyle() {
      return this.wgt.getStyles();
    },
    clockFaceStyle() {
      return {
        background: `#fff url(${this.clockfacePath}) no-repeat center`,
        backgroundSize: "contain"
      };
    },
    time(){
      return this.wgt.getPropertyValue( "time" );
    },
    rotHours(){
      let hours = new Date( this.time ).getHours();
      let minutes = new Date( this.time ).getMinutes();
      return {
        transform: `rotateZ(${hours * 30 + minutes / 2}deg)`
      }
    },
    rotMinutes(){
      let minutes = new Date( this.time ).getMinutes();
      return {
        transform: `rotateZ(${minutes * 6}deg)`
      }
    },
    rotSeconds(){
      let seconds = new Date( this.time ).getSeconds();
      return {
        transform: `rotateZ(${seconds * 6}deg)`
      }
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

.clock {
  border-radius: 60%;
  background-size: 88%;
  height: 20em;
  padding-bottom: 31%;
  position: relative;
  width: 20em;
}

.clock.simple:after {
  background: #000;
  border-radius: 50%;
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 5%;
  height: 5%;
  z-index: 10;
}

.minutes-container, .hours-container, .seconds-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.hours {
  background: #000;
  height: 20%;
  left: 48.75%;
  position: absolute;
  top: 30%;
  transform-origin: 50% 100%;
  width: 2.5%;
}

.minutes {
  background: #000;
  height: 40%;
  left: 49%;
  position: absolute;
  top: 10%;
  transform-origin: 50% 100%;
  width: 2%;
}

.seconds {
  background: #000;
  height: 45%;
  left: 49.5%;
  position: absolute;
  top: 14%;
  transform-origin: 50% 80%;
  width: 1%;
  z-index: 8;
}
</style>
