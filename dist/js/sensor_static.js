function renderSensorStatic(data){
    var start = moment().subtract(29, 'days');
    var end = moment();
    $(function() {
    
        function cb(start, end) {
            $('#sensorsrange span').html(start.format('DD/MMM/YYYY') + ' - ' + end.format('DD/MMM/YYYY'));
            $("#sensorsrange").on('apply.daterangepicker', function(ev, picker) {
                updateAlarme(picker.startDate._d,picker.endDate._d)
              });
        }
        $('#sensorsrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
               'Today': [moment(), moment().add(1,'days')],
               'Yesterday': [moment().subtract(1, 'days'), moment()],
               'Last 7 Days': [moment().subtract(6, 'days'), moment()],
               'Last 30 Days': [moment().subtract(29, 'days'), moment()],
               'This Month': [moment().startOf('month'), moment().endOf('month')],
               'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
               '1st quarter': [moment().quarter(1).startOf('quarter'), moment().quarter(1).endOf('quarter')],
               '2ns quarter': [moment().quarter(2).startOf('quarter'), moment().quarter(2).endOf('quarter')],
               '3rd quarter': [moment().quarter(3).startOf('quarter'), moment().quarter(3).endOf('quarter')],
               '4th quarter': [moment().quarter(4).startOf('quarter'), moment().quarter(4).endOf('quarter')],
               'This year': [moment().startOf('year'), moment().endOf('year')]
            }
        }, cb);
        cb(start, end);
    });
    const sensors = d3.select("#sensors-chart-statique")
    .append("svg")
    .attr("id", "sensor_static_svg")
    .attr("width", width + margin.right*9)
    .attr("height", height + margin.top*2 + margin.bottom)
    .append("g")
      .attr("transform",`translate(${margin.left},${margin.top})`);
    //timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S+01:00");
  
  //timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S+02:00");
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
  
