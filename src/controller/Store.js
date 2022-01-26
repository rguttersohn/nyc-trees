import { createStore } from 'vuex';
import vault from '../../vault.js';

const apiToken = vault.apiToken;

const store = createStore({
    state(){
        return {
            treesURL_1: fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=100`),
            treesURL_2: fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=100&$offset=50000`),
            treesURL_3: fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=100&$offset=100000`),
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
            console.time('fetching data using promise.all')
            Promise.all([state.treesURL_1,state.treesURL_2,state.treesURL_3])
            .then(response=> Promise.all(response.map(resp=>resp.json())))
            .then(treeData => {
                for(let i = 0 ; i < treeData.length; i++){
                    treeData[i].features.forEach(d => {
                        d.geometry = {type: 'Point', 'coordinates' : []};
                        d.geometry.coordinates.push(parseFloat(d.properties.longitude), parseFloat(d.properties.latitude));
                        commit('setTreeData', d);
                    });
                }
                console.timeEnd('fetching data using promise.all')
            })
            .catch(error => console.error(error));
            
        }
    }
})

export default store;


