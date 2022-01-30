import mapboxgl from 'mapbox-gl';
import vault from '../../vault.js';

export const renderMap = ({ globals } = {}) => {
  mapboxgl.accessToken = vault.mapBoxToken;

  const map = new mapboxgl.Map({
    container: 'map-holder', // container ID
    style: 'mapbox://styles/mapbox/light-v10?optimize=true',
    center: [-73.984016, 40.754932], // starting position [lng, lat]
    zoom: 13, // starting zoom
    maxZoom: 16,
    minZoom: 11
  });
  globals.map = map;
  globals.map.on('load', () => (globals.loaded = true));
};

export const initPlotPoints = ({ globals } = {}) => {
    
    globals.map.addSource('trees', {
      type: 'geojson',
      data: {},
      cluster: true,
      clusterRadius: 60,
      tolerance: 1,
      buffer: 0,
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
        'circle-color': [
          'match',
          ['get', 'status'],
          'Alive',
          'green',
          'Dead',
          'coral',
          'Stump',
          'red',
          'green'
        ],
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
    
export const addData = ({data, globals} = {}, increaseOffset)=>{
  globals.map.getSource('trees').setData(data)
  increaseOffset()
}


export const addMapClick = ({
  globals,
  setSideBarTrue,
  toggleSideBar,
  setActiveTree,
} = {}) => {
 
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
        setActiveTree(features[0].properties);
        setSideBarTrue();
        globals.lastTreeID = features[0].properties.tree_id;
      } else {
        toggleSideBar();
      }
    });
};

export const recenterMap = ({globals, coordinates} = {}) =>{
  globals.map.flyTo({
    center: coordinates,
    zoom: 13
  })
}
