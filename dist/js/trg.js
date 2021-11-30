$(function() {
    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('DD-MM-YYYY') + ' - ' + end.format('DD-MM-YYYY'));
        $("#reportrange").on('apply.daterangepicker', function(ev, picker) {
            console.log(picker.startDate._d);
            console.log(picker.endDate._d);
          });
    }
    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);
    cb(start, end);
});


//#region definition set the dimensions and margins of the graph


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
            
            //console.log(el.DateTime.toString());

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
            // //washedElement.DateTime=el.DateTime;
            if(el==data[0]){
                washedElement.duration=0;
            }
            washedData.push(washedElement);    
        })   
        
            
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
    let totalTime=0;
    

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
        
const CategoryColor = d3.scaleOrdinal()
.domain(GroupElementList.map(d => d.Category))
.range(d3.quantize(t => d3.interpolateWarm(t * 0.8 + 0.1), GroupElementList.length).reverse())

        generateTRGSvg(GroupElementList,CategoryColor);

        let selOrder=true;
        document.querySelector('#TRG-group-sort')
        .addEventListener('click', function(){
        if(selOrder===true){
            selOrder=!selOrder;
            updateTRGSVG(selOrder,CategoryColor);
        }
        else{
            selOrder=!selOrder;
            updateTRGSVG(selOrder,CategoryColor);
        }
        });

       

        document.getElementById('group-table-area').appendChild(generateGroupTable(GroupElementList));
        document.getElementById('status-table-area').appendChild(generateStatusTable(StatusElementList));


        $(function () {
            var tableGroup=$("#group-table").DataTable({
                "responsive": true, "lengthChange": false, "autoWidth": true,
                "scrollY": "150px",
              "buttons": ["excel", "pdf", "print"]
            }).buttons().container().appendTo('#group-table_wrapper .col-md-6:eq(0)');

            var tableStatus=$("#status-table").DataTable({
                "responsive": true, "lengthChange": false, "autoWidth": true,
                "scrollY": "150px",
              "buttons": ["excel", "pdf", "print"]
            }).buttons().container().appendTo('#status-table_wrapper .col-md-6:eq(0)');
           
        });


    
        var loopcount = 1;

        var interval = setInterval(function() { 
           if (loopcount <= 6000) { 
            
              loopcount++;
              selOrder=!selOrder;
              updateTRGSVG(selOrder,CategoryColor);
           }
           else { 
              clearInterval(interval);
           }
        }, 8000);

        
    } 
    
    catch (error) {
      // handle error
    }
})()


//#region append the svg object to the body of the page

function generateTRGSvg(data, color){
    const x = d3.scaleLinear()
                .domain([0, 100])
                .range([ width, 0 ]);
    const TRG = d3.select("#TRG-chart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",`translate(${margin.left},${margin.top})`);
    
//#region rectangle TRG  
    TRG.selectAll("rect")
      .data(data, function (d){
          return d.Category;
      })
      .join('rect')
      
      .attr('width', d=>d.duration/50)
      .attr('height', '60')
      .attr('y', (d,i)=>{
        return i*70;
      })
      .attr('x', '10')
      .style('fill',  d => {
        return color(d.Category)
       });
//#endregion rectangle TRG

//#region text TRG

      TRG.selectAll('text')
      .data(data, function(d){
        return d.Category;
      })
      .join('text')
    
      .attr('x', d=>d.duration/50+20)
      .attr('y', function(d,i){
          return (i*70)+25;
        })
      .text(d=>(`${d.Category}, ${d.percentage} %`))
       .style("text-anchor", "start")
      
      .style('fill', 'rgb(63,63,63)')
      .style('opacity','0.7')
      .style('font-size', '13')
      .style('font-weight', 'bold');
//#endregion text TRG


}
//#endregion   

const outDuration=1000,
    sortDuration=1000,
    inDuration=1000,
    outDelay=outDuration/2,
    sortDelay=0,
    inDelay=10;


