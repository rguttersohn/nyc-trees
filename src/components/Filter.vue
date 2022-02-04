<script>
import SelectCD from "./component-partials/Filter_SelectCD.vue";
import FilterLegend from "./component-partials/Fitler_FilterLegend.vue";

export default {
    components: {SelectCD, FilterLegend}
}
</script>

<template>
    <div class="absolute ml-10 mt-10 p-5 border-2 border-light-900 bg-white">
        <SelectCD/>
        <FilterLegend/>
    </div>
</template>