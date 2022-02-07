<script>
import {
  renderMap,
  renderCDMap,
  initPlotPoints,
  addPlotPointEvents,
  addData,
  recenterMap,
  addCDEvents,
  refilterCDMap,
  resetPaint
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
    const mapLoaded = computed(() => mapGlobals.value.loaded);
    const activeFilter = computed(()=>store.state.activeFilter);

    const setActiveFilter = (value)=>store.commit('setActiveFilter', value);

    // component data
    const mapGlobals = ref({
      map: "",
      lastTreeID:0,
      loaded: false,
    });
    // hooks
    onMounted(() => renderMap(mapGlobals.value));
    watch(mapLoaded, ()=>{
        store.dispatch('getTreeData');
        renderCDMap(mapGlobals.value, store)
        addCDEvents(mapGlobals.value, store)
        setActiveFilter('status');
        initPlotPoints(mapGlobals.value, store);
        addPlotPointEvents(mapGlobals.value, store);
    })
    watch(treeData, () => {
      addData(treeData.value, mapGlobals.value, store);
    }, {deep: true});

    watch(currentOffset, ()=>{
      store.dispatch('getTreeData');
    });
    watch(activeCommunityDistrict, () => {
      refilterCDMap(mapGlobals.value, store)
      recenterMap( mapGlobals.value, cdCoordinates[`${activeCommunityDistrict.value}`])
    })

    watch(activeFilter, ()=>{
      resetPaint(mapGlobals.value, store)
    })

  },
};
</script>

<template>
  <div
    class="h-full w-full"
    id="map-holder"
  ></div>
</template>
