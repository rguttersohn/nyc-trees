
<script>
import {useStore} from 'vuex'

    export default {
        Name:'TreeHealth',
        setup(){

            const store = useStore();
            const activeTree = store.state.activeTree;

            return{activeTree}
        }
    }
</script>

<template>
    <p>{{activeTree.status}}</p>
</template>