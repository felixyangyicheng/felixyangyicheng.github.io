

// execute logic on DOM loaded
document.addEventListener("DOMContentLoaded", () => {

    // retrieve important DOM elements
    const fileUploadElem = document.querySelector("input#file-input")
    const csvToLoad = document.querySelector("#init_csv")
    const selectedFilesList = document.querySelector("div#file-list-display")
    
    // file input change event - create list item for each selected file
    fileUploadElem.addEventListener("change", (event) => {

        selectedFilesList.innerHTML='';

      Array.from(fileUploadElem.files).forEach((file) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = file.name ;
        selectedFilesList.appendChild(listItem);
         // create progress indicator element
        let progressElem = document.createElement('i');
        progressElem.setAttribute('class',"fas fa-arrow-up");
        listItem.appendChild(progressElem);

    // save reference to create DOM element if needed
    //  (not used in this example)
      })
    })
  

    // form submit event - placed at bottom of DOMContentLoaded callback function above
csvToLoad.addEventListener("click", (event) => {
    // prevent normal form submit behavior 
    event.preventDefault()
    let mergeData=[];
    let completeFiles=[];
    const uploadPromises = [];
    // loop through each file and upload individually
    Array.from(fileUploadElem.files).forEach((file,i) => {
        // set spinner animation
        selectedFilesList.querySelectorAll('i')[i].setAttribute("class", "fas fa-spinner fa-pulse");

        const uploadPromise = new Promise((resolve,reject) => {
        
        // create FormData object - add file and form fields manually
        //const formData = new FormData()

        let reader = new FileReader();
        reader.addEventListener('load', function(e) {
            let text =e.target.result;
            let json = CSVJSON.csv2json(text, {parseNumbers: true});
            mergeData=mergeData.concat(json);
            //document.querySelector("#csv-contents").textContent = JSON.stringify(mergeData);
    
            if(reader.readyState===2){
                completeFiles.push(file)
                selectedFilesList.querySelectorAll('i')[i].setAttribute("class", "fas fa-check")
                resolve()
            }
            if((Array.from(fileUploadElem.files).length)==completeFiles.length){
                // mergeData.forEach((d,i)=>{
                //     if(d.NOK%5==0){

                //         console.log(d.NOK)
                //     }
                // })
                let sensor=document.getElementById("sensor_static_svg");
                let tooltip=document.getElementById("sensor_tooltip");
                let selectButtonSensor=document.getElementById("selectButtonSensor")
                let Alarmes_svg=document.getElementById("alarme_svg")
                let Alarmes_tool=document.getElementById("alarmesrange")
                let Alarmes_legende=document.getElementById("alarmelegende")
                if(sensor!=null){
                  tooltip.parentNode.removeChild(tooltip);
                  sensor.parentNode.removeChild(sensor);
                  selectButtonSensor.parentNode.removeChild(selectButtonSensor);
                 // Alarmes_tool.parentNode.removeChild(Alarmes_tool);
                  Alarmes_legende.parentElement.removeChild(Alarmes_legende);
                }
                //renderSensorGraph(mergeData);
            }
           
        });    
        reader.readAsText(file);
        // initiate AJAX request
        // xhr.open("POST", formElem.action)
        // xhr.send(formData)
        //formData.append('fileUpload', file)
        
        // dispatch xhr to start file upload - detect file upload completion and notify user
        // let xhr = new XMLHttpRequest()
        // xhr.onload = () => {
        //     if (xhr.readyState === 4 
        //         //&& xhr.status === 200
        //         ) {
        //       selectedFilesList.querySelectorAll('li')[index].style.color = 'darkgreen'
        //       resolve()
        //     } else {
        //       selectedFilesList.querySelectorAll('li')[index].style.color = 'red'
        //       reject()
        //     }
        //   }
          
        //   // watch for file upload progress
        //   xhr.upload.addEventListener('progress', (e) => {
        //     selectedFilesList.querySelectorAll('progress')[index].setAttribute("value", (e.loaded / e.total * 100) )
        //   })
        // initiate AJAX request
        // xhr.open("POST", formElem.action)
        // xhr.send(formData)
  
      })
      uploadPromises.push(uploadPromise)
    })
  
    // add notification when all uploads complete
    Promise.all(uploadPromises).then( 
        () =>{
         //console.log(mergeData)
          renderSensorStatic(mergeData);
          loadAlarmeData(mergeData);
          //countNok(mergeData);
          //renderSensorGraph(mergeData);
        }, 
        () => alert('Error during file upload.') , 
    )
  
  })
  })


