d3.csv("../dist/data/mac2s.csv").then((rawdata)=> {
    //#region Wash Data Nettoyer des données
    rawdata.forEach((el,i)=>{
              let DateTime=''
              //début formatter la date et l'heure
              let dateFormatted='';
              let t=el.Date;
              let day=t[0]+t[1];
              let month=t[3]+t[4];
              let year=t[6]+t[7]+t[8]+t[9]
              dateFormatted=year+'-'+month+'-'+day
              el.DateTime=moment(dateFormatted+''+el.Status).format();                
              //fin formatter la date et l'heure        
              if(i>0){
                  let duration=0;
                  let current=moment(el.DateTime);
                  let last=moment(rawdata[i-1].DateTime);
                  rawdata[i-1].duration=current.diff(last, 'second') 
              }
              el.DateTime=el.DateTime.toString();
          })              
          timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S+02:00")
          //data = data.filter((d,i) => i<90)
          //const codes=["2", "3", "4", "5", "6","7","8"]
          let DonutData=[];
          //console.log(rawdata);
    //#region get duration per element
          rawdata.forEach((el,i)=>{
              let DonutElement={};              
              DonutElement.Code=el.Code;
              DonutElement.duration=el.duration;
              //DonutElement.DateTime=el.DateTime;
              if(i==rawdata.length-1){
                DonutElement.duration=0;
              }
              DonutData.push(DonutElement);
          })
          //console.log(DonutData);
    //#endregion
    //#region get unique code value from DonutData
          const seen = Object.create(null);
          DonutData.forEach((el,i) => {
            seen[el.Code] = true;
          });
          const uniqueCode=Object.keys(seen);
          ///console.log("Code : ", uniqueCode)
    //#endregion         
    //#region DonutElementList
          let DonutElementList=[];           
          uniqueCode.forEach((el,i)=>{
            let DonutElement={Code:"", duration:0};
            DonutElement.Code=el;
            DonutElementList.push(DonutElement);
          })
          
          let IndexFirstOfGroupRepere=0;
          //console.log(DonutElementList)
          DonutElementList.forEach((DL,i)=>{
              DonutData.forEach((DD, j)=>{
                if(DD.Code===DL.Code){
                  DL.duration+=DD.duration;
                  //console.log(DL)
                  DonutElementList[i].duration=DL.duration;
                }
              })            
          })
    
          //console.log(DonutElementList);
    //#endregion
    //#endregion           
    // Compute the position of each group on the pie:
    // set the dimensions and margins of the graph
    const width = d3.select('#revenue-chart').node().clientWidth,
                height = d3.select('#revenue-chart').node().clientHeight,
                margin = 40;
            
            // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
            const radius = Math.min(width, height) / 2 - margin
    
    let pie = d3.pie()
          .startAngle(Math.PI)
          .endAngle(3 * Math.PI)
        .sort(/*(a, b) => fill.domain().indexOf(a.type) - fill.domain().indexOf(b.type)*/null)
        .value(d => {
          //console.log(d)
          return d.duration})
    
    
    const dataReady=pie(DonutElementList);
    //console.log(dataReady)
    
    const svg=d3.select('#revenue-chart').append('svg').attr('width', width).attr('height', height);
    const g=svg.append("g")
            //.datum(dataReady)
            .style('font-family', 'sans-serif')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);
    const c = d3.scaleOrdinal()
        .domain(DonutElementList.map(d => d.Code))
        .range(d3.quantize(t => d3.interpolateWarm(t * 0.8 + 0.1), DonutElementList.length).reverse())
    
    
           // The arc generator
           const arc = d3.arc()
              .innerRadius(radius * 0.5)         // This is the size of the donut hole
              .outerRadius(radius * 0.8)
            
            // Another arc that won't be drawn. Just for labels positioning
            const outerArc = d3.arc()
              .innerRadius(radius * 0.9)
              .outerRadius(radius * 0.9)
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    g
              .selectAll('allSlices')
              .data(dataReady.reverse())
              .join('path')
              .attr('d', arc)
              .attr('fill', d => {
                 return c(d.data.Code)
                })
              .attr("stroke", "white")
              .style("stroke-width", "2px")
              .style("opacity", 0.7)
            
            // Add the polylines between chart and labels:
            g
              .selectAll('allPolylines')
              .data(dataReady)
              .join('polyline')
                .attr("stroke", "black")
                .style("fill", "none")
                .attr("stroke-width", 1)
                .attr('points', function(d) {
                  //console.log(d);
                  const posA = arc.centroid(d) // line insertion in the slice
                  const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                  const posC = outerArc.centroid(d); // Label position = almost the same as posB
                  const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                  posC[0] = radius * 0.85 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                  return [posA, posB, posC]
                })
            
            // Add the polylines between chart and labels:
            g
              .selectAll('allLabels')
              .data(dataReady)
              .join('text')
                .text(d => { 
                    //console.log(d.data[1].name)
                    return  `Etat de machine ${ d.data.Code}` 
                })
                .attr('transform', function(d) {
                    const pos = outerArc.centroid(d);
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    pos[0] = radius * 0.85 * (midangle < Math.PI ? 1 : -1);
    
                    return `translate(${pos})`;
                })
                .style('text-anchor', function(d) {
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    return (midangle < Math.PI ? 'start' : 'end')
                })
    
      })