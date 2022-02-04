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
        <p class="font-bold uppercase underline">Surrounding Area:</p>
        <p>Sidewalk Damage: <span>{{ activeTree.sidewalk }}</span></p>
        <p>Guards: <span>{{ activeTree.guards }}</span></p>
        <p>Curb Location: <span>{{ activeTree.curb_loc }}</span></p>
        <p>Root Problem: <span>{{ activeTree.root_stone }}</span></p>
    </div>
</template>
