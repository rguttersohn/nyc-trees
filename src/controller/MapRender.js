import mapboxgl from 'mapbox-gl';

const mapBoxRender = (data) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoicmd1dHRlcnNvaG4iLCJhIjoiY2s4bnBkMGcwMHd0bzNmbjJucWJ2djlqMSJ9.kxpUifvDwI9fG2YQD5THLQ';
    
  const map = new mapboxgl.Map({
    container: 'map-holder', // container ID
    style: 'mapbox://styles/mapbox/light-v10?optimize=true',
    center: [-73.935242, 40.73061], // starting position [lng, lat]
    zoom: 10, // starting zoom
  });

  map.on('load', () => {
    map.addSource('trees', {
      type: 'geojson',
      data: data,

    })

    map.addLayer({
      id: 'trees',
      type: 'circle',
      source: 'trees',
      paint: {
        'circle-radius': 3,
        'circle-color': '#0099cd'
      }
    })  
  })

  map.on('click', (event)=>{
    const features = map.queryRenderedFeatures(event.point, {
      layers: ['trees'] // replace with your layer name
    });

    if (!features.length) {
      return;
    }

    state.activeTree = features[0].properties;
    state.sideBarActive = !state.sideBarActive;
    console.log(state.sideBarActive);

  })
  
};

export default mapBoxRender;




