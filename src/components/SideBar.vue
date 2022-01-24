
<script>
export default {
  methods:{
    closeSideBar(){
      this.$store.commit('setSideBarFalse')
    }
  }
};
</script>
<template>
  <div
    v-if="Object.keys($store.state.activeTree).length > 0"
    :class="{
      'w-1/4': $store.state.sideBarActive,
      'w-0': !$store.state.sideBarActive,
    }"
    class="transition-width duration-300 z-10 p-3"
  >
    <button v-show="$store.state.sideBarActive" @click="closeSideBar" class="block mx-auto cursor-pointer border border-light-100 rounded-lg px-3 py-1">close sidebar</button>
    <div v-show="$store.state.sideBarActive" class="mx-auto">
      <h3 class="underline font-bold uppercase">Tree Info</h3>
      <p class="font-bold">Name:</p>
      <p>{{ $store.state.activeTree.spc_common }}</p>
      <p class="font-bold">Address:</p>
      <p>{{ $store.state.activeTree.address }}</p>
      <h3 class="underline font-bold uppercase">Tree Health:</h3>
      <p></p>
    </div>
  </div>
  <div
    v-else
    v-show="$store.state.sideBarActive"
  >
  <p>Click a tree to display data</p>

  </div>
</template>