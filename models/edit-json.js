
'use strict';
const fs = require('fs');


//turns set into an array
let newSet = [1234,2324,234324,123,345];


//holds data that will go into file
let toFile =[];

for(let i =0; i<newSet.length; i++){
    toFile.push(`"${i}":"${newSet[i]}"`);

}

// let nameStr = `{${toFile}}`

let writeContent=`'use strict';
let dataObject ={${toFile}};
module.exports = dataObject; `

// console.log(writeContent)

function buffAppend(str){
    var buf = Buffer.alloc(str.length);
    buf.fill(str);
    return str;
}


fs.writeFile('./models/presistant.js', buffAppend(writeContent), function (err) {
    if (err) throw err;
  })

