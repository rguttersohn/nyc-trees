import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import * as mapData from '../assets/nyc_tracts2020_clipped.json';

const mapGlobals = {
  getMap() {
    let map = topojson.feature(mapData, {
      type: 'GeometryCollection',
      geometries: mapData.objects.nyc_tracts2020_clipped.geometries,
    });
    return map;
  },
  getProjection() {
    let projection = d3.geoMercator().fitExtent(
      [
        [0, 0],
        [550, 550],
      ],
      this.getMap()
    );
    return projection;
  },
};
export const mapRender = (mapHolder) => {
  const width = 550,
    height = 550;

  const geoPath = d3.geoPath().projection(mapGlobals.getProjection());


  mapHolder
    .attr('viewBox', `0 0 ${width} ${height}`)
    .append('g')
    .attr('class', 'map')
    .selectAll('path')
    .data(mapGlobals.getMap().features)
    .enter()
    .append('path')
    .attr('d', geoPath)
    .attr('stroke-width', 0.2)
    .attr('stroke', 'white')
    .attr('fill', 'coral');
};

export const plotPointerRender = (mapHolder, data) => {
  const projection = mapGlobals.getProjection();
  mapHolder.append('g')
  .attr('class', 'plot-points')
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('transform', ({longitude, latitude}) => {
    const p = projection([longitude, latitude]);
    return `translate(${p[0]}, ${p[1]})`
  })
  .attr('r', '1px')
  .style('fill', 'red')
  .attr('stroke', 'white')
  .attr('stroke-width', 0.1)
  .on('click', (event,d) => console.log(d.address))
};
