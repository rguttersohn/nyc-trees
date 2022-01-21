import { reactive, readonly } from "vue";
import mapBoxRender from './MapRender.js'


const state = reactive({
    treesURL:'https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$limit=5000',
    activeTree:{},
})

const methods = {
    renderTreeData(){
        fetch(state.treesURL, {
            method: 'GET'
        })
        .then(response=> response.json())
        .then(treeData => {
            
            treeData.features.forEach(d => {
                d.geometry = {type: 'Point', 'coordinates' : []}
                d.geometry.coordinates.push(parseFloat(d.properties.longitude), parseFloat(d.properties.latitude))
            });
            console.log(treeData);
            mapBoxRender(treeData)
        })
        .catch(error => console.error(error));  
    },

}





export default { state: readonly(state), methods};
