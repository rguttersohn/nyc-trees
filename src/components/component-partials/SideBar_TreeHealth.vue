
<script>
import {useStore} from 'vuex';
import { computed } from 'vue';

    export default {
        Name:'TreeHealth',
        setup(){

            const store = useStore();
            const activeTree = store.state.activeTree;
            const problems = computed(()=> activeTree.problems ? activeTree.problems.split(',') : ['Not Recorded'])
            
            return { activeTree, problems }
        }
    }
</script>

<template>
    <h3 class="font-bold">Vitals:</h3>
    <p>Status: <span>{{activeTree.status}}</span></p>
    <p v-show="activeTree.status === 'Alive'">Health: <span>{{activeTree.health}}</span></p>
    <p v-show="activeTree.status === 'Alive' || activeTree.status === 'Dead' ">Trunk Diameter: <span>{{activeTree.tree_dbh}}</span> inches</p>
    <p v-show="activeTree.status === 'Stump'">Stump Diameter: <span>{{activeTree.stump_diam}}</span> inches</p>
    <p>Problems:</p>
    <ul class="ml-5 list-disc">
        <li v-for="(problem, index) in problems" :key="index">{{problem}}</li>
    </ul>

</template>