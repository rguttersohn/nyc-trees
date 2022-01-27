import { createStore } from 'vuex';
import vault from '../../vault.js';

const apiToken = vault.apiToken;

const store = createStore({
  state() {
    return {
      treesURL_1: `https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=1000`,
      treesURL_2: `https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=1000&$offset=50001`,
      treesURL_3: `https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=1000&$offset=100002`,
      treeData: { type: 'FeatureCollection', features: [] },
      activeTree: {},
      sideBarActive: false,
    };
  },
  mutations: {
    setTreeData(state, treeData) {
      state.treeData.features.push(treeData);
    },
    toggleSideBar(state) {
      state.sideBarActive = !state.sideBarActive;
    },
    setSideBarTrue(state) {
      state.sideBarActive = true;
    },
    setSideBarFalse(state) {
      state.sideBarActive = false;
    },
    setActiveTree(state, activeTree) {
      state.activeTree = activeTree;
    },
  },
  actions: {
    getTreeData({ state, commit }) {
      const configureData = (treeData) => {
        console.time('setting data using for loop');
        for(let i = 0; i < treeData.features.length; i++){
          treeData.features[i].geometry = { type: 'Point', coordinates: [] };
          treeData.features[i].geometry.coordinates.push(
            parseFloat(treeData.features[i].properties.longitude).toFixed(6),
            parseFloat(treeData.features[i].properties.latitude).toFixed(6)
          );
          commit('setTreeData', treeData.features[i]);
        }
        console.timeEnd('setting data using for loop');
      };
      fetch(state.treesURL_1)
        .then((response) => response.json())
        .then((treeData) => configureData(treeData))
        .then(
          fetch(state.treesURL_2)
            .then((response) => response.json())
            .then((treeData) => configureData(treeData))
            .then(
              fetch(state.treesURL_3)
                .then((response) => response.json())
                .then((treeData) => {
                  configureData(treeData);
                })
            )
        )
        .catch((error) => console.error(error));
    },
  },
});

export default store;
