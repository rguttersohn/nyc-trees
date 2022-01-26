import { createStore } from 'vuex';
import vault from '../../vault.js';

const apiToken = vault.apiToken;

const store = createStore({
    state(){
        return {
            treesURL_1: `https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=100`,
            treesURL_2: `https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=100&$offset=100`,
            treesURL_3: `https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=100&$offset=200`,
            treeData:{type: 'FeatureCollection', features: [] },
            activeTree:{},
            sideBarActive: false,
        }
    },
    mutations: {
        setTreeData(state, treeData){
            state.treeData.features.push(treeData)
        },
        toggleSideBar(state){
            state.sideBarActive = !state.sideBarActive;
        },
        setSideBarTrue(state){
            state.sideBarActive = true
        },
        setSideBarFalse(state){
            state.sideBarActive = false
        },
        setActiveTree(state, activeTree){
            state.activeTree = activeTree
        }
        
    },
    actions:{
        getTreeData ({state, commit}){
            console.time('fetching tree data using chained fetch')
            const setTreeData = (treeData) =>{
                treeData.features.forEach(d => {
                    d.geometry = {type: 'Point', 'coordinates' : []};
                    d.geometry.coordinates.push(parseFloat(d.properties.longitude), parseFloat(d.properties.latitude));
                    commit('setTreeData', d);
                });
            }
            fetch(state.treesURL_1)
            .then(response=> response.json())
            .then(treeData => setTreeData(treeData))
            .then(fetch(state.treesURL_2)
                .then(response => response.json())
                .then(treeData => setTreeData(treeData))
                .then(fetch(state.treesURL_3)
                    .then(response => response.json())
                    .then(treeData => {
                        setTreeData(treeData)
                        console.timeEnd('fetching tree data using chained fetch')
                    }) 
            ))
            .catch(error => console.error(error));
            
        }
    }
})

export default store;


