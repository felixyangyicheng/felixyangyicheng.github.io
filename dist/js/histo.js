//#region definition set the dimensions and margins of the graph
d3.json("https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/fr-FR.json").then(locale => {
d3.timeFormatDefaultLocale(locale)});
           timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S+02:00");
           timeFormat=d3.timeFormat("%c");  
    //   const margin = {top: 10, right: 30, bottom: 10, left: 5},
    //   width = 600 - margin.left - margin.right,
    //   height = 400 - margin.top - margin.bottom,
    //         // width = d3.select('#sensors-chart').node().parentNode.clientWidth- margin.left - margin.right,
    //         // height = d3.select('#sensors-chart').node().parentNode.clientHeight- margin.top - margin.bottom,
    //         k=height/width;
//#endregion        




(async () => {
    try {
        let data = await d3.csv("../dist/data/mac2s.csv")
        let code= await d3.csv("../dist/data/Code.csv")
        let washedData=await [];
        let StatusElementList = await [];
        let GroupElementList = await[];

       
        data.forEach((el,i)=>{        
            //let DateTime=''
            //début formatter la date et l'heure
            let dateFormatted='';
            let t=el.Date;
            let day=t[0]+t[1];
            let month=t[3]+t[4];
            let year=t[6]+t[7]+t[8]+t[9]
            dateFormatted=year+'-'+month+'-'+day
            el.DateTime=moment(dateFormatted+''+el.Time).format();
            //el.DateTime=el.DateTime.toString();

            if(i>0){
                let duration=0;
                let current=moment(el.DateTime);
                let last=moment(data[i-1].DateTime);
                let d =moment.duration(current.diff(last));
     
                el.duration=d.get('seconds');
  
                //el.duration=convertTime(el.duration);
                //el.duration=current.diff(last, 'hours', true) ;
            }

            
            code.forEach((cd,i)=>{
                if(cd.StatusCode==el.Code){
                    el.Group=cd.Group;
                    el.GroupCode=cd.GroupCode;
                    el.Status=cd.Description;
                }
            })
            //mapping avec code
            let washedElement={};              
            washedElement.Code=el.Code;
            washedElement.duration = el.duration;
            washedElement.GroupCode=el.GroupCode;
            washedElement.Group=el.Group;
            washedElement.Status=el.Status;
            washedElement.DateTime=el.DateTime;
            // //washedElement.DateTime=el.DateTime;
            if(el==data[0]){
                washedElement.duration=0;
            }
            washedData.push(washedElement);    
        })   
       
        //console.log(washedData)

        groupedList=[];
        let TempoSum=0;
        let DurationSUM=0
        let IndexFirstOfGroupRepere=0;
        washedData.forEach((el,i)=>{

            let groupedElement={};
            DurationSUM=DurationSUM+el.duration;
            TempoSum+=el.duration;
            // if(i===0){
            //     groupedElement.DateTime=el.DateTime;
            //     groupedList.push(groupedElement);
            //     console.log(groupedList);
            // }
            if(i===washedData.length-1){
                groupedElement.Code=el.Code;
                groupedElement.DateTimeBegin=washedData[IndexFirstOfGroupRepere].DateTime;
                groupedElement.duration=TempoSum;
 
                groupedElement.begin=timeParse(groupedElement.DateTimeBegin);
                groupedElement.end=timeParse(moment(groupedElement.DateTimeBegin).add( groupedElement.duration, 'seconds').format());
                groupedList.push(groupedElement);
              
            }
            else if(i>0&&washedData[i].Code!=washedData[i-1].Code){
                groupedElement.Code=washedData[i-1].Code;
                groupedElement.DateTimeBegin=washedData[IndexFirstOfGroupRepere].DateTime;
                groupedElement.duration=TempoSum-el.duration;
                
                groupedElement.begin=timeParse(groupedElement.DateTimeBegin);
                groupedElement.end=timeParse(moment(groupedElement.DateTimeBegin).add( groupedElement.duration, 'seconds').format());
                groupedList.push(groupedElement);
         
                TempoSum=el.duration;
                IndexFirstOfGroupRepere=i;
            } 
                         
        })
        //console.log(groupedList);
            
    //#region get unique code value from washedData
    const seen = Object.create(null);
    washedData.forEach((el,i) => {        
        seen[el.Code] = true;
    });
    const uniqueCode=Object.keys(seen);
    //console.log("Code : ", uniqueCode)
    //#endregion         
    //#region ElementList
    let ElementList=[];           
    uniqueCode.forEach((el,i)=>{
        let Element={Code:"", duration:0};
        Element.Code=el;
        ElementList.push(Element);
        
    })
    
    let totalSeconds=0;

    

    ElementList.forEach((DL,i)=>{
        washedData.forEach((DD, j)=>{
            if(DD.Code===DL.Code){
                DL.duration+=DD.duration;
                //console.log(DL)
                ElementList[i].duration=DL.duration;
                ElementList[i].Group=DD.Group;
                ElementList[i].Status = DD.Status;
                ElementList[i].GroupCode = DD.GroupCode;
            }
        })            
        totalSeconds=DL.duration+totalSeconds;
        
    })
    ElementList.forEach(DL=>{
        DL.percentage=((DL.duration/totalSeconds)*100).toFixed(2)+"%";
    })
    

    ElementList.forEach((el, i) => {

        let StatusElement = {Duration:0};
        StatusElement.StatusCode = el.Code;
        StatusElement.Status = el.Status;
        StatusElement.Duration = el.duration+ " s";
        StatusElement.Percentage = el.percentage;    
        StatusElementList.push(StatusElement);
    
    })
        
    
   

    
        
    const group = Object.create(null);
    ElementList.forEach((el,i) => {        
        group[el.GroupCode] = true;
    });
    const GroupCode=Object.keys(group);

    GroupCode.forEach((el,i)=>{
        let G={ID:"", duration:0};
        G.ID=el;
        GroupElementList.push(G);
   
    })    
          
 
    GroupElementList.forEach((GL,i)=>{
        ElementList.forEach((el, j) => {
            if (el.GroupCode === GL.ID) {
                GL.duration+=el.duration;
                //console.log(GL)
                GroupElementList[i].duration= GL.duration;
                //GroupElementList[i].t=timeConverter(GL.duration) ;

                GroupElementList[i].Category=el.Group;
            
            }
        })
      
        
    })
     // To fix: convert seconds to hours:minutes:seconds   
    GroupElementList.forEach(GL=>{
        GL.percentage=((GL.duration/totalSeconds)*100).toFixed(2);
    })


//#endregion
//#endregion          
//console.log(StatusElementList);
        
const StatusColor = d3.scaleOrdinal()
.domain(GroupElementList.map(d => d.Category))
.range(d3.quantize(t => d3.interpolateWarm(t * 0.8 + 0.1), StatusElementList.length).reverse())

generateStatusHistoSvg(groupedList,StatusColor);
        
    } 
    
    catch (error) {
      // handle error
    }
})()

