


// get the data
function loadAlarmeData(data){
    var start = moment().subtract(29, 'days');
    var end = moment();
    $(function() {
    
        function cb(start, end) {
            $('#alarmesrange span').html(start.format('DD/MMM/YYYY') + ' - ' + end.format('DD/MMM/YYYY'));
            $("#alarmesrange").on('apply.daterangepicker', function(ev, picker) {
                updateAlarme(picker.startDate._d,picker.endDate._d)
            });
        }
        $('#alarmesrange').daterangepicker({
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
        ///cb(start, end);
    });
    const alarme = d3.select("#alarmecontent")
      .append("svg")
        .attr("width", width + margin.right*9)
        .attr("height", height + margin.top*2 + margin.bottom)
      .append("g")
        .attr("transform",
              `translate(${margin.left},${margin.top})`);

    moment.originFormat ="DD-MM-YYYY HH:mm:ss";
    moment.converFormat="YYYY-MM-DD HH:mm:ss";
    timeFormat=d3.timeFormat("%c");  

    let alertDataSet=[];
   
    data.forEach((el,i)=>{        
        
        el.DateTime=moment(el.Date_Heure, moment.originFormat).format(moment.converFormat)
        el.DateTime=moment(el.DateTime).format();
        el.DateTime=timeParse(el.DateTime);
    
    })   

    data.forEach(function(d,i){
        if(d.NOK%5==0&&d.NOK!=0){
            alertDataSet.push(d);        
        }
    })
    let dateTimeExtent =d3.extent(data, d => {
        
        return d.DateTime;
    })



  // X axis: scale and draw:
  
  const yAxis = alarme.append("g")
  // Y axis: initialization

  const xAxis= alarme.append("g");

  const gGrid= alarme.append("g");




  // A function that builds the graph for a specific value of bin
  function updateAlarme(start, end) {
    let dateRangeExtentOnDatepicker =d3.extent(getDaysArray(start, end)) // date range, from,to
    let dateArrayOnDatepicker =getDaysArray(start, end) //dates array

 
 
    let thresholds=d3.timeDay.every(1).range(...dateTimeExtent);


    let thresholdsOnDatepicker=d3.timeDay.every(1).range(...dateRangeExtentOnDatepicker);
    //console.log(thresholdsOnDatepicker);

    let y = d3.scaleLinear()
    .domain([0, alertDataSet.length])
    .range([height, 0]);

    let  x = d3.scaleTime()
    //.domain(d3.extent(data, d => d.DateTime))
        .domain(dateRangeExtentOnDatepicker)
        .range([ 0, width  + margin.right*3 ]);

        const grid = g => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g
        .selectAll(".x")
        .data(x.ticks(d3.timeDay.every(1)))
        .join(
          enter => enter.append("line")
          .attr("class", "x")
          .attr("y1", 0)
          .attr("y2", height)
          .attr("x1", d =>  x(d))
          .attr("x2", d =>  x(d))
          .selection(),
          update => update.transition().duration(1000)
          .attr("y1", 0)
          .attr("y2", height)
          .attr("x1", d =>  x(d))
          .attr("x2", d =>  x(d))
          .selection(),
          exit => exit.style('stroke', 'red').transition().duration(1000).remove()
        )
          )
        .call(g => g
        .selectAll(".y")
        .data(y.ticks(d3.max(bins, function(d) { return d.length; })))
        .join(
          enter => enter.append("line")
          .attr("class", "y")
          .attr("x1", 0)
          .attr("x2", width+ margin.right*9)
          .attr("y1", d =>  y(d))
          .attr("y2", d =>  y(d))
          .selection(),
          update => update.transition().duration(1000)
          .attr("x1", 0)
          .attr("x2", width+ margin.right*9)
          .attr("y1", d =>  y(d))
          .attr("y2", d =>  y(d)).selection(),
          exit => exit.style('stroke', 'red').transition().duration(1000).remove()
        )
          )
    
        ;

    function setXAxisTicks(days){
        if(days.length > 30){
            xAxis.attr("font-size","small");
            return d3.axisBottom(x).tickFormat(d3.timeFormat("W%W-%y")).ticks(d3.timeWeek.every(1)).tickSizeOuter(0)
        }
        else return (d3.axisBottom(x).tickFormat(d3.timeFormat("%m-%d")).ticks(d3.timeDay.every(1)).tickSizeOuter(0) )
    }
    // set the parameters for the histogram
    let bins = d3.histogram()
    .domain(dateRangeExtentOnDatepicker)
    .thresholds(thresholdsOnDatepicker)
    .value(d => d.DateTime)
  (alertDataSet)
//console.log( bins)
    // Y axis: update now that we know the domain
    y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    yAxis
        .attr("transform", `translate(${margin.left*3},0)`)
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y) .ticks(d3.max(bins, function(d) { return d.length; })+1).tickSizeOuter(0));
    //x.domain(dateRangeExtentOnDatepicker);
    xAxis
        .attr("transform", `translate(${margin.left*3},${height})`)
        .transition()
        .duration(1000)
        .call(setXAxisTicks(dateArrayOnDatepicker))
        .selectAll("text")	
        .style("text-anchor", "start")
        .attr("dx", "5")
        .attr("dy", ".15em")
        .attr("transform", "rotate(65)")   
        ;

  // Grid: scaled, changed according to X and Y axes

    

  gGrid.attr("transform", `translate(${margin.left*3},0)`)
  .call(grid)
//   .exit()
//   .remove()
    // Join the rect with the bins data
    const gap = alarme.selectAll("rect")
        .data(bins)

    // Manage the existing bars and eventually the new ones:
    gap
        .join("rect") // Add a new rect for each new elements
        .transition() // and apply changes to all of them
        .duration(1000)
          .attr("x",  d => {
            //console.log(d)
            return x(d.x0)})
          //.attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
          .attr("width",  d=>(x(d.x1) - x(d.x0))/2-0.5 )
          .attr("y", d => y(d.length))
          .attr("height", d => y(0) - y(d.length))
          .style("fill", "crimson")
          //.attr('transform', `translate(${(width/thresholdsOnDatepicker.length)/2-1}, 0 )`)
          .attr('transform', `translate(${margin.left*3}, 0 )`);
    }
};