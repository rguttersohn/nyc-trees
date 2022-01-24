import { createStore } from 'vuex';

const store = createStore({
    state(){
        return {
            treesURL:'https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$limit=50000',
            treeData:{},
            activeTree:{},
            sideBarActive: false,
        }
    },
    mutations: {
        setTreeData(state, data){
            state.treeData = data
        },
        toggleSideBar(state){
            state.sideBarActive = !state.sideBarActive;
        }
    },
    actions:{
        getTreeData ({state, commit}){
            fetch(state.treesURL, {
                method: 'GET'
            })
            .then(response=> response.json())
            .then(treeData => {
                treeData.features.forEach(d => {
                    d.geometry = {type: 'Point', 'coordinates' : []}
                    d.geometry.coordinates.push(parseFloat(d.properties.longitude), parseFloat(d.properties.latitude))
                });
                commit('setTreeData', treeData);                
            })
            .catch(error => console.error(error));
        }
    }
})

export default store;


