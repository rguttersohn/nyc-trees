<script>
import {useStore} from 'vuex';
import { onMounted, computed, ref, watch } from 'vue';

    export default {
        Name: 'CDData',
        setup(){
            const store = useStore();
            const activeCommunityDistrict = computed(()=>store.state.activeCommunityDistrict)
            const cdData = ref({
                cdData_2015: 0,
                cdData_2005: 0,
                cdData_1995: 0
            })

            const getCDData = async (activeCommunityDistrict, cdData)=>{
                await fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.json?cb_num=${activeCommunityDistrict}&status=Alive&$select=count(cb_num)`)
                .then(response => response.json())
                .then(data => cdData.cdData_2015 = data[0]["count_cb_num"])
                await fetch(`https://data.cityofnewyork.us/resource/29bw-z7pj.json?cb_num=${activeCommunityDistrict}&$select=count(cb_num)`)
                .then(response => response.json())
                .then(data => cdData.cdData_2005 = data[0]["count_cb_num"])
                await fetch(`https://data.cityofnewyork.us/resource/kyad-zm4j.json?cb_new=${activeCommunityDistrict}&$select=count(cb_original)`)
                .then(resp => resp.json())
                .then(data => cdData.cdData_1995 = data[0]["count_cb_original"])
            }

            onMounted(()=>{
                getCDData(activeCommunityDistrict.value, cdData.value);
            })

            watch(activeCommunityDistrict, ()=> {
                 console.log(cdData.value);
                getCDData(activeCommunityDistrict.value, cdData.value)
            })

            return {cdData}
        }

    }
</script>

<template>
    <h3>from cd data</h3>
    <p>2015</p>
    <p>{{cdData.cdData_2015}}</p>
    <p>2005</p>
    <p>{{cdData.cdData_2005}}</p>
    <p>1995</p>
    <p>{{cdData.cdData_1995}}</p>
</template>