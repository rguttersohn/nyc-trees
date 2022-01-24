import { map } from 'd3';
import mapboxgl from 'mapbox-gl';

export const renderMap = (mapGlobals) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoicmd1dHRlcnNvaG4iLCJhIjoiY2s4bnBkMGcwMHd0bzNmbjJucWJ2djlqMSJ9.kxpUifvDwI9fG2YQD5THLQ';

  const map = new mapboxgl.Map({
    container: 'map-holder', // container ID
    style: 'mapbox://styles/mapbox/light-v10?optimize=true',
    center: [-73.935242, 40.73061], // starting position [lng, lat]
    zoom: 13, // starting zoom
  });
  mapGlobals.map = map;
};

export const renderPlotPoints = (data, mapGlobals) => {
  console.log('rendering starts');
  console.log('loaded');
  mapGlobals.map.addSource('trees', {
    type: 'geojson',
    data: data,
    cluster: true,
    clusterMaxZoom: 15,
    clusterRadius: 50,
  });
  mapGlobals.map.addLayer({
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
        1000,
        '#649678',
        5000,
        '#2e7851',
      ],
    },
  });
  mapGlobals.map.addLayer({
    id: 'unclustered-trees',
    type: 'circle',
    source: 'trees',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#00693E',
      'circle-radius': 4,
    },
  });

  mapGlobals.map.addLayer({
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
};

export const addMapClick = ({
  mapGlobals,
  setSideBarTrue,
  toggleSideBar,
  setActiveTree,
} = {}) => {
  mapGlobals.map.on('click', 'clustered-trees', (event) => {
    const features = mapGlobals.map.queryRenderedFeatures(event.point, {
      layers: ['clustered-trees'],
    });
    const clusterId = features[0].properties.cluster_id;
    mapGlobals.map
      .getSource('trees')
      .getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;

        mapGlobals.map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom,
        });
      });
  });

  mapGlobals.map.on('click', (event) => {
    const features = mapGlobals.map.queryRenderedFeatures(event.point, {
      layers: ['unclustered-trees'],
    });

    if (!features.length) {
      return;
    }
    if (features[0].properties.tree_id !== mapGlobals.lastTreeID) {
      setActiveTree(features[0].properties);
      setSideBarTrue();
      mapGlobals.lastTreeID = features[0].properties.tree_id;
    } else {
      toggleSideBar();
    }
  });
};
