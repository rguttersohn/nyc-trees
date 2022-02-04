
<script>
import { useStore } from 'vuex';
import {computed } from 'vue';

export default {
  setup(){

    const store = useStore();
    const activeTree = store.state.activeTree;
    
    return { store, activeTree }
  }
};
</script>
<template>
  <div
    v-if="Object.keys(activeTree).length > 0"
    :class="{
      'w-1/4': store.state.sideBarActive,
      'w-0': !store.state.sideBarActive,
    }"
    class="transition-width duration-300 z-10 p-3"
  >
    <button v-show="store.state.sideBarActive" @click="closeSideBar" class="block mx-auto cursor-pointer border border-light-100 rounded-lg px-3 py-1">close sidebar</button>
    <div v-show="store.state.sideBarActive" class="mx-auto">
      <h3 class="underline font-bold uppercase">Tree Info</h3>
      <p class="font-bold">Species:</p>
      <p>{{ activeTree.spc_common }}</p>
      <p class="font-bold">Address:</p>
      <p>{{ activeTree.address }}</p>
      <p>Trunk Diameter: <span>{{ activeTree.tree_dbh}}</span> inches</p>
      <p>Stump Diameter: <span>{{ activeTree.stump_diam}}</span> inches</p>
      <h3 class="underline font-bold uppercase">Tree Health:</h3>
      <p>Status: <span>{{ activeTree.status }}</span></p>
      <p>Problems: <span>{{ activeTree.problems }}</span></p>
      <p>Sidewalk Damage: <span>{{ activeTree.sidewalk}}</span></p>
      <p>Guards: <span>{{ activeTree.guards }}</span></p>
      <p>Curb Location: <span>{{ activeTree.curb_loc}}</span></p>
      <p>Root Problem: <span>{{ activeTree.root_stone}}</span></p>
    </div>
  </div>
  <div
    v-else
    v-show="sideBarActive"
  >
  <p>Click a tree to display data</p>

  </div>
</template>