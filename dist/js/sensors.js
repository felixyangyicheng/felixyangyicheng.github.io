




//#endregion        
//#region append the svg object to the body of the page

//#endregion       

function renderSensorGraph(data){
  const sensors = d3.select("#sensors-chart")
  .append("svg")
  .attr("id", "sensor_svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);
  //timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S+01:00");

timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S+02:00");
//console.log(timeParse("2021-08-24T21:17:01+02:00"))
//#region set french format)


moment.originFormat ="DD-MM-YYYY HH:mm:ss";
moment.converFormat="YYYY-MM-DD HH:mm:ss";
  timeFormat=d3.timeFormat("%c");  
  data.forEach((el,i)=>{        
   
  
    el.DateTime=moment(el.Date_Heure, moment.originFormat).format(moment.converFormat)
    el.DateTime=moment(el.DateTime).format();

    //console.log(el.DateTime)    
         
  })   

//#endregion 

const allGroup = [
  "Abs_Val_S2_microm",    
  "Abs_Val_PL", 
  "Abs_Val_S1_microm", 
  "Abs_Val_S3_microm",
  "Abs_Val_S4_microm",
  "Abs_Val_S5_microm"];       
// add the options to the button
// <select id="selectButtonSensor" class="btn btn-secondary btn-sm"></select>
d3.select("#sensor-card-tools")
.append("select")
.attr("class", 'btn btn-secondary btn-sm')
.attr("id", "selectButtonSensor")

d3.select("#selectButtonSensor")
.selectAll('myOptions')
.data(allGroup)
.enter()
.append('option')
.text(d => d) // text showed in the menu
.attr("value", d => d) // corresponding value returned by the button
//#endregion
  let option = document.getElementById("selectButtonSensor");
  var optionValue = option.value;
  //console.log(optionValue);
  //#endregion
  //#region grid        
  const grid = (g, x, y) => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g
    .selectAll(".x")
    .data(x.ticks(10))
    .join(
      enter => enter.append("line").attr("class", "x").attr("y2", height),
      update => update,
      exit => exit.remove()
    )
      .attr("x1", d => 0.5 + x(d))
      .attr("x2", d => 0.5 + x(d)))
    .call(g => g
    .selectAll(".y")
    .data(y.ticks(10 * k))
    .join(
      enter => enter.append("line").attr("class", "y").attr("x2", width),
      update => update,
      exit => exit.remove()
    )
      .attr("y1", d => 0.5 + y(d))
      .attr("y2", d => 0.5 + y(d)))

    ;
  //#endregion



  //#region set default optionValueData

  
  const optionValueData=data.map((d)=>{
    let v=d[optionValue];
    if(typeof v=="string"){
      v = v.replace(/,/g, '.');
    }
    if(d[mapToleranceValue(optionValue).h]==''){
      d[mapToleranceValue(optionValue).h]=0;
      d[mapToleranceValue(optionValue).l]=0;
    }
    else if(isNaN(d[mapToleranceValue(optionValue).h])==true){
      d[mapToleranceValue(optionValue).h]=d[mapToleranceValue(optionValue).h].replace(/,/g, '.');
      d[mapToleranceValue(optionValue).l]=d[mapToleranceValue(optionValue).l].replace(/,/g, '.');
    }
    // else{
    //   d[mapToleranceValue(optionValue).h]=d[mapToleranceValue(optionValue).h].replace(/,/g, '.');
    //   d[mapToleranceValue(optionValue).l]=d[mapToleranceValue(optionValue).l].replace(/,/g, '.');
    // }
    //console.log(d[mapToleranceValue(optionValue).h], d[mapToleranceValue(optionValue).l])
    return {time: timeParse(d.DateTime), 
            value: v , 
            n_cycle:d.Nr_Cycles ,    
            toleranceH:d[mapToleranceValue(optionValue).h]*1000,
            toleranceL:d[mapToleranceValue(optionValue).l]*1000} 
  });

// optionValueData.forEach(function(el,i){
//   console.log(el)
// })

 


  //#endregion


  //#region definition x, y Axis ticks text, 
  const yAxis = (g, y) => g
    .call(d3.axisRight(y).ticks(12 * k))
    .call(g => g.select(".domain").attr("display", "none"));
  const xAxis = (g, x) => g
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisTop(x).ticks(6))
    .call(g => g.select(".domain").attr("display", "none"));

  //#endregion
  //#region definition x, y, z
  const z = d3.scaleOrdinal()
    .domain(allGroup.map(d => d))
    .range(d3.schemeCategory10)

  // Add X axis --> it is a date format
  const x = d3.scaleTime()
    //.domain(d3.extent(data, d => d.DateTime))
    .domain(d3.extent(data, d => {
      
      return timeParse(d.DateTime)}))
    .range([ 0, width ]);

  // Add Y axis
  let AxisTop;
  let AxisBottom;

