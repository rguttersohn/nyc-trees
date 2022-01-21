<script>
import { onMounted } from "vue";
import global from "../controller/Global.js";
import { mapBoxRender } from "../controller/MapRender.js";


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
    <div class="w-screen h-screen relative" id="map-holder"></div>
</template>


