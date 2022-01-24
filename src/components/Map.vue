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
    // state data
    const treeData = computed(() => store.state.treeData);
    // mutations
    const setActiveTree = (activeTree) => store.commit('setActiveTree', activeTree);
    const toggleSideBar = () => store.commit('toggleSideBar');
    // component data
    const mapGlobals = ref({
      map: "",
      lastTreeID:0
    });
    // hooks
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
