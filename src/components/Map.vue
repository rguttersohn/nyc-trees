<script>
import {
  renderMap,
  renderCDMap,
  initPlotPoints,
  addMapClick,
  addData,
  recenterMap,
  addCDEvents,
  refilterCDMap
} from "../controller/MapRender";
import { useStore } from "vuex";
import { computed, watch, onMounted, ref } from "vue";
import cdCoordinates from "../controller/cdCoordinates";

export default {
  name: "Map",
  setup() {
    const store = useStore();
    // state data
    const treeData = computed(() => store.state.treeData);
    const currentOffset = computed(()=> store.state.currentOffset);
    const activeCommunityDistrict = computed(()=> store.state.activeCommunityDistrict);

    // mutations
    const toggleSideBar = () => store.commit('toggleSideBar');
    const setSideBarTrue = () => store.commit('setSideBarTrue');
    const increaseOffset = () => store.commit('increaseOffset');
    const resetOffset = () => store.commit('resetOffset');
    const emptyTreeData = () => store.commit('emptyTreeData');
    const getActiveTreeData = (clickedTreeID) => store.dispatch('getActiveTreeData', clickedTreeID);
    const setActiveCommunityDistrict = (value) => store.commit('setActiveCommunityDistrict', value);
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
        store.dispatch('getTreeData');
        renderCDMap({ globals: mapGlobals.value, activeCommunityDistrict: activeCommunityDistrict.value})
        addCDEvents({globals: mapGlobals.value, activeCommunityDistrict: activeCommunityDistrict.value}, setActiveCommunityDistrict, resetOffset, emptyTreeData, store.dispatch('getTreeData'))
        initPlotPoints({globals: mapGlobals.value});
        addMapClick({globals: mapGlobals.value, setSideBarTrue: setSideBarTrue, toggleSideBar: toggleSideBar}, getActiveTreeData);
    })
    watch(treeData, () => {
      addData({data: treeData.value, globals: mapGlobals.value}, increaseOffset);
    }, {deep: true});

    watch(currentOffset, ()=>{
      store.dispatch('getTreeData');
    });
    watch(activeCommunityDistrict, () => {
      refilterCDMap({globals: mapGlobals.value, activeCommunityDistrict: activeCommunityDistrict.value})
      recenterMap({globals: mapGlobals.value, coordinates: cdCoordinates[`${activeCommunityDistrict.value}`]})
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
