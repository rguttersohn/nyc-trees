<script>
export default {
    methods:{
        selectBorough(event){
            this.$store.commit('setActiveBorough', event.target.value)
        }
    }
}
</script>

<template>
    <div class="absolute ml-10 mt-10 p-5 border-2 border-light-900">
       <h3>Filter by borough:</h3>
       <select @change="selectBorough" name="" id="">
           <option value="Manhattan">Manhattan</option>
           <option value="Bronx">Bronx</option>
           <option value="Brooklyn">Brooklyn</option>
           <option value="Staten Island">Staten Island</option>
           <option value="Queens">Queens</option>
       </select>
    </div>
</template>