import { createStore } from 'vuex';
import vault from '../../vault.js';

const apiToken = vault.apiToken;

const store = createStore({
    state(){
        return {
            activeBorough: 'Manhattan',
            treeData: {
                type: 'FeatureCollection',
                features: [],
            },
            currentOffset: 0,
            activeTree:{},
            sideBarActive: false,         
        }
    },
    mutations: {
        setActiveBorough(state, value ){
            state.activeBorough = value
        },
        setTreeData(state, treeData){
            state.treeData.features.push(treeData)
        },
        increaseOffset(state){
            state.currentOffset = state.currentOffset + 10001
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
            fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=10000&$offset=${state.currentOffset}&$select=tree_id,longitude,latitude,status&boroname=${state.activeBorough}`)
            .then(response=> response.json())
            .then(fetchedData => {
                for(let i = 0 ; i < fetchedData.features.length; i++){
                        fetchedData.features[i].geometry = {type: 'Point', 'coordinates' : []};
                        fetchedData.features[i].geometry.coordinates.push(parseFloat(fetchedData.features[i].properties.longitude).toFixed(6), parseFloat(fetchedData.features[i].properties.latitude).toFixed(6));
                        commit('setTreeData', fetchedData.features[i]);
                }
            })
            .catch(error => console.error(error));
            
        }
    }
})

export default store;


