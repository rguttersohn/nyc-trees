import mapboxgl from 'mapbox-gl';
import * as d3 from 'd3';
import { geoMercator } from 'd3';

export const mapGlobals = {};

export const mapBoxRender = () => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoicmd1dHRlcnNvaG4iLCJhIjoiY2s4bnBkMGcwMHd0bzNmbjJucWJ2djlqMSJ9.kxpUifvDwI9fG2YQD5THLQ';
    
  const map = new mapboxgl.Map({
    container: 'map-holder', // container ID
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-73.935242, 40.73061], // starting position [lng, lat]
    zoom: 10, // starting zoom
  });
  Object.assign(mapGlobals, {map: map})
};

export function plotPointRender(data) {
  let canvas = mapGlobals.map.getContainer();
  let svg = d3.select(canvas).append("svg");
  let transform = d3.geoTransform({
    point(lon, lat){
      var point = map.project(new mapboxgl.LngLat(lon, lat));
			this.stream.point(point.x, point.y);
    }
  })

  let width = 1068;
  let height = 384;

  let projection = geoMercator()
  
  svg
    .attr('width', 1068)
    .attr('height', 384)
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('transform', ({longitude, latitude})=>{
      let p = projection([longitude, latitude]);
      return `translate(${p[0]},${p[1]})`
    })
    .attr('r', 10)
  //   .attr('d', path)
  //   .on('mousemove', function (d) {
  //     var mouse = d3.mouse(svg.node()).map(function (d) {
  //       return parseInt(d);
  //     });
  //     tooltip
  //       .classed('hidden', false)
  //       .attr(
  //         'style',
  //         'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px'
  //       )
  //       .html(d.properties.routes_r_1);
  //   })
  //   .on('mouseout', function () {
  //     tooltip.classed('hidden', true);
  //   });
  // update(500);

  // map.on('viewreset', update);
  // map.on('move', update);
  // map.on('moveend', update);
}
