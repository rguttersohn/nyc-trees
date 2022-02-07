<script>
import {useStore} from 'vuex';

export default {
    setup(){
        const store = useStore();
        const setActiveFilter = (value)=>store.commit('setActiveFilter', value)
        const radioClick = (event)=> {
            console.log("value",event.target.value);
            setActiveFilter(event.target.value);
            };

        return {radioClick}
    }
    
}
</script>

<template>
    <div class="bg-light flex justify-evenly items-center">
        <input @click="radioClick" name="tree-filter" type="radio" value="status" id="">
        <label for="status">Tree Status</label>
        <input @click="radioClick" name="tree-filter" type="radio" value="health">
        <label for="tree-health">Tree Health</label>
    </div>
</template>