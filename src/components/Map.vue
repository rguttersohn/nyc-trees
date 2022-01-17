<script>
import { onMounted } from "vue";
import mapRender from '../controller/MapRender.js'


export default {
  setup() {
    onMounted(() => mapRender());
  },
};
</script>

<template>
  <div id="map-holder">
    <h2>This is the map</h2>
    <svg></svg>
  </div>
</template>