<script>
import {
  renderMap,
  renderPlotPoints,
  addMapClick,
} from "../controller/MapRender";
import { useStore } from "vuex";
import { computed, watch, onMounted, ref } from "vue";

export default {
  name: "Map",
  setup() {
    const store = useStore();
    const treeData = computed(() => store.state.treeData);
    const setActiveTree = (activeTree) => store.commit('setActiveTree', activeTree);
    const toggleSideBar = () => store.commit('toggleSideBar');
    const mapGlobals = ref({
      map: "",
      lastTreeID:0
    });
    onMounted(() => renderMap(mapGlobals.value));
    watch(treeData, () => {
      renderPlotPoints(treeData.value, mapGlobals.value);
      addMapClick(mapGlobals.value, toggleSideBar, setActiveTree);
    });
    
    return{
      mapGlobals
    }

  },
};
</script>

<template>
  <div
    class="h-full w-full"
    id="map-holder"
  ></div>
</template>
