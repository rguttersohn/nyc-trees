
<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import TreeInfo from './component-partials/SideBar_TreeInfo.vue';
import TreeSurroundingArea from './component-partials/SideBar_TreeSurroundingArea.vue';
import TreeHealth from './component-partials/SideBar_TreeHealth.vue';
export default {
  components:{TreeInfo, TreeHealth, TreeSurroundingArea},
  setup(){
    const store = useStore();
    const activeTree = computed(()=>store.state.activeTree);
    const sideBarActive = computed(()=>store.state.sideBarActive);
    const closeSideBar = ()=> store.commit('setSideBarFalse')
  
    return { sideBarActive, activeTree, closeSideBar}
  }
};
</script>
<template>
  <div
    v-if="Object.keys(activeTree).length > 1"
    :class="{'w-1/4': sideBarActive, 'w-0': !sideBarActive}"
    class="transition-width duration-300 z-10 p-3"
  >
    <button v-show="sideBarActive" @click="closeSideBar" class="block mx-auto cursor-pointer border border-light-100 rounded-lg px-3 py-1">close sidebar</button>
    <div v-show="sideBarActive" class="mx-auto">
      <TreeInfo />
      <TreeHealth />
      <TreeSurroundingArea />
    </div>
  </div>
  <div
    v-else
    v-show="sideBarActive"
  >
    <p>Click a tree to display data</p>
  </div>
</template>