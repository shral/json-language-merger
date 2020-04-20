#!/usr/bin/env node

/**
 * @author Shefki Esadi <shralsheki@gmail.com>
 * @since 15.04.2020
 */

var fs = require('fs');
var process = require("process");

var workingPath = getPathArgument();
workingPath.objectPath = workingPath.objectPath || 'translations';

fs.readFile(workingPath.firstFile, 'utf8', function (err,firstFile) {
    fs.readFile(workingPath.secondFile, 'utf8', function (err,secondFile) {
        var firstContent = JSON.parse(firstFile);
        var cecondContent = JSON.parse(secondFile);
        var tempObject = {};
        var sorted = {};
        Object.keys(firstContent[workingPath.objectPath]).forEach(key=>{
          tempObject[key] = firstContent[workingPath.objectPath][key];
        });
        Object.keys(cecondContent[workingPath.objectPath]).forEach(key=>{
          tempObject[key] = cecondContent[workingPath.objectPath][key];
        });
        Object.keys(tempObject).sort().forEach(key=>{
            sorted[key] = tempObject[key];
        });
        cecondContent[workingPath.objectPath] = sorted;

        if (err) {
            return console.log(err);
        }
        const resultFile = workingPath.resultFile || "result.json";
        fs.writeFile(resultFile, JSON.stringify(cecondContent, null, 2), 'utf8', function (err) {
        if (err) return console.log(err);
        });
    })
})

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
    })
    console.log("result",result);
    return result;
}