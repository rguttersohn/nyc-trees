import { createStore } from 'vuex';
import vault from '../../vault.js';

const apiToken = vault.apiToken;

const store = createStore({
    state(){
        return {
            activeCommunityDistrict: '101',
            treeData: {
                type: 'FeatureCollection',
                features: [],
            },
            currentOffset: 0,
            activeTree:{activeTreeID: 0},
            sideBarActive: false, 
            filters :[
                {
                    filterName:'status',
                    colors:['green', 'coral', 'red'],
                    keys:['Alive', 'Dead', 'Stump'],
                    filterArray(){ return [ 
                        'match',
                        ['get', this.filterName],
                        this.keys[0],
                        this.colors[0],
                        this.keys[1],
                        this.colors[1],
                        this.keys[2],
                        this.colors[2],
                        'gray'
                    ] 
                    }
                },
                {
                    filterName: 'health',
                    colors: ['purple','blue','orange','gray'],
                    keys: ['Good', 'Fair', 'Poor','Dead'],
                    filterArray(){ return [ 
                        'match',
                        ['get', this.filterName],
                        this.keys[0],
                        this.colors[0],
                        this.keys[1],
                        this.colors[1],
                        this.keys[2],
                        this.colors[2],
                        this.colors[3]
                    ] 
                }
            }
            ],
            activeFilter:[], 
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
        },
        setActiveFilter(state, value){
            state.filters.forEach(filter => {
                if(filter.filterName === value){
                    state.activeFilter = filter;
                }
            })
        },        
    },
    actions:{
        getTreeData ({state, commit}){
            fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=20000&$offset=${state.currentOffset}&$select=tree_id,longitude,latitude,status,health&cb_num=${state.activeCommunityDistrict}`)
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


