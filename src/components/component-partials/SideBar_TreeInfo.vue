<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

    export default {
        Name:'TreeInfo',
        setup(){
            const store = useStore();
            const activeTree = store.state.activeTree;
            const specie = computed(() => activeTree.spc_common ? activeTree.spc_common[0].toUpperCase() + activeTree.spc_common.slice(1) : 'Not recorded');
            
            return {activeTree, specie}
        }
    }
</script>

<template>
    <h3 class="underline font-bold uppercase">Tree Info</h3>
    <p class="font-bold">Species:</p>
    <p>{{ specie }}</p>
    <p class="font-bold">Address:</p>
    <p>{{ activeTree.address }}</p>
</template>