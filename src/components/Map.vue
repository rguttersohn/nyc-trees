<script>
import { onMounted } from "vue";
import { mapRender } from "../controller/MapRender.js";
import global from "../controller/Global.js";
import { select } from "d3";

export default {
  setup() {
    const methods = global.methods;
    onMounted(() => {
      const mapHolder = select("#map-holder svg");
      mapRender(mapHolder);
      methods.renderTreeData(mapHolder);
    });
  },
};
</script>

<template>
  <div id="map-holder">
    <h2>This is the map</h2>
    <svg></svg>
  </div>
</template>
