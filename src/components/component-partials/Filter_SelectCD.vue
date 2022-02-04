<script>
import { computed, watch, ref} from "vue";
import {useStore} from 'vuex';

    export default {
        Name:'SelectCD',
        setup(){

            const select = ref(null);
            const store = useStore();
            const activeCommunityDistrict = computed(()=>store.state.activeCommunityDistrict);

            watch(activeCommunityDistrict, ()=>{
                select.value.value = activeCommunityDistrict.value;
            })

            const selectCommunityDistrict = (event)=>{
                store.commit('setActiveCommunityDistrict', event.target.value);
                store.commit('resetOffset');
                store.commit('emptyTreeData');
                store.dispatch('getTreeData');
            }

            return { selectCommunityDistrict, select}
        }
    }
</script>

<template>
     <h3>Select a community district:</h3>
       <select class="border-2 border-light-100" ref="select" @change="selectCommunityDistrict" >
           <optgroup label="Manhattan">
               <option value="101">Financial District/Battery Park City/Tribeca</option>
               <option value="102">Greenwich Village/Soho</option>
               <option value="103">Lower Eastside/Chinatown</option>
               <option value="104">Clinton/Chelsea</option>
               <option value="105">Flatiron/Midtown</option>
               <option value="106">Gramercy/Murray Hill</option>
               <option value="107">Upper Westside</option>
               <option value="108">Upper Eastside</option>
               <option value="109">Morningside Heights/Hamilton Heights</option>
               <option value="110">Central Harlem</option>
               <option value="111">East Harlem</option>
               <option value="112">Washington Heights</option>
            </optgroup>
           <optgroup label="Bronx">
               <option value="201">Mott Haven</option>
               <option value="202">Hunts Point</option>
               <option value="203">Morrisania/Claremont Village</option>
               <option value="204">Concourse/High Bridge</option>
               <option value="205">Morris Heights/University Heights</option>
               <option value="206">East Tremont/Belmont</option>
               <option value="207">Bedord Park</option>
               <option value="208">Riverdale/Kingsbridge</option>
               <option value="209">Soundview</option>
               <option value="210">Throgs Neck/Schuylerville</option>
               <option value="211">Morris Park/Pelham Parkway</option>
               <option value="212">Williamsbridge/Wakefield</option>
           </optgroup>
           <optgroup label="Brooklyn">
                <option value="301">Greenpoint/Williamsburg</option>
                <option value="302">Brooklyn Heights/Downtown Brooklyn</option>
                <option value="303">Bedford-Stuyvesant</option>
                <option value="304">Bushwick</option>
                <option value="305">East New York</option>
                <option value="306">Gowanus/Carrol Gardens</option>
                <option value="307">Sunset Park</option>
                <option value="308">Prospect Heights/Crown Heights</option>
                <option value="309">Prospect Leffert Gardens</option>
                <option value="310">Bay Ridge</option>
                <option value="311">Bensonhurst</option>
                <option value="312">Borough Park</option>
                <option value="313">Brigton Beach/Coney Island</option>
                <option value="314">Midwood/Flatbush</option>
                <option value="315">Sheepshead Bay/Gravesend</option>
                <option value="316">Brownsville</option>
                <option value="317">East Flatbush</option>
                <option value="318">Canarsie/Flatlands</option>
            </optgroup>
            <optgroup label="Staten Island">
               <option value="501">North Shore</option>
               <option value="502">Heartland Village</option>
               <option value="503">South Shore</option>
           </optgroup>
           <optgroup label="Queens">
               <option value="401">Astoria</option>
               <option value="402">Sunnyside</option>
               <option value="403">Jackson Heights/East Elmhurst/North Corona</option>
               <option value="404">Elmhurst/South Corona</option>
               <option value="405">Ridgewood/Middle Village</option>
               <option value="406">Rego Park/Forest Hills</option>
               <option value="407">Flushing/Whitestone</option>
               <option value="408">Kew Gardens/Fresh Meadows</option>
               <option value="409">Woodhaven</option>
               <option value="410">Ozone Park</option>
               <option value="411">Oakland Gardens/Bayside</option>
               <option value="412">Jamaica</option>
               <option value="413">Floral Park/Queens Village/Cambria Heights</option>
               <option value="414">Rockaway/Breezy Point</option>
           </optgroup>
       </select>
</template>