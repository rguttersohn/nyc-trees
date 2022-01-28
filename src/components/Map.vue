<script>
import {
  renderMap,
  initPlotPoints,
  addMapClick,
  addData,
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

    // mutations
    const setActiveTree = (activeTree) => store.commit('setActiveTree', activeTree);
    const toggleSideBar = () => store.commit('toggleSideBar');
    const setSideBarTrue = () => store.commit('setSideBarTrue');
    const increaseOffset = () => store.commit('increaseOffset');
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
        addMapClick({globals: mapGlobals.value, setSideBarTrue: setSideBarTrue, toggleSideBar: toggleSideBar, setActiveTree: setActiveTree});
    })
    watch(treeData, () => {
      addData({data: treeData.value, globals: mapGlobals.value}, increaseOffset);
    }, {deep: true});

    watch(currentOffset, ()=>{
      console.log('triggered getting new data')
      store.dispatch('getTreeData');
    });
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
