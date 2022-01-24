<script>
import {renderMap, renderPlotPoints} from "../controller/MapRender";
import { useStore } from 'vuex';
import { computed, watch, onMounted, ref} from 'vue';

export default {
  name: "Map",
  setup(){
    const store = useStore();
    const treeData = computed(() =>store.state.treeData);
    const sideBarActive = computed (() => store.state.sideBarActive)
    const mapGlobals = {
      map:'', 
      loaded: false,
    };
    onMounted(() => renderMap(mapGlobals));
    watch(treeData, ()=>{ 
      renderPlotPoints(treeData.value, mapGlobals)
    })
    return {sideBarActive}
  },
};
</script>

<template>
  <div
    :class="{ 'w-full': !sideBarActive, 'w-3/4': sideBarActive }"
    class="h-full"
    id="map-holder"
  ></div>
</template>