function setToleranceValue(opt){
  
  AxisTop=d3.max(opt, d=>d.toleranceH);
  AxisBottom=d3.min(opt, d=>d.toleranceL);

}



  const y = d3.scaleLinear()
    .domain([-70, 70])
    .range([ height, 0 ]);

  //#endregion
  //#region definition zoom
  const zoom = d3.zoom()
    .scaleExtent([0.1, 52])
    .on("zoom", zoomed);
  //#endregion
  //#region append Grid, x, y, tooltip graph to SVG
  const gGrid = sensors.append("g");
  const gx = sensors.append("g");
  const gy = sensors.append("g");


  //#endregion
  //#region Tooltip area div
  const tooltip = d3.select("#sensors-chart")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

  //#endregion
  setToleranceValue(optionValueData);

  //#region tolerance        
  const gToleranceTop= sensors
      .append('g')
      .append("path")
      .datum(optionValueData)
      .attr("d", d3.line()
      .x(d => x(+d.time))
      .y(d=> y(-20) )
      )
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5)
      ;

  const gToleranceBottom= sensors
      .append('g')
      .append("path")
      .datum(optionValueData)
      .attr("d", d3.line()
      .x(d =>{
       //console.log( d.time)
        return x(+d.time)
      })
      .y(d=> y(20) )
      )
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5)
      ;
      //#endregion

  //#region append line Initialize line 
  const line = sensors
        .append('g')
        .append("path")
        .datum(optionValueData)
        .attr("d", d3.line()
        .x(d => x(+d.time))
        .y(d => y(+d.value))
        )
        .attr("stroke", "red")
        .style("stroke-width", 0.5)
        .style("fill", "none")
  //#endregion        



  //#region Initialize dots 
  const dot = sensors
      .selectAll('circle')
      .data(optionValueData)
      .join('circle')
      .attr("cx", d => {
        //console.log(d.time)
        return x(+d.time)})
      .attr("cy", d => y(+d.value))     
      .attr("r", 1.5)
      .style("fill", "#69b3a2")
      .on("mouseover", pointerover)
      .on("mousemove", pointermove)
  .on("mouseout", pointerout);
  //#endregion



  //#region definition of function pointer
  function pointerover(event,d,i) {
  tooltip.style("opacity", 1)
    .html(`
    <ul>
      <li>
        <span class="tooltipspan"> Heure </span>: ${timeFormat(d.time)}
      </li>
      <li>
        <span class="tooltipspan"> N° Cycles </span>: ${d.n_cycle}
      </li>
      <li>      
        <span class="tooltipspan"> Valeur </span>: ${d.value} μm  
      </li>
    </ul>
    `
    )
    .style("left", (event.x)/2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
    .style("top", (event.y)/2 + "px")
  }
  function pointermove(event,d){
  tooltip.style("opacity", 1)
  .html(`
    <ul>
      <li>
        <span class="tooltipspan"> Heure </span>: ${timeFormat(d.time)}
      </li>
      <li>
        <span class="tooltipspan"> N° Cycles </span>: ${d.n_cycle}
      </li>
      <li>      
        <span class="tooltipspan"> Valeur </span>: ${d.value} μm  
      </li>
    </ul>
    `
    )
    //.html(`<span class="tooltipspan"> Heure </span>: ${timeFormat(d.time)},  <span class="tooltipspan"> N° Cycles </span>: ${d.n_cycle}, <span class="tooltipspan"> Valeur </span>: ${d.value} μm`)
    .style("left", (event.x)/2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
    .style("top", (event.y)/2 + "px")    
  }
  function pointerout(event,d) {
  tooltip
    .transition()
    .duration(20000)
    .style("opacity", 0)
  }
  //#endregion

  //#region SVG initial zoom element

  sensors.call(zoom).call(zoom.transform, d3.zoomIdentity);
  //#endregion
  //#region definition zoomed function, call line,dot,gx,gy,gGrid when zoomed
  function zoomed({transform}) {
    const zx = transform.rescaleX(x).interpolate(d3.interpolateRound);
    const zy = transform.rescaleY(y).interpolate(d3.interpolateRound);
    line.attr("transform", transform).attr("stroke-width", 1.5 / transform.k);
    dot.attr("transform", transform).attr("r", 3.5 / transform.k);
    gToleranceTop.attr("transform", transform).attr("stroke-width", 1.5 / transform.k);
    gToleranceBottom.attr("transform", transform).attr("stroke-width", 1.5 / transform.k);
    gx.call(xAxis, zx);
    gy.call(yAxis, zy);
    gGrid.call(grid, zx, zy);
  // gToleranceBottom.attr("transform", transform.rescaleY(y).interpolate(d3.interpolateRound)).attr("stroke-width", 1.5 / transform.k);
  }
  //#endregion        
  //#region definition update the chart when change groupe
  function update(selectedGroup) {        
  // Create new data with the selection?
    const dataFilter = data.map((d)=>{
      let v=d[selectedGroup];

      if(typeof v=="string"){
        v = v.replace(/,/g, '.');
      }
      if(d[mapToleranceValue(selectedGroup).h]==''){
        d[mapToleranceValue(selectedGroup).h]=0;
        d[mapToleranceValue(selectedGroup).l]=0;
      }
      else if(isNaN(d[mapToleranceValue(selectedGroup).h])==true){
        d[mapToleranceValue(selectedGroup).h]=d[mapToleranceValue(selectedGroup).h].replace(/,/g, '.');
        d[mapToleranceValue(selectedGroup).l]=d[mapToleranceValue(selectedGroup).l].replace(/,/g, '.');
      }
      // else{
      //   d[mapToleranceValue(selectedGroup).h]=d[mapToleranceValue(selectedGroup).h].replace(/,/g, '.');
      //   d[mapToleranceValue(selectedGroup).l]=d[mapToleranceValue(selectedGroup).l].replace(/,/g, '.');
      // }
    return {
      time: timeParse(d.DateTime), 
      value:v, 
      n_cycle:d.Nr_Cycles ,  
      toleranceH:d[mapToleranceValue(selectedGroup).h]*1000,
      toleranceL:d[mapToleranceValue(selectedGroup).l]*1000
    }})

    setToleranceValue(dataFilter);
    // Give these new data to update line

      gToleranceTop
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
      .x(d => x(+d.time))
      .y(d=>{
          return  y(+d.toleranceH)
        })
      )
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5)
    ;

    gToleranceBottom
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(d => x(+d.time))
        .y(d=> y(+d.toleranceL) )
      )
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5)

    ;
  // console.log(mapToleranceValue(selectedGroup));
    line
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(d => x(+d.time))
        .y(d => y(+d.value))
    )
    dot
      .data(dataFilter)
      .transition()
      .duration(1000)
      .attr("cx", d => x(+d.time))
      .attr("cy", d => y(+d.value))                           
  }      
  //#endregion
  // When the button is changed, run the updateChart function
  d3.select("#selectButtonSensor").on("change", function(event, d) {
  // recover the option that has been chosen
    let selectedOption = d3.select(this).property("value")
  // run the updateChart function with this selected option
    update(selectedOption)                
    sensors.transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity);            
  })

  Object.assign(sensors.node(), { 
    reset() {
    sensors.transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity);
    }
  });


  //#endregion
}





function mapToleranceValue(opt){
  let t={h:'',l:''};
  switch(opt){
    case 'Abs_Val_PL':
      t=t;
      break;

    case 'Abs_Val_S1_microm':  
      t.h='Hi_Tol_S1';
      t.l='Lo_Tol_S1';
      break;

    case 'Abs_Val_S2_microm': 
      t.h='Hi_Tol_S2';
      t.l='Lo_Tol_S2';
      break;

    case 'Abs_Val_S3_microm': 
      t.h='Hi_Tol_S3';
      t.l='Lo_Tol_S3';
      break;

    case 'Abs_Val_S4_microm': 
      t.h='Hi_Tol_S4';
      t.l='Lo_Tol_S4';
    break;

    case 'Abs_Val_S5_microm': 
      t.h='Hi_Tol_S5';
      t.l='Lo_Tol_S5';
      break;
    }
    // console.log(t);
  return t;
}



        
    

        
        
      