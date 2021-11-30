const margin = {top: 10, right: 10, bottom: 70, left: 5},
width = 700 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom,
      // width = d3.select('#sensors-chart').node().parentNode.clientWidth- margin.left - margin.right,
      // height = d3.select('#sensors-chart').node().parentNode.clientHeight- margin.top - margin.bottom,
k=height/width
;

d3.json("https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/fr-FR.json").then(locale => {
d3.timeFormatDefaultLocale(locale)});
timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");


//timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");

function setTimeZone(){
      if((new Date()).getTimezoneOffset!=-120){
            console.log(Date.parse("2021-8-24T0:3:17+2:00"))
            //console.log((new Date()).getTimezoneOffset())
            //console.log(document.getElementById("SummerTime").checked)
            timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S+01:00");
            document.getElementById("SummerTime").checked=false;
      }
      else{
            //console.log((new Date()).getTimezoneOffset())
            //console.log(document.getElementById("SummerTime").checked)
            timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S+02:00");
            document.getElementById("SummerTime").checked=true;
      }
}

// function getDatesArray (startDate, endDate) {
//       const dates = []
//       let currentDate = startDate
//       const addDays = function (days) {
//         const date = new Date(this.valueOf())
//         date.setDate(date.getDate() + days)
//         return date
//       }
//       while (currentDate <= endDate) {
//         dates.push(currentDate)
//         currentDate = addDays.call(currentDate, 1)
//       }
//       return dates
//     }


    var getDaysArray = function(start, end) {
      for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
      }
      return arr;
  };