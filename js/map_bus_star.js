const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
const projection = d3.geoMercator()
    .center([-2.75433, 48.114700]) // GPS of location to zoom on
    .scale(11200) // This is like the zoom
    .translate([width / 2, height / 2]);



svg.append("g")
    .selectAll("path")
    .data(mapRennes.records)
    .join("path")
    .attr("fill", "#FFFFFF")
    .attr("d",
        d3.geoPath().projection(projection)
    )
    .style("stroke", "#000");