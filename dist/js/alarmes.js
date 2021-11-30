



function countNok(data){
    const Alarmes_svg= d3.select("#alarmecontent")
    .append("svg")
    .attr("id", "alarme_svg")
    .attr("width", width  + margin.right*6)
    .attr("height", height + margin.top*3 + margin.bottom)
    .append("g")
  .attr("transform",`translate(${margin.right*3},${margin.top})`);


    moment.originFormat ="DD-MM-YYYY HH:mm:ss";
    moment.converFormat="YYYY-MM-DD HH:mm:ss";
    timeFormat=d3.timeFormat("%c");  

    
    let alertDataSet=[];
   
    data.forEach((el,i)=>{        
        
        el.DateTime=moment(el.Date_Heure, moment.originFormat).format(moment.converFormat)
        el.DateTime=moment(el.DateTime).format();
        el.DateTime=timeParse(el.DateTime);
    
    })   



    let AlarmeStart,AlarmeEnd;
    data.forEach(function(d,i){
        if(d.NOK%5==0&&d.NOK!=0){
            alertDataSet.push(d);        
        }
    })
    if(alertDataSet.length==0){
        AlarmeStart = moment();
        AlarmeEnd = moment();
         
    }
    else{
        AlarmeStart = moment(alertDataSet[0].DateTime);
         AlarmeEnd = moment(alertDataSet[alertDataSet.length - 1].DateTime);
    }
    const alarmeLegende =d3.select("#alarme-body").append("svg").attr("class", "card-title").attr("id","alarmelegende")
    
    d3.select("#alarme-body").append("div").attr("class", "card-tool").attr("id","alarmesrange")
    d3.select("#alarmesrange").append("i").attr("class", "fa fa-calendar")
    d3.select("#alarmesrange").append("span")
    $('#alarmesrange span').html('Selectionner une période');
    d3.select("#alarmesrange").append("i").attr("class", "fa fa-caret-down")
    
    var start = moment().subtract(29, 'days');
    var end = moment();
    function cb(start, end) {
           
        $('#alarmesrange span').html(' Selectionner une période pour afficher ');

       // $('#alarmesrange span').html(start.format('DD-MM-YYYY') + ' - ' + end.format('DD-MM-YYYY'));
        $("#alarmesrange").on('apply.daterangepicker', function(ev, picker) {

            updateAlarme(picker.startDate._d,picker.endDate._d,data)
        });
    }
    $('#alarmesrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
        // '1ère semaine': [moment(AlarmeEnd).startOf('month'), moment(AlarmeEnd).endOf('month').subtract(21, 'days')],
        // '2ème semaine': [moment(AlarmeEnd).endOf('month').subtract(21, 'days'), moment(AlarmeEnd).endOf('month').subtract(14, 'days')],
        // '3ème semaine': [moment(AlarmeEnd).endOf('month').subtract(14, 'days'), moment(AlarmeEnd).endOf('month').subtract(7, 'days')],
        // '4ème semaine' : [moment(AlarmeEnd).endOf('month').subtract(7, 'days'), moment(AlarmeEnd).endOf('month')],
        'Mois récent': [moment(AlarmeEnd).startOf('month'), moment(AlarmeEnd).endOf('month')],  
        'Année courante': [moment(AlarmeEnd).startOf('year'), moment(AlarmeEnd).endOf('year')],          
        }
    }, cb);
    cb(start,end);
    
}



