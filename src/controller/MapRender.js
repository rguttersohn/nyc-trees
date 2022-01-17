import * as d3 from "d3";
import * as topojson from "topojson-client";
import * as mapData from "../assets/New_Zip_Code_Boundary.json";


const mapRender = () => {
        const map = topojson.feature(mapData, {
          type: "GeometryCollection",
          geometries: mapData.objects.New_Zip_Code_Boundary.geometries,
        });
  
        const projection = d3.geoIdentity().fitExtent(
          [
            [0, 90],
            [550, 550],
          ],
          map
        );
  
        const width = 550,
          height = 550;
  
        const geoPath = d3.geoPath().projection(projection);
  
        d3.select("#map-holder svg")
          .attr("viewBox", `0 0 ${width} ${height}`)
          .style("transform", "scale(1,-1)")
          .selectAll("path")
          .data(map.features)
          .enter()
          .append("path")
          .attr("d", geoPath)
          .attr("stroke-width", 0.2)
          .attr('stroke','white')
          .attr('fill', 'coral');
          ;
      }


export default mapRender;