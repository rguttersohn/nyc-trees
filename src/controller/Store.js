import { createStore } from 'vuex';
import vault from '../../vault.js';

const apiToken = vault.apiToken;

const store = createStore({
    state(){
        return {
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
        setTreeData(state, treeData){
            state.treeData.features.push(treeData)
        },
        increaseOffset(state){
            state.currentOffset = state.currentOffset + 50001
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
            fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=5000&$offset=${state.currentOffset}`)
            .then(response=> 
                {console.log(response)
                return response.json()})
            .then(fetchedData => {
                console.time('fetching data using promise.all')
                for(let i = 0 ; i < fetchedData.features.length; i++){
                        fetchedData.features[i].geometry = {type: 'Point', 'coordinates' : []};
                        fetchedData.features[i].geometry.coordinates.push(parseFloat(fetchedData.features[i].properties.longitude).toFixed(6), parseFloat(fetchedData.features[i].properties.latitude).toFixed(6));
                        commit('setTreeData', fetchedData.features[i]);
                }
                console.timeEnd('fetching data using promise.all')
            })
            .catch(error => console.error(error));
            
        }
    }
})

export default store;