function generateStatusHistoSvg(data, color){
    const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.begin))
    .range([margin.left, width * 6 - margin.right])

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.duration)]).nice(6)
    .range([height - margin.bottom, margin.top])
const parent = d3.select("#histo-chart");
const xAxis = g => g
    .attr("transform", `translate(0,0)`)
    .attr("class", "xAxis")
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%H:%M")).ticks(d3.timeMinute.every(15)).tickSizeOuter(0))

//#region mouve function
const mouseover = (event, d,i) =>{
    tooltip
        .style("opacity", 1)
        .html(`
            <ul>
                <li>
                    <span class="tooltipspan"> Etat </span>${d.Code}<span class="tooltipspan"> de machine</span>
                </li>
                <li>
                    <span class="tooltipspan">Durée du cycle</span>: ${d.duration} secondes 
                </li>
                <li>
                    <span class="tooltipspan">Début</span>: ${timeFormat(d.begin)}
                </li>
                <li>
                    <span class="tooltipspan">Fin</span>: ${timeFormat(d.end)}
                </li>
            </ul>
         `)
        .style("left", (event.x)/2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style("top", (event.y)/2 + "px")
}

const mousemove = (event, d) =>{
    tooltip
        .html(`
            <ul>
                <li>
                    <span class="tooltipspan"> Etat </span>${d.Code}<span class="tooltipspan"> de machine</span>
                </li>
                <li>
                    <span class="tooltipspan">Durée du cycle</span>: ${d.duration} secondes 
                </li>
                <li>
                    <span class="tooltipspan">Début</span>: ${timeFormat(d.begin)}
                </li>
                <li>
                    <span class="tooltipspan">Fin</span>: ${timeFormat(d.end)}
                </li>
            </ul>
         `)
        //.html(`<span class="tooltipspan"> Etat </span>${d.Code} <span class="tooltipspan">de machine</span>, <span class="tooltipspan">Durée du cycle</span>: ${d.duration} secondes, <span class="tooltipspan">Début</span>: ${timeFormat(d.begin)}, <span class="tooltipspan">Fin</span>: ${timeFormat(d.end)}`)
        .style("left", (event.x)/2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style("top", (event.y)/2 + "px")
}

// A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
const mouseleave = (event,d)=> {
    tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
}
//#endregion
//#region AREA div, OverWidth définition
const area = d3.area()
    .curve(d3.curveStep)
    .x(d => timeParse(d.begin))
    .y0(y(0))
    .y1(height);

const minX = x(data[0].begin);
const maxX = x(data[data.length - 1].begin);

const overwidth = maxX - minX + margin.left + margin.right;




//#endregion


//   parent.append("svg")
//        .attr("class", "yAxisDiv")
//       .attr("width", width)
//       .attr("height", height)
//       .style("position", "absolute")
//       .style("pointer-events", "none")
//       .style("z-index", 1)
//       .call(svg => svg.append("g").call(yAxis));

const scollbar = parent.append("div")
        .attr("class", "scollBar")
        .style("overflow-x", "scroll")
        .attr("height", height)
        .style("-webkit-overflow-scrolling", "touch");

const barArea =  scollbar.append("svg")
        .attr("class", "barArea")
        .attr("width", overwidth)
        .attr("height", height/2)
barArea.append('g')
        .attr("class", "bar")
barArea.selectAll("bar")
       .data(data)
       .join("rect")
       .attr("x", (d,i)=>{
           return x(d.begin)
       })
       .attr("y", 0)
       .attr("width", (d,i)=>x(d.end)-x(d.begin))
       .attr("height", height/2)
       //.style("fill",d => COLOR[parseInt(d.Code)])
       .style("fill",d => color(d.Code))
       .on("click", mouseover )
       //.on("mousemove", mousemove )
       .on("mouseleave", mouseleave )
const xAxisDiv=  scollbar.append("svg")
        .attr("class", "xAxisDiv")
        .attr("width", overwidth)
        .attr("height", margin.bottom*2)
        .style("display", "block")
        .call(svg => 
                svg.append("g")                
                    .call(xAxis))
//#region tooltip 
const tooltip = parent
.append("div")
.style("opacity", 0)
.attr("class", "tooltip")
.style("background-color", "white")
.style("border", "solid")
.style("border-width", "1px")
.style("border-radius", "5px")
.style("padding", "10px");

//#endregion
scollbar.node().scrollBy(overwidth, 0);    
}