<script>
import SelectCD from "./component-partials/Filter_SelectCD.vue";
import FilterLegend from "./component-partials/Fitler_FilterLegend.vue";
import SelectFilter from "./component-partials/Fitler_SelectFilter.vue";

export default {
    components: {SelectCD, SelectFilter, FilterLegend}
}
</script>

<template>
    <div class="absolute ml-10 mt-10 p-5 border-2 border-light-900 bg-white">
        <SelectCD/>
        <SelectFilter/>
        <FilterLegend/>
    </div>
</template>