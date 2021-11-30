


( function () {
	//var fileCatcher = document.getElementById('file-catcher');
  var fileInput = document.getElementById('file-input');
  var fileListDisplay = document.getElementById('file-list-display');
  let fileContent=document.getElementById('csv-contents');
  var fileList = [];
  var renderFileList;
  let mergeData=[];
//   fileCatcher.addEventListener('submit', function (evnt) {
//   	evnt.preventDefault();
//     fileList.forEach(function (file) {
//     	sendFile(file);
//     });
//   });

  
  fileInput.addEventListener('change', function (evnt) {
    fileList = [];
    fileContent.innerHTML='';
  	for (var i = 0; i < fileInput.files.length; i++) {
    	fileList.push(fileInput.files[i]);
    }
    fileList.forEach(function(el, i){
      let reader = new FileReader();
      reader.addEventListener('load', function(e) {
          let text =e.target.result;
          let json = CSVJSON.csv2json(text, {parseNumbers: true});
          mergeData=mergeData.concat(json);
          
      });    

    });
    renderFileList();
  });
  
  // renderFileContent=function(){
  //   let contents='';
  //   fileList.forEach(function(el, i){
  //       let reader = new FileReader();
  //       reader.addEventListener('load', function(e) {
  //           let text =e.target.result;
  //           contents+=text;
  //           let json = CSVJSON.csv2json(text, {parseNumbers: true});
  //           document.querySelector("#csv-contents").textContent = contents;
  //       });     
  //       reader.readAsText(el);
  //   });
 
  // };


  renderFileList = function () {
  	fileListDisplay.innerHTML = '';
    fileList.forEach(function (file, index) {
    	var fileDisplayEl = document.createElement('p');
      fileDisplayEl.innerHTML = (index + 1) + ': ' + file.name;
      fileListDisplay.appendChild(fileDisplayEl);
    });
  };


})();

(async  () => {
  try{
    var fileInput = document.getElementById('file-input');
    let init_csv=document.getElementById("init_csv");
    //let update_csv=document.getElementById("update_csv");
    var fileList = [];
    let mergeData=[];

    
    init_csv.addEventListener('click', function (evnt) {
    
      fileList = [];
      mergeData=[];
      for (var i = 0; i < fileInput.files.length; i++) {
        fileList.push(fileInput.files[i]);
      }
      LoadFileContent();
    });
    
    LoadFileContent=function(){

      fileList.forEach(function(el, i){
          let reader = new FileReader();
          reader.addEventListener('load', function(e) {
              let text =e.target.result;
              let json = CSVJSON.csv2json(text, {parseNumbers: true});
              mergeData=mergeData.concat(json);
              document.querySelector("#csv-contents").textContent = JSON.stringify(mergeData);
              console.log( i, el);
              console.log(reader)
              if(i==fileList.length-1){
                mergeData.forEach((d,i)=>{
                  console.log(d.NOK)
                })
                let sensor=document.getElementById("sensor_static_svg");
                let tooltip=document.getElementById("sensor_tooltip");
                let selectButtonSensor=document.getElementById("selectButtonSensor")
                if(sensor!=null){
                  tooltip.parentNode.removeChild(tooltip);
                  sensor.parentNode.removeChild(sensor);
                  selectButtonSensor.parentNode.removeChild(selectButtonSensor);
                }
                //renderSensorGraph(mergeData);
                renderSensorStatic(mergeData);
              }
             
          });     
          reader.readAsText(el);

      });
    };
  }
  catch(e){
    console.log(e);
  }
})();


