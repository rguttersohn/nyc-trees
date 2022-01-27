<script>
import Map from "./components/Map.vue"
import SideBar from './components/SideBar.vue'

export default {
  name: "App",
  components: {
    Map,
    SideBar
  }
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
