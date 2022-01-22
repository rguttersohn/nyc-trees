<script>
export default {
    name:'TestStore',
}
</script>
<template>
    <div>
        <p>hi from test test store</p>
        <h3>{{$store.state.sideBarActive}}</h3>
    </div>
</template>