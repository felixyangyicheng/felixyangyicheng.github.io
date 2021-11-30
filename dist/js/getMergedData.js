
function readFileAsText(file){
    return new Promise(function(resolve,reject){
        let fr = new FileReader();

        fr.onload = function(){
            resolve(fr.result);
        };

        fr.onerror = function(){
            reject(fr);
        };

        fr.readAsText(file);
    });
}

function getMergedData() {
    var fileInput = document.getElementById('file-input');
    var fileList = [];
    let mergeData=[];

    fileInput.addEventListener('change', function (evnt) {
        fileList = [];
        for (var i = 0; i < fileInput.files.length; i++) {
            fileList.push(fileInput.files[i]);
        }
        fileList.forEach(function(el, i){


        //   let reader = new FileReader();
        //   reader.addEventListener('load', function(e) {
        //       let text =e.target.result;
        //       let json = CSVJSON.csv2json(text, {parseNumbers: true});
        //       mergeData=mergeData.concat(json);
            
            
        //   });   
        
        
        //   reader.readAsText(el);

        console.log(readFileAsText(el)) ;  

        console.log(mergeData);
        });
        
    });
    return mergeData;
}
