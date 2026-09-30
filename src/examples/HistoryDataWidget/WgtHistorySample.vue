<template>
  <div :style="widgetStyle">
    <div class="center">
      <h1>Historical Data</h1>
      <h2>From: {{startDate}}</h2>
      <h2>To: {{endDate}}</h2>
      <h2>Data:</h2>
      <div v-if="empty">
        <v-col>
          <div>No Data</div>
          <v-btn @click="read()">Read Data</v-btn>
        </v-col>
      </div>
      <div v-else>
        <div v-for="data in listData" :key="data.ts">
          Date:  {{data.ts}} Value: {{data.v}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // If you need plotly.js remove comment
  // import Plotly from 'plotly.js/lib/core';
  // import line from 'plotly.js/lib/scatter';
  // import bar from 'plotly.js/lib/bar';
  export default
  {
    name:"WgtHistorySample",
    props: ["wgt"],

    data: function() {
      return {
        listData: [],
        simulateFecthingData: false
      };
    },

    computed: {
      widgetStyle() {
        return this.wgt.getStyles();
      },
      datalinks(){
        return this.wgt.datalinks;
      },
      startDate(){
        return this.wgt.getPropertyValue( "from" ).toLocaleTimeString();
      },
      endDate(){
        return this.wgt.getPropertyValue( "to" ).toLocaleTimeString();
      },
      empty(){
        return this.listData.length == 0;
      }
    },

    watch: {
      datalinks: function (params) {
        this.wgt.fetchData( this.simulateFecthingData );
      }
    },

    methods: {
      draw: function( data ) {
        // Draw only 10 samples
        if ( data.length > 10 ) {
          data = data.slice( 0, 10 );
        } else {
          data = data;
        }
        this.listData = data.map( sample => {
          return { ts: new Date( sample.ts ).toISOString(), v: sample.v }
        } );
      },

      read(){
        this.wgt.fetchData( this.simulateFecthingData );
      }
    },

    mounted: async function() {
      this.wgt.onDataUpdate( ( data ) => {
        this.draw( data );
      } );
      this.wgt.fetchData( this.simulateFecthingData );
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
