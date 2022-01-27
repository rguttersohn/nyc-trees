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
    const setSideBarTrue = () => store.commit('setSideBarTrue');
    // component data
    const mapGlobals = ref({
      map: "",
      lastTreeID:0,
      loaded: false,
    });
    // hooks
    onMounted(() => renderMap({mapGlobals: mapGlobals.value}));
    watch(mapGlobals, () => {
      if(mapGlobals.value.loaded){
        store.dispatch("getTreeData");
      } 
    }, {deep: true})
    watch(treeData, () => {
      if(treeData.value.features.length !== 3000) return;
      console.log('rendering starts');
      renderPlotPoints({
        data: treeData.value,
        mapGlobals: mapGlobals.value});
      addMapClick({
        mapGlobals: mapGlobals.value, 
        setSideBarTrue: setSideBarTrue, 
        toggleSideBar: toggleSideBar, 
        setActiveTree: setActiveTree});
    }, {deep: true});
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
