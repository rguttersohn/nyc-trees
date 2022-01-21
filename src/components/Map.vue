<script>
import { onMounted } from "vue";
import global from '../controller/Global.js';



export default {
  setup() {
    const { renderTreeData } = global.methods
    onMounted(() => {
      renderTreeData();
    });
  },
};
</script>

<template>
    <div class="w-screen h-screen relative" id="map-holder"></div>
</template>


