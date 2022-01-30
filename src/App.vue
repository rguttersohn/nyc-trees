<script>

import Map from "./components/Map.vue";
import SideBar from './components/SideBar.vue';
import Filter from './components/Filter.vue';

export default {
  name: "App",
  components: {
    Map,
    SideBar,
    Filter
  },
};
</script>

<template>
  <main class="w-screen h-screen flex relative">
    <Map/>
    <SideBar />
    <Filter />
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
