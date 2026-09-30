<template>
  <div :style="widgetStyle">
    <div class="center">
      <h1>{{$i18n.t('title')}}</h1>
      <h2>From: {{startDate}}</h2>
      <h2>To: {{endDate}}</h2>
      <h2>Data:</h2>
      <div v-if="empty">
        <v-col>
          <div>No Data</div>
        </v-col>
      </div>
      <div class="content" v-else >
        <div v-for="data in listData" :key="data.ts">
          {{data.label}}: [{{data.ts}}, {{data.v}}]
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import { Locales } from "corvina";
  export default
  {
    name:"WgtWithDataset",
    props: ["wgt"],

    data: function() {
      return {
        listData: []
      };
    },

    computed: {
      widgetStyle() {
        return this.wgt.getStyles();
      },
      startDate(){
        return this.wgt.getPropertyValue( "from" ).toLocaleTimeString();
      },
      endDate(){
        return this.wgt.getPropertyValue( "to" ).toLocaleTimeString();
      },
      empty(){
        return this.listData.length == 0;
      },
      data(){
        return this.wgt.getPropertyValue("data");
      }
    },

    methods: {
      draw: function( allDatasetsData ) {
        let newData = [];

        // Draw only 10 samples per dataset
        for ( let datasetData of allDatasetsData ) {
          
          let data = datasetData.data;
          if ( data.length > 10 ) {
            data = data.slice( 0, 10 );
          }
          newData.push(
            ...data.map(sample=>{
              return {
                label: datasetData.label, 
                ts: this.$i18n.d(new Date(sample.ts), 'dateHour', this.$i18n.locale),
                v: sample.v }
            })
          )
        } 
        this.listData = newData;
      }
    },

    mounted: function() {
      this.draw(this.wgt.getPropertyValue("data"));
      this.wgt.onDataUpdate(( data ) => {
        this.draw( data );
      });
    },
    i18n: {
      messages: {
        en: {
          title: "Historical Data using dataset"
        },
        de: {
          title: "Historische Daten mit Datensatz"
        }
      }
    },
    // i18n: {
    //   messages: {
    //     [Locales.en]: {
    //       title: "Historical Data using dataset"
    //     },
    //     [Locales.de]: {
    //       title: "Historische Daten mit Datensatz"
    //     }
    //   }
    //   sharedMessages: commonMessages
    // }
  }
</script>

<style scoped>
.center{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.content{
  height: 200px;
  overflow: auto;
  margin: 10px;
}
</style>
