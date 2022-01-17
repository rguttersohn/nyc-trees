import { reactive, readonly } from "vue";

const state = reactive({
    count: 0,
    // methods

})

const methods = {
    increment(){state.count++},
    subtract(){state.count--}
}





export default { state: readonly(state), methods};
