<script>
import {
  renderMap,
  initPlotPoints,
  addMapClick,
  addData,
  recenterMap
} from "../controller/MapRender";
import { useStore } from "vuex";
import { computed, watch, onMounted, ref } from "vue";


export default {
  name: "Map",
  setup() {
    const store = useStore();
    // state data
    const treeData = computed(() => store.state.treeData);
    const currentOffset = computed(()=> store.state.currentOffset);
    const activeBorough = computed(()=> store.state.activeBorough);

    // mutations
    const toggleSideBar = () => store.commit('toggleSideBar');
    const setSideBarTrue = () => store.commit('setSideBarTrue');
    const increaseOffset = () => store.commit('increaseOffset');
    const getActiveTreeData = (clickedTreeID) => store.dispatch('getActiveTreeData', clickedTreeID);
    const mapLoaded = computed(() => mapGlobals.value.loaded);

    // component data
    const mapGlobals = ref({
      map: "",
      lastTreeID:0,
      loaded: false,
    });
    // hooks
    onMounted(() => renderMap({globals: mapGlobals.value}));
    watch(mapLoaded, ()=>{
        store.dispatch("getTreeData");
        initPlotPoints({globals: mapGlobals.value});
        addMapClick({globals: mapGlobals.value, setSideBarTrue: setSideBarTrue, toggleSideBar: toggleSideBar}, getActiveTreeData);
    })
    watch(treeData, () => {
      addData({data: treeData.value, globals: mapGlobals.value}, increaseOffset);
    }, {deep: true});

    watch(currentOffset, ()=>{
      store.dispatch('getTreeData');
    });
    watch(activeBorough, () => {
      console.log('triggered recenter')
      console.log(store.state.boroughCoordinates[`${activeBorough.value}`])
      recenterMap({globals: mapGlobals.value, coordinates: store.state.boroughCoordinates[`${activeBorough.value}`]})
    })
    return {mapGlobals}
  },
};
</script>

<template>
  <div
    class="h-full w-full"
    id="map-holder"
  ></div>
</template>