//#region Update TRG SVG
function updateTRGSVG(order, color){

    let TRGText=d3.select("#TRG-chart")
    .selectAll("text")
  


    .attr('x', d=>d.duration/50+20)
    .attr('y', (d,i)=>(i*70)+20)

    .text(d=>(`${d.Category}, ${d.percentage} %`))
    .style('text-anchor', 'start')
    .style('fill', 'rgb(63,63,63)')
    .style('font-size', '13')
    .style('font-weight', 'bold');
    let TRGRect= d3.select("#TRG-chart")
    .selectAll("rect")
    .attr('x', '10')
    .attr('y', (d,i)=>(i*70))

    .attr('width', d=>d.duration/50)
    .attr('height', '60')
    .attr('id', (d,i)=>d.duration)
    .style('fill',  d => (d.Category))
    TextRepeat();
    RectRepeat();
    function TextRepeat(){
    // .data(data, function(d){
    //     return d.Category;
    //   })
        TRGText
        
        .sort((a,b)=>{
            return order===true?
            a.duration-b.duration:
            b.duration-a.duration;
            })
        // .transition()
        // .duration(2000)
        //attr('x', '500' ) 

        // .transition()
        // .duration(1000)
        // .attr('y', (d,i)=>(i*70)+20)

        .transition()
        .duration(outDuration)
        .attr('x', d=>d.duration/50+ 420)
        .delay(function(d,i){ return(i*outDelay)})

        .transition()
        .duration(sortDuration)
        .attr('y', (d,i)=>(i*70)+20)
        .delay(function(d,i){ return(i*sortDelay)})


        .transition()
        .duration(inDuration)
        .attr('x', d=>d.duration/50+20)
        .delay(function(d,i){ return(i*inDelay)})
       
        // .attr('y', (d,i)=>(i*70)+20)
         //.on('end', TextRepeat)
        ;
    }

    function RectRepeat(){
        TRGRect
        .sort((a,b)=>{
            return order===true?
            a.duration-b.duration:
            b.duration-a.duration;
            })
        
        .transition()
        .duration(outDuration)
        
        .attr('x', '400')
        .attr('width', 0)
        .delay(function(d,i){ return(i*outDelay) })

        .transition()
        .duration(sortDuration)
        .style('fill',  d => (d.Category))
        .attr('y', (d,i)=>(i*70))
        .delay(function(d,i){ return(i*sortDelay)})

        .transition()
        .duration(inDuration)
        .attr('x', '10')
        .attr('width', d=>d.duration/50)
        .delay(function(d,i){ return(i*inDelay)})
        TRGRect
        .style('fill',  d => (d.Category))
        // .transition()
        // .duration(2000)
        

        // .attr('y', (d,i)=>i*70)
        // .on("end", RectRepeat)
        ;
    }

    
}
//#endregion TRG SVG

function generateStatusTable (jArray) {
    let tbody = document.createElement('tbody');
    let thead = document.createElement('thead');
    let table = document.createElement('table');
  
  table.id="status-table";
  table.className="table table-bordered table-striped";

    // 將所有資料列的資料轉成tbody
    jArray.forEach(row => {
        let tr = document.createElement('tr');

        Object.keys(row).forEach(tdName => {
            let td = document.createElement('td');
            td.textContent= row[tdName];

            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // 將所有資料列的欄位轉成thead
    let headerTr = document.createElement('tr')

    Object.keys(jArray[0]).forEach(header => {
        let th = document.createElement('th')
        th.textContent = header
        th.innerHTML+="<i class='fas fa-sort'></i>"
        headerTr.appendChild(th)
    });

    // 新增thead到table上
    thead.appendChild(headerTr);
    table.appendChild(thead);

    return table;
}


function generateGroupTable (jArray) {
    let tbody = document.createElement('tbody');
    let thead = document.createElement('thead');
    let table = document.createElement('table');
  
  table.id="group-table";
  table.className="table table-bordered table-striped";

    // 將所有資料列的資料轉成tbody
    jArray.forEach(row => {
        let tr = document.createElement('tr');

        Object.keys(row).forEach(tdName => {
            let td = document.createElement('td');
            td.textContent= row[tdName];

            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // 將所有資料列的欄位轉成thead
    let headerTr = document.createElement('tr')

    Object.keys(jArray[0]).forEach(header => {
        let th = document.createElement('th')
        th.textContent = header  
        th.innerHTML+="<i class='fas fa-sort'></i>"
        headerTr.appendChild(th)
    });

    // 新增thead到table上
    thead.appendChild(headerTr);
    table.appendChild(thead);

    return table;
}


const groupTableArea = document.getElementById("group-table-area");
const statusTableArea = document.getElementById("status-table-area");
const tableButton = document.getElementById("btn-group-table");
tableButton.addEventListener("click", function(){
    changeTable();
});
groupTableArea.style.visibility = "visible";




function changeTable(){
    if(groupTableArea.style.visibility =="collapse"){
        tableButton.innerHTML = "Status";
        statusTableArea.style.visibility = "collapse";
        statusTableArea.className = "chart tab-pane";
        groupTableArea.style.visibility = "visible";
        groupTableArea.className = "chart tab-pane active";
    }
    else{
        tableButton.innerHTML = "Group";
        statusTableArea.style.visibility = "visible";
        statusTableArea.className = "chart tab-pane active";
        groupTableArea.style.visibility = "collapse";
        groupTableArea.className = "chart tab-pane";
    }
}

    
let convertTime = function (input, separator) {
    let pad = function(input) {return input < 10 ? "0" + input : input;};
    return [
        pad(Math.floor(input / 3600)),
        pad(Math.floor(input % 3600 / 60)),
        pad(Math.floor(input % 60)),
    ].join(typeof separator !== 'undefined' ?  separator : ':' );
}





