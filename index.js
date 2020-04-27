#!/usr/bin/env node

/**
 * @author Shefki Esadi <shralsheki@gmail.com>
 * @since 15.04.2020
 */

var fs = require('fs');
var process = require("process");

var param = getPathArgument();
param.objectPath = param.objectPath || 'translations';
if(param.firstFile && param.secondFile){
  fs.readFile(param.firstFile, 'utf8', function (err,firstFile) {
      fs.readFile(param.secondFile, 'utf8', function (err,secondFile) {
          var firstContent = JSON.parse(firstFile);
          var cecondContent = JSON.parse(secondFile);
          var tempObject = {};
          var sorted = {};
          Object.keys(firstContent[param.objectPath]).forEach(key=>{
            tempObject[key] = firstContent[param.objectPath][key];
          });
          Object.keys(cecondContent[param.objectPath]).forEach(key=>{
            if(param.forceFirstFile){
              if(tempObject[key]){
                tempObject[key] = cecondContent[param.objectPath][key];
              }
            }else{
              tempObject[key] = cecondContent[param.objectPath][key];
            }
          });
          Object.keys(tempObject).sort().forEach(key=>{
              sorted[key] = tempObject[key];
          });
          cecondContent[param.objectPath] = sorted;

          if (err) {
              return console.log(err);
          }
          const resultFile = param.resultFile || "result.json";
          fs.writeFile(resultFile, JSON.stringify(cecondContent, null, 2), 'utf8', function (err) {
          if (err) return console.log(err);
          });
      })
  })
}else{
  console.log("You have to define the first and second file path!")
}

// }

function getPathArgument(){
    var result = {};
    process.argv.forEach((p)=>{
        console.log("p=",p);
      if(p.indexOf("--firstFile") > -1){
        result["firstFile"] = p.replace(/--firstFile=/,"");
      };
      if(p.indexOf("--secondFile") > -1){
        result["secondFile"] = p.replace(/--secondFile=/,"");
      }
      if(p.indexOf("--resultFile") > -1){
        result["resultFile"] = p.replace(/--resultFile=/,"");
      }
      if(p.indexOf("--objectPath") > -1){
        result["objectPath"] = p.replace(/--objectPath=/,"");
      }
      if(p.indexOf("--forceFirstFile") > -1){
        result["forceFirstFile"] = p.replace(/--forceFirstFile=/,"");
      }
    })
    console.log("result",result);
    return result;
}