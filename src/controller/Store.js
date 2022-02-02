import { createStore } from 'vuex';
import vault from '../../vault.js';

const apiToken = vault.apiToken;

const store = createStore({
    state(){
        return {
            activeCommunityDistrict: '101',
            cdCoordinates: {
                '101': [-74.0083, 40.7077],
                '102': [-74.0027, 40.7336],
                '103': [-73.9843, 40.7150],
                '104': [-73.9918, 40.7638],
                '105': [-73.9840, 40.7549],
                '106': [-73.9716, 40.7488],
                '107': [-73.9754, 40.7870],
                '108': [-73.9566, 40.7736],
                '109': [-73.9621, 40.8105],
                '110': [-73.9482, 40.8089],
                '111': [-73.9389, 40.7957],
                '112': [-73.9394, 40.8417],
                '201': [-73.9229, 40.8091],
                '202': [-73.8803, 40.8094],
                '203': [-73.9059, 40.8348],
                '204': [-73.9228, 40.8317],
                '205': [-73.9155, 40.8505],
                '206': [-73.8910, 40.8454],
                '207': [-73.8857, 40.8701],
                '208': [-73.9088, 40.8996],
                '209': [-73.8696, 40.8248],
                '210': [-73.8213, 40.8184],
                '211': [-73.8640, 40.8553],
                '212': [-73.8507, 40.8965],
                '301': [-73.9316, 40.7142],
                '302': [-73.9571, 40.7081],
                '303': [-73.9418, 40.6872],
                '304': [-73.9171, 40.6958],
                '305': [-73.8759, 40.6591],
                '306': [-73.9880, 40.6751],
                '307': [-74.0093, 40.6527],
                '308': [-73.9422, 40.6694],
                '309': [-74.0093, 40.6527],
                '310': [-74.0299, 40.6264],
                '311': [-73.9922, 40.6139],
                '312': [-73.9921, 40.6350],
                '313': [-73.9597, 40.5781],
                '314': [-73.9600, 40.6204],
                '315': [-73.9458, 40.5954],
                '316': [-73.9125, 40.6652],
                '317': [-73.9300, 40.6482],
                '318': [-73.9061, 40.6402],
                '401': [-73.9235, 40.7644],
                '402': [-73.9196, 40.7433],
                '403': [-73.8831, 40.7557],
                '404': [-73.8801, 40.7380],
                '405': [-73.8743, 40.7174],
                '406': [-73.8448, 40.7181],
                '407': [-73.8331, 40.7675],
                '408': [-73.8272, 40.7057],
                '409': [-73.8566, 40.6901],
                '410': [-73.8507, 40.6794],
                '411': [-73.7654, 40.7586],
                '412': [-73.7890, 40.7027],
                '413': [-73.7331, 40.6922],
                '414': [-73.7978, 40.5927],
                '501': [-74.0873, 40.6326],
                '502': [-74.1585, 40.5909],
                '503': [-74.1946, 40.5373],

            },
            treeData: {
                type: 'FeatureCollection',
                features: [],
            },
            currentOffset: 0,
            activeTree:{activeTreeID: 0},
            sideBarActive: false,         
        }
    },
    mutations: {
        setActiveCommunityDistrict(state, value ){
            state.activeCommunityDistrict = value
        },
        setTreeData(state, treeData){
            state.treeData.features.push(treeData)
        },
        emptyTreeData(state){
            state.treeData = {
                type: 'FeatureCollection',
                features: [],
            }
        },
        increaseOffset(state){
            state.currentOffset = state.currentOffset + 20000
        },
        resetOffset(state){
            state.currentOffset = 0;
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
        setClickedTreeID(state, clickedTreeID){
            state.activeTree.activeTreeID = clickedTreeID
        },
        setActiveTree(state, fetchedTreeData){
            Object.assign(state.activeTree, fetchedTreeData)
        }
        
    },
    actions:{
        getTreeData ({state, commit}){
            fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=20000&$offset=${state.currentOffset}&$select=tree_id,longitude,latitude,status&cb_num=${state.activeCommunityDistrict}`)
            .then(response=> response.json())
            .then(fetchedData => {
                for(let i = 0 ; i < fetchedData.features.length; i++){
                        fetchedData.features[i].geometry = {type: 'Point', 'coordinates' : []};
                        fetchedData.features[i].geometry.coordinates.push(parseFloat(fetchedData.features[i].properties.longitude).toFixed(6), parseFloat(fetchedData.features[i].properties.latitude).toFixed(6));
                        commit('setTreeData', fetchedData.features[i]);
                }
            })
            .catch(error => console.error(error));
            
        },
        async getActiveTreeData ({state, commit}, clickedTreeID){
            commit('setClickedTreeID', clickedTreeID)
            let {activeTreeID} = state.activeTree;
            await fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$$app_token=${apiToken}&tree_id=${activeTreeID}`)
            .then(response => response.json())
            .then(fetchedTreeData => {
                commit('setActiveTree', fetchedTreeData[0])
            })
        }
    }
})

export default store;


