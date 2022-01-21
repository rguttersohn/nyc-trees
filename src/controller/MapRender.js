import mapboxgl from 'mapbox-gl';
import * as d3 from 'd3';

const mapGlobals = {};

export const mapBoxRender = () => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoicmd1dHRlcnNvaG4iLCJhIjoiY2s4bnBkMGcwMHd0bzNmbjJucWJ2djlqMSJ9.kxpUifvDwI9fG2YQD5THLQ';
    
  const map = new mapboxgl.Map({
    container: 'map-holder', // container ID
    style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
    center: [-73.935242, 40.73061], // starting position [lng, lat]
    zoom: 10, // starting zoom
  });
  Object.assign(mapGlobals, {map: map})
};

export function plotPointRender(data) {
  let canvas = mapGlobals.map.getCanvasContainer();
  
  const projection = (d) => mapGlobals.map.project(new mapboxgl.LngLat(d.longitude, d.latitude));
  
  const position = ()=>{
    d3.selectAll('.circles circle')
    .attr("cx", (d) => projection(d).x)
    .attr("cy", (d) => projection(d).y)
  } 
  let plotPoints = d3.select(canvas)
    .append('svg')
    .style('height', '100%')
    .style('width', '100%')
    .style('position', 'absolute')
    .style('z-index', 2)
    .append('g')
    .attr('class', 'circles')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('fill', 'green')
    .style('cursor', 'pointer')
    .on('click', (event, d) => {
        console.log(d)
    })
    position()

      mapGlobals.map.on("viewreset", position);
      mapGlobals.map.on("move", position);
      mapGlobals.map.on("moveend", position);
      position(plotPoints); 
  
}
