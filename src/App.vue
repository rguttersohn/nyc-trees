<script>
import { useStore } from "vuex";
import { onMounted } from "vue";
import Map from "./components/Map.vue"
import SideBar from './components/SideBar.vue'

export default {
  name: "App",
  components: {
    Map,
    SideBar
  },
  setup() {
    const store = useStore();
    const treeData = store.state.treeData;

    onMounted(() => {
      store.dispatch("getTreeData");
    });

    return{
      treeData
    }
  },
};
</script>

<template>
  <main class="w-screen h-screen flex">
    <Map/>
    <SideBar />
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
