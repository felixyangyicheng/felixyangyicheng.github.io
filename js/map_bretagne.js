  // The svg
  const svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

  // Map and projection
  const projection = d3.geoMercator()
      .center([-2.75433, 48.114700]) // GPS of location to zoom on
      .scale(11200) // This is like the zoom
      .translate([width / 2, height / 2])

  // Load external data and boot



  // Draw the map
  svg.append("g")
      .selectAll("path")
      .data(mapBretagne.features)
      .join("path")
      .attr("fill", "#FFFFFF")
      .attr("d",
          d3.geoPath().projection(projection)
      )
      .style("stroke", "#000")
      .on("mouseover", function(d) {
          d3.select(this)
              .attr("fill", "orange");
          //console.log(d.target.__data__)
          let prop = d;
          let string
          string = "<p><strong>Code</strong>: " + prop.target.__data__.properties.code + "</p>";
          string += "<p><strong>Nom</strong>: " + prop.target.__data__.properties.nom + "</p>";

          d3.select("#textbox")
              .html("")
              .style("stroke", "#FFF")
              .append("text")
              .html(string)
          d3.select("text").attr("style", "color: #FFF")
      })
      .on("mouseout", function(d) {
          d3.select(this)
              .attr("fill", "#FFFFFF")
      })

  .attr("opacity", 0.9)
      .attr("fill", "#FFFFFF");;

  let tooltip = d3.select("#p_tooltip").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  svg.selectAll("circle")
      .data(dataBretagne.records)
      .enter().append("circle")
      .style("stroke", "gray")
      .style("fill", "black")
      .attr('r', 5)
      .attr('cx', d => {
          return projection(d.geometry.coordinates)[0]
      })
      .attr('cy', d => {
          return projection(d.geometry.coordinates)[1]
      })
      .style('stroke', '#000')
      //   .on("click", function(d) {
      //       d3.select(this)
      //           .attr("color", "red");
      //   })
      .on("mouseover", function(event, d) {
          tooltip.transition()
              .duration(200)
              .style("opacity", .9);
          tooltip.html(`
          </br>${d.fields.etablissement}
          </br>${d.fields.adresse}
          </br>${d.fields.code_postal} ${d.fields.ville}
          </br>${d.fields.code_insee}

          `)
              .style("left", (event.pageX) + "px")
              .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
              .duration(500)
              .style("opacity", 0);
      });;