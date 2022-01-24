import { map } from 'd3';
import mapboxgl from 'mapbox-gl';



export const renderMap = (mapGlobals) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoicmd1dHRlcnNvaG4iLCJhIjoiY2s4bnBkMGcwMHd0bzNmbjJucWJ2djlqMSJ9.kxpUifvDwI9fG2YQD5THLQ';
    
  const map = new mapboxgl.Map({
    container: 'map-holder', // container ID
    style: 'mapbox://styles/mapbox/light-v10?optimize=true',
    center: [-73.935242, 40.73061], // starting position [lng, lat]
    zoom: 10, // starting zoom
  });
  mapGlobals.map = map;
};

export const renderPlotPoints  = (data, mapGlobals) => {
  
    mapGlobals.map.on('load', () => {
    mapGlobals.map.addSource('trees', {
      type: 'geojson',
      data: data,
    })
    mapGlobals.map.addLayer({
      id: 'trees',
      type: 'circle',
      source: 'trees',
      paint: {
        'circle-radius': 10,
        'circle-color': '#0099cd'
      }
    })  
  })
}


export const addMapClick = ({mapGlobals, setSideBarTrue, toggleSideBar, setActiveTree} = {})=>{
    mapGlobals.map.on('load', ()=>{
      mapGlobals.map.on('click', (event)=>{    
        const features = mapGlobals.map.queryRenderedFeatures(event.point, {
          layers: ['trees'] 
        });
    
        if (!features.length) {
          return;
        }
        if(features[0].properties.tree_id !== mapGlobals.lastTreeID){
            setActiveTree(features[0].properties);
            setSideBarTrue();
            mapGlobals.lastTreeID = features[0].properties.tree_id
        } else{
            toggleSideBar();
        }
    })
  })
}


  




