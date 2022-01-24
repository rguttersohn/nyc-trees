<script>
import mapBoxRender from "../controller/MapRender";

export default {
  data() {
    return {};
  },
  computed: {
    treeData() {
      return this.$store.state.treeData;
    },
  },
  watch: {
    treeData() {
      mapBoxRender(this.$store.state.treeData);
    },
  },
};
</script>

<template>
  <div
    :class="{ 'w-full': !$store.sideBarActive, 'w-3/4': $store.sideBarActive }"
    class="h-full"
    id="map-holder"
  ></div>
</template>