//#region "ordering data by date"
  var mapped = data.map((el, i) =>{
    return { index: i, value: el.DateTime };
  })
  
  // sorting the mapped array containing the reduced values
  mapped.sort((a, b) =>{
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
    
  // container for the resulting order
  var result = mapped.map(el=>{
    return data[el.index]});


//#endregion


  const allGroup = [
    "Abs_Val_S1_microm", 
    "Abs_Val_S2_microm",    
    "Abs_Val_S3_microm",
    "Abs_Val_S4_microm",
    "Abs_Val_S5_microm",
    "Abs_Val_PL", 
  ];       
  // add the options to the button
  // <select id="selectButtonSensor" class="btn btn-secondary btn-sm"></select>
  d3.select("#sensor-static-card-tools")
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
    function setXAxisTicks(days){
      if(days.length > 30){
          return d3.axisTop(x).tickFormat(d3.timeFormat("W%W")).ticks(d3.timeWeek.every(1)).tickSizeOuter(0)
      }
      else {
        sensors.append("g").attr("transform", `translate(0,  0)`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("S%W-Y%Y")).ticks(d3.timeWeek.every(1)).tickSizeOuter(0))
        .selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");
        return (d3.axisTop(x).tickFormat(d3.timeFormat("%Y-%m-%d")).ticks(d3.timeDay.every(1)).tickSizeOuter(0) )
      }
  }

    //#region grid        
    const  grid = g => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g.append("g")
    .selectAll("line")
    .data(x.ticks(d3.timeWeek.every(1)))
    .join("line")
    .attr("x1", d => 0.5 + x(d))
    .attr("x2", d => 0.5 + x(d))
    .attr("y1", 0)
    .attr("y2", height ))
    .call(g => g.append("g")
    .selectAll("line")
    .data(y.ticks())
    .join("line")
    .attr("y1", d => 0.5 + y(d))
    .attr("y2", d => 0.5 + y(d))
    .attr("x1", 0)
    .attr("x2", width ));
    //#endregion
  
  
  
    //#region set default optionValueData
  
    
    const optionValueData=result.map((d)=>{
      let v=d[optionValue];
      if(typeof v=="string"){
        v = v.replace(/,/g, '.');
      }


      return {time: timeParse(d.DateTime), 
              value: v , 
              n_cycle:d.Nr_Cycles ,    
             } 
    });
  

    // Add X axis --> it is a date format
    let x = d3.scaleTime()
      //.domain(d3.extent(data, d => d.DateTime))
      .domain(d3.extent(result, d => {
        
        return timeParse(d.DateTime)}))
      .range([ 0, width ]);
  
    // Add Y axis

    let y = d3.scaleLinear()
      .domain([-70, 70])
      .range([ height, 0 ]);
  
    //#endregion

  
  
    //#endregion
    //#region Tooltip area div
    const tooltip = d3.select("#sensors-chart-statique")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .attr("id","sensor_tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");
  
    //#endregion

  
   
    //#region append line Initialize line 
    const line = sensors
          .append('g')
          .append("path")
          .attr("stroke", "red")
          .style("stroke-width", 0.5)
          .style("fill", "none")
    //#endregion        
  
  
  
    //#region Initialize dots 
    const dot = sensors
        .selectAll('circle')
        .data(optionValueData)
        .join('circle')
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
      .on("mouseout", pointerout)
    //#endregion
  
    //#region definition of function pointer
    function pointerover(event,d,i) {
    tooltip
      
      .style("opacity", 1)
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
      .transition()
      .duration(500)
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
      .duration(2000)
      .style("opacity", 0)
    }
    //#endregion
  

    //#region definition update the chart when change groupe
    function update(selectedGroup) {        
      let spinner = document.getElementById('spinner');
      spinner.setAttribute("class", "fas fa-spinner fa-pulse");
      let dateRangeExtentOnDatepicker =d3.extent(getDaysArray(start, end)) // date range, from,to
      let dateArrayOnDatepicker =getDaysArray(start, end) //dates array

    // Create new data with the selection?
      const dataFilter = result.map((d)=>{
        let v=d[selectedGroup];
        
        if(typeof v=="string"){
          v = v.replace(/,/g, '.');
        }
    

        return {
          time: d.DateTime, 
          value:v, 
          n_cycle:d.Nr_Cycles ,  
      
        }
      })
  
 

      line
        .datum(dataFilter)
        .attr("d", d3.line()
          .x(d => x(+d.time))
          .y(d => y(+d.value))
      )
      dot
        .data(dataFilter)
        .attr("cx", d => {
          //console.log(d.time)
          return x(+d.time)})
        .attr("cy", d => y(+d.value))     
        .attr("r", 1.5)
        .style("fill", "#69b3a2")
        ;                         
    }      
    //#endregion
    // When the button is changed, run the updateChart function
    d3.select("#selectButtonSensor").on("change", function(event, d) {
    // recover the option that has been chosen
      console.log(event)
      let spinner = d3.select('#spinner');

      
      
      let selectedOption = d3.select(this).property("value")
      // run the updateChart function with this selected option
      update(selectedOption)  ;
      
      sensors.transition()
      .duration(2000)
      spinner.transition()
      .duration(1000).attr("class", "fas fa-check");
      //spinner.setAttribute("class", "fas fa-spinner fa-pulse");
      // spinner.parentNode.removeChild(spinner);
     
            //.call(zoom.transform, d3.zoomIdentity);            
    })
   // xAxisParse = d3.timeParse("%Y-%m-%d");
    sensors.append("g").attr('class', 'grid').call(grid);


    sensors.append("g").attr("transform", `translate(0,  ${height})`)
    .call(setXAxisTicks(result))
    .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-80)")
        .attr("font-size","medium")
        ;

   
    sensors.append("g").attr("transform", "translate(-1,0)")
    .call(d3.axisRight(y).ticks(6).tickSizeOuter(0));
   // sensors.append("g").attr('class', 't').call(tolerance);
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
  