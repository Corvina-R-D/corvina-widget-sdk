<template>
  <DatasetListPropControl
    v-bind="$props" 
    datasetType="org.MyDataset"
    datasetTitlePropName="label"
  />
</template>
 
<script>
import {DatasetListPropControl} from 'corvina';
export default {
  name: 'MyDatasetListPropControl',
  components: { 
    DatasetListPropControl, 
  },
  props: [
    "prop",
    "propName",
    "wgt",
    "type",
    "display",
    "propertyHandler"
  ]
};
</script>