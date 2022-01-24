<script>
import { useStore } from "vuex";
import { onMounted, watch, toRefs } from "vue";
import Map from "./components/Map.vue"

export default {
  name: "App",
  components: {
    Map
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
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
