<script>
import { onMounted } from "vue";
import global from "../controller/Global.js";
import { mapBoxRender, mapGlobals, plotPointRender } from "../controller/MapRender.js";


export default {
  setup() {
    const methods = global.methods;
    onMounted(() => {
      mapBoxRender();
      methods.renderTreeData()
    });
  },
};
</script>

<template>
    <div class="w-screen h-96" id="map-holder"></div>
</template>


