<script>
import {useStore} from 'vuex';

export default {
    Name:'TreeSurrounding',
    setup(){
        const store = useStore();
        const activeTree = store.state.activeTree;

        return {activeTree}
    }
}
</script>

<template>
    <div>
        <h3 class="font-bold">Surrounding Area:</h3>
        <p>Sidewalk Damage: <span>{{ activeTree.sidewalk }}</span></p>
        <p>Guards: <span>{{ activeTree.guards }}</span></p>
        <p>Curb Location: <span>{{ activeTree.curb_loc }}</span></p>
        <p>Root Problem: <span>{{ activeTree.root_stone }}</span></p>
    </div>
</template>