function updateAlarme(start, end, input){

  
let Alarmes_svg=document.getElementById('alarme_svg');
  
  if(Alarmes_svg!=null)
  {
      Alarmes_svg.parentNode.removeChild(Alarmes_svg)
  }  
   Alarmes_svg= d3.select("#alarmecontent")
  .append("svg")
  .attr("id", "alarme_svg")
  .attr("width", width  + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
.attr("transform",`translate(${margin.right*3},${margin.top})`);
    let alertDataSet=[];



    let FilterInput=input.filter((d)=>{
        return (d.DateTime<=end && d.DateTime >=start)       
    })



    FilterInput.forEach(function(d,i){
        if(d.NOK%5==0&&d.NOK!=0){
            alertDataSet.push(d);        
        }
    })

    let dateTimeExtent =d3.extent(FilterInput, d => {
        
        return d.DateTime;
    })

    let dateRangeExtentOnDatepicker =d3.extent(getDaysArray(start, end)) // date range, from,to
    let dateArrayOnDatepicker =getDaysArray(start, end) //dates array

   // console.log(dateArrayOnDatepicker);
 
    let thresholds=d3.timeDay.every(1).range(...dateTimeExtent);

    let thresholdsOnDatepicker=d3.timeDay.every(1).range(...dateArrayOnDatepicker);


    const x = d3.scaleTime()
    //.domain(d3.extent(data, d => d.DateTime))
    .domain(dateTimeExtent)
    .range([ 0, width  + margin.right*3 ]);

// console.log((alertDataSet.map(d => d.NOK)))

// console.log(Math.max(...alertDataSet.map(d => d.NOK)))

    const y = d3.scaleLinear()
    .domain([0, alertDataSet.length])
    .range([ height, 0 ]); 



    const  grid = g => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g.append("g")
    .selectAll("line")
    .data(x.ticks(bins.length))
    .join("line")
    .attr("x1", d =>  x(d)+1)
    .attr("x2", d =>  x(d)+1)
    .attr("y1", 0)
    .attr("y2", height ))
    .call(g => g.append("g")
    .selectAll("line")
    .data(y.ticks(alertDataSet.length))
    .join("line")
    .attr("y1", d => 0.5 + y(d))
    .attr("y2", d => 0.5 + y(d))
    .attr("x1", 0)
    .attr("x2", width ));


   let bins = d3.histogram()
    .domain(dateRangeExtentOnDatepicker)
    .thresholds(thresholdsOnDatepicker)
    .value(d => d.DateTime)
  (alertDataSet)

  bins=d3.bin().domain(dateRangeExtentOnDatepicker).thresholds(thresholdsOnDatepicker)



  console.log(bins)
  Alarmes_svg.append("g").call(grid);


    Alarmes_svg.append("g").data(bins).attr("transform", `translate(-1,0)`)
        .call(d3.axisLeft(y).ticks(15).tickSizeOuter(0));

    function setXAxisTicks(days){
        if(days.length > 30){
            return d3.axisBottom(x).tickFormat(d3.timeFormat("W%W-%y")).ticks(d3.timeWeek.every(1)).tickSizeOuter(0)
        }
        else return (d3.axisTop(x).tickFormat(d3.timeFormat("%m-%d")).ticks(d3.timeDay.every(1)).tickSizeOuter(0) )
    }

    Alarmes_svg .append('g')
        .attr("transform", `translate(0,  ${height})`)
        .call(setXAxisTicks(dateArrayOnDatepicker))
        .selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")
            .attr("font-size","medium")
            ;

    //#region bar pour première value d'alarme 
    // logique de calcul: la largueur de graphique est divisée par le nombre de partition de date, sur un mois il y a une vintaine ou traintaine de valeur, 
    // et sur une semaine il y a 7 groupe de valeur. l'idée est d'ajouter une transformation la largueur d'une partirion de date/valeur.  
    // (largeur/nombre de groupe date)/nombre de type de valeur
    Alarmes_svg.append("g")
            .attr("fill", "crimson")
          .selectAll("rect")
          .data(bins)
          .join("rect")
            .attr("x", d => {
                //console.log(d)
                return x(d.x0)+1} )
            .attr("width", d=>(x(d.x1) - x(d.x0))/2)
            .attr("y", d => {
                
                return y(d.length)})
            .attr("height", d => y(0) - y(d.length));
    //#endregion
    //#region bar pour une autre value d'alarme

    console.log(thresholdsOnDatepicker.length)
    Alarmes_svg.append("g")
            .attr("fill", "steelblue")
          .selectAll("rect")
          .data(bins)
          .join("rect")
            .attr("x", d =>{
                console.log(d)
                return x(d.x0)+1})
            .attr("width", d=>(x(d.x1) - x(d.x0))/2)
            .attr("y", d => y(d.length))
            .attr("height", d => y(0) - y(d.length))
            .attr('transform', `translate(${(width/thresholdsOnDatepicker.length)/2-1}, 0 )`)
            ;
    //#endregion


    
}