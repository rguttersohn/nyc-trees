<script>
import {useStore} from 'vuex';
import {computed} from 'vue';

    export default {
        Name: 'FilterLegend',
        setup(){
            const store = useStore();
            const activeFilter = computed(()=>store.state.activeFilter);
            
            return {activeFilter}
        }
    }
</script>

<template>
    <div class="w-10/12 mx-auto my-5 flex flex-row justify-evenly items-center gap-x-3">
        <div 
            v-for="(filterKey, index) in activeFilter.keys" 
            :key="index" 
            class="flex gap-x-1 justify-evenly items-center">
            <span>{{filterKey}}</span>
            <span
            :style="{backgroundColor: activeFilter.colors[index]}"
            class="inline-block mx-1 w-[15px] h-[15px] rounded-full"></span>
        </div>
    </div>
</template>