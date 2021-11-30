const colorSet = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
const myColor = d3.scaleOrdinal().domain(colorSet).range(["green", "red", "gold", "darkblue", "black", "grey", "slateblue", "pink", "brown", "azure", "grey1", "orange"]);
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
//console.log("Code : ", uniqueCode)
//#endregion         
//#region DonutElementList
let DonutElementList=[];           
uniqueCode.forEach((el,i)=>{
 let DonutElement={Code:"", duration:0};
 DonutElement.Code=el;
 DonutElementList.push(DonutElement);
 
})

let totalSeconds=0;
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
   totalSeconds=DL.duration+totalSeconds;
})

//console.log(DonutElementList);
//#endregion
//#endregion           
// Compute the position of each group on the pie:
// set the dimensions and margins of the graph
const width = d3.select('#sales-chart').node().parentNode.clientWidth,
height = d3.select('#sales-chart').node().parentNode.clientHeight,
margin = height/8,
duration =550,
spaceBewteenElements=width/6
;
//console.log(width);
 
 // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
 const radius = Math.min(width, height) / 2 - margin
function calcTranslate(data, move = 4) {
const moveAngle = data.startAngle + ((data.endAngle - data.startAngle) / 2);
return `translate(${- move * Math.cos(moveAngle + Math.PI / 2)*5}, ${- move * Math.sin(moveAngle + Math.PI / 2)*5})`;
}
let pie = d3.pie()
.startAngle(Math.PI)
.endAngle(3 * Math.PI)
.sort(/*(a, b) => fill.domain().indexOf(a.type) - fill.domain().indexOf(b.type)*/null)
.value(d => {
//console.log(d)
return d.duration})


const dataReady=pie(DonutElementList);
console.log(dataReady)

const tooltip=d3.select('#sales-chart').append("div").attr('width', width).attr('height', 60);
tooltip.style("opacity", 0)
    .attr("id", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px");
const svg=d3.select('#sales-chart').append('svg').attr('width', width).attr('height', height-margin);

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
 const outerArcBis=d3.arc()
   .innerRadius(radius*0)
   .outerRadius(radius*1.3)


// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
const slices= g
   .selectAll('allSlices')
   .data(dataReady.reverse())
   .join('path')
   .attr('d', arc)
   .attr("class", "slice")
   .style("fill",d => myColor(d.data.Code))
   .attr("stroke", "white")
   .style("stroke-width", "2px")
   .style("opacity", 0.5)
   .style('cursor', 'pointer')
           .on('mouseover', (event, v) => {
     let ratio=(v.data.duration/totalSeconds*100).toFixed(2);
             d3.select(event.currentTarget)
       .transition()
       .duration(duration)
       .attr('transform', calcTranslate(v, 6));
     d3.select(event.currentTarget).select('arc')
       .transition()
       .duration(duration)
       .attr('stroke', 'rgba(100, 100, 100, 0.2)')
       .attr('stroke-width', 4);
   tooltip
 .style("opacity", 1)
 .html(`<span> Etat </span>${v.data.Code} <span>de machine</span>, <span>Durée du cycle</span>: ${v.data.duration}", <span>Ratio</span>: ${ratio}%`)
 .style("left", (event.x)/2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
 .style("top", (event.y)/2 + "px")
           })
           .on('mouseout', (event, v) => {
     d3.select(event.currentTarget)
       .transition()
       .duration(duration)
       .attr('transform', 'translate(0, 0)');
     d3.select(event.currentTarget).select('arc')
       .transition()
       .duration(duration)
       .attr('stroke', 'white')
       .attr('stroke-width', 1);
   });
 // Add the polylines between chart and labels:

 const guideLines= g
   .selectAll('allPolylines')
   .data(dataReady)
   .attr("class","polyline")
   .join('polyline')
   .attr("stroke", (d,i)=>{
     return(i%2==0? "red":"black")
   })
   .style("fill", "none")
   .attr("stroke-width", 1)
   .attr('points', function(d,i) {
     let ratio=d.data.duration/totalSeconds*100
     const posA = arc.centroid(d) // line insertion in the slice

     //const posB = (i%2==0? arc.centroid(d):outerArcBis.centroid(d)) // line break: we use the other arc generator that has been built only for that
     const posB=(ratio>40?outerArc.centroid(d):arc.centroid(d));
     const posC =outerArc.centroid(d);  // Label position = almost the same as posB
     
     const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
     // posB[0]=(i%2==0? posB[0]=20:posB[0])
     posB[0]=(ratio>40? posA[0]:posB[0])
     posB[1]=(ratio>40? posA[1]:posB[0])
     posC[0] = radius * 0.85 * ( d.startAngle>6.5? 1.05 : -1.05); // multiply by 1 or -1 to put it on the right or on the left
     //posC[0]=  radius+i*25
     posC[1]=i*spaceBewteenElements
     return [posA, posB, posC]
  })
  .attr("display",  (d,i)=>{
   let ratio=d.data.duration/totalSeconds*100;
    return(ratio>1? "none":"inline");
  })
   ;


const CodeLabels=g
   .selectAll('CodeLabels')
   .data(dataReady)
   .join('text')
     .text(d => { 
         //console.log(d.data.Code)
         return  `Etat ${ d.data.Code}` 
     })
     .attr('transform', function(d,i) {
         const pos = outerArc.centroid(d);
         console.log(pos)
         const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
         //pos[0] = radius * 0.85 * (midangle > Math.PI ? 1 : -1)-i*5;
         pos[0] = radius * 0.85 * ( d.startAngle>6.5? 1.05 : -1.05);
         pos[1]=i*spaceBewteenElements
         return `translate(${pos})`;
     })
     .style('text-anchor', function(d,i) {
         //const midangle = d.startAngle + (d.endAngle - d.startAngle) / 10
         //return (midangle > Math.PI ? 'start' : 'end')
         return (d.startAngle>6.5? 'start' : 'end')
     })
     .attr("display",  (d,i)=>{
       let ratio=d.data.duration/totalSeconds*100;
       return(ratio>1? "none":"inline");
     });     
const  PercentageLabels=g
   .selectAll('PercentageLabels')
   .data(dataReady)
   .join('text')
     .text(d => { 
         return  `Durée ${ d.data.duration}" , ${(d.data.duration/totalSeconds*100).toFixed(2)}%` 
     })
     .attr('transform', function(d,i) {
         const pos = outerArc.centroid(d);
         const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
         //pos[0] = radius * 0.85 * (midangle > Math.PI ? 1 : -1)-i*5;
          pos[0] = radius * 0.85 * ( d.startAngle>6.5? 1.05 : -1.05);
          pos[1]=i*spaceBewteenElements+15
         return `translate(${pos})`;
     })
     .style('text-anchor', function(d,i) {
         //const midangle = d.startAngle + (d.endAngle - d.startAngle) / 10
         //return (midangle > Math.PI ? 'start' : 'end')
         return (d.startAngle>6.5? 'start' : 'end')
     })
     .attr("display",  (d,i)=>{
       let ratio=d.data.duration/totalSeconds*100;
       return(ratio>1? "none":"inline");
     })
     ;             

})
