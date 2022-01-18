import { reactive, readonly } from "vue";
import { plotPointerRender } from "./MapRender.js";

const state = reactive({
    treesURL:'https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$limit=50000',
    treeData:{}

})

const methods = {
    renderTreeData(mapHolder){
        fetch(state.treesURL, {
            method: 'GET'
        })
        .then(response=> response.json())
        .then(data => {
            console.log('data loaded')
            state.treeData = data;
            plotPointerRender(mapHolder, state.treeData)
        })
        .catch(error => console.error(error));  
    },

}





export default { state: readonly(state), methods};
