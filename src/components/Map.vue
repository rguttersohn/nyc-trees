<script>
import { onMounted } from 'vue';


export default {
  setup() {
    onMounted(() => {
      renderTreeData();
    });
  },
};
</script>

<template>
  <div :class="{'w-full' : !$store.sideBarActive, 'w-3/4' : $store.sideBarActive}"  class="h-full" id="map-holder"></div>
</template>
