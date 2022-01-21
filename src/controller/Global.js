import { reactive, readonly } from "vue";
import { plotPointRender } from "./MapRender";

const state = reactive({
    treesURL:'https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$limit=100',
    treeData:{},
    activeTree:{},
})

const methods = {
    renderTreeData(){
        fetch(state.treesURL, {
            method: 'GET'
        })
        .then(response=> response.json())
        .then(data => {
            console.log('data loaded')
            state.treeData = data 
            plotPointRender(state.treeData)
        })
        .catch(error => console.error(error));  
    },

}





export default { state: readonly(state), methods};
