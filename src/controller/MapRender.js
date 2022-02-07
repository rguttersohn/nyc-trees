import mapboxgl from 'mapbox-gl';
import vault from '../../vault.js';
import { computed } from 'vue';

export const renderMap = ( globals ) => {
  mapboxgl.accessToken = vault.mapBoxToken;

  const map = new mapboxgl.Map({
    container: 'map-holder', // container ID
    style: 'mapbox://styles/mapbox/light-v10?optimize=true',
    center: [-73.9394, 40.8417], // starting position [lng, lat]
    zoom: 14, // starting zoom
    maxZoom: 16,
    minZoom: 11
  });

  map.dragRotate.disable();
 
  map.touchZoomRotate.disableRotation();
  globals.map = map;

  globals.map.on('load', () => (globals.loaded = true));
};

export const renderCDMap = (globals, store)=>{

    const activeCommunityDistrict = store.state.activeCommunityDistrict;

    globals.map.addSource('community districts', {
      type:'geojson',
      data: 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Community_Districts/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson'
    })

    globals.map.addLayer({
      id: 'community districts fill',
      type: 'fill',
      source: 'community districts',
      layout: {},
      paint: {
        'fill-color' : '#0099cd',
        'fill-opacity' : 0.3,
      },
      'filter': ['!=', 'BoroCD', parseInt(activeCommunityDistrict)]
    })

    globals.map.addLayer({
      id: 'community districts outline',
      type: 'line',
      source: 'community districts',
      layout: {},
      paint: {
        'line-width' : 1,
        'line-color' : '#0099cd'
      }
    })

}

export const addCDEvents = (globals, store)=>{
  
  const activeCommunityDistrict = computed(()=>store.state.activeCommunityDistrict);
  const setActiveCommunityDistrict = (value) => store.commit('setActiveCommunityDistrict', value);
  const resetOffset = ()=>store.commit('resetOffset');
  const emptyTreeData = ()=>store.commit('emptyTreeData');
  const getTreeData = ()=>store.dispatch(getTreeData);

  globals.map.on('click','community districts fill', event => {  

    if(activeCommunityDistrict !== event.features[0].properties.BoroCD){
      setActiveCommunityDistrict(event.features[0].properties.BoroCD);
      resetOffset();
      emptyTreeData();
      getTreeData;
    }
  });

  globals.map.on('mouseenter', 'community districts fill', event => {
    if(activeCommunityDistrict !== event.features[0].properties.boroCD){
      globals.map.getCanvas().style.cursor = 'pointer';
    }
  });
     
  globals.map.on('mouseleave', 'community districts fill', () => {
    globals.map.getCanvas().style.cursor = '';
  });
}


export const refilterCDMap = (globals, store) =>{
  const activeCommunityDistrict = store.state.activeCommunityDistrict;
      globals.map.setFilter(
        'community districts fill',
        ['!=', 'BoroCD', parseInt(activeCommunityDistrict)]
      )
} 

export const initPlotPoints = ( globals, store) => {
    const activeFilter = computed(()=> store.state.activeFilter)
    globals.map.addSource('trees', {
      type: 'geojson',
      data: {},
      cluster: true,
      clusterRadius: 60,
      buffer: 128,
      clusterMaxZoom: 13
    });
    
    globals.map.addLayer({
      id: 'clustered-trees',
      type: 'circle',
      source: 'trees',
      filter: ['has', 'point_count'],
      paint: {
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          8,
          10,
          20,
          100,
          30,
          750,
          40,
        ],
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#c8d3cc',
          100,
          '#96b4a1',
          500,
          '#649678',
          1000,
          '#2e7851',
        ],
      },
    });


    globals.map.addLayer({
      id: 'unclustered-trees',
      type: 'circle',
      source: 'trees',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': activeFilter.value.filterArray(),
        'circle-radius': 4,
      },
    });

  

    globals.map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'trees',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
      },
    });

}

export const resetPaint = (globals, store) =>{
  const activeFilter = computed(()=>store.state.activeFilter);
  globals.map.setPaintProperty('unclustered-trees','circle-color', activeFilter.value.filterArray())
}
    
export const addData = (data, globals, store)=>{
  globals.map.getSource('trees').setData(data);
  store.commit('increaseOffset');
}


export const addPlotPointEvents = (globals, store) => {
    const setSideBarTrue = ()=>store.commit('setSideBarTrue');
    const toggleSideBar = ()=> store.commit('toggleSideBar');
    const getActiveTreeData = (clickedTreeID)=>store.dispatch('getActiveTreeData', clickedTreeID);

    globals.map.on('click', 'clustered-trees', (event) => {
      
      const features = globals.map.queryRenderedFeatures(event.point, {
        layers: ['clustered-trees'],
      });

      const clusterId = features[0].properties.cluster_id;

      globals.map
        .getSource('trees')
        .getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;

          globals.map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
          });
        });
    });

    globals.map.on('click', (event) => {
      const features = globals.map.queryRenderedFeatures(event.point, {
        layers: ['unclustered-trees'],
      });
      
      if (!features.length) {
        return;
      }

      if (features[0].properties.tree_id !== globals.lastTreeID) {
        getActiveTreeData(features[0].properties.tree_id)
        setSideBarTrue();
        globals.lastTreeID = features[0].properties.tree_id;
      } else {
        toggleSideBar();
      }
    });

};

export const recenterMap = (globals, coordinates) =>{
  globals.map.flyTo({
    center: coordinates,
    zoom: 13
  })
}
