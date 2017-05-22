#!/usr/bin/env node
const path = require('path');
const axios = require('axios');
const fileSize = require('fileSize');

packageJson = require(path.resolve("package.json"));
packageList = [];
console.log("Gathering packages...")
for (package in packageJson.dependencies) {
  packageList.push(package);
}
console.log(packageList);
let promiseArray = packageList.map(package => axios.get("https://cost-of-modules.herokuapp.com/package?name="+package))
axios.all(promiseArray)
  .then((results) => {
    let temp = results.map(r => r.data.size);
    var output = temp.reduce((a,b) => {
      return a + b;
    });
    console.log("Your total size of all your packages minified is: "+fileSize(output));
  })
  .catch(console.log)
