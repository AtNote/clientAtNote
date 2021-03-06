'use strict';
const fs = require('fs');

/**
 *
 * Function takes in a new set that is an 
 * array. Holds data that will go into 
 * file. 
 * @param {Set} newSet turns set into an array
 */
function writeFile(newSet) {
    let writeContent=`'use strict';
    let dataObject = ["${newSet}"];
    module.exports = dataObject; `

    /**
     *
     * Function runs within another function 
     * and takes in a string. Uses a buffer to
     * write to a file
     * @param {string} str
     * @returns the file that the buffer is writting to
     */
    function buffAppend(str){
        var buf = Buffer.alloc(str.length);
        buf.fill(str);
        return str;
    }

    fs.writeFile(`${__dirname}/stash.js`, buffAppend(writeContent), function (err) {

        if (err) throw err;
    })
} 

module.exports = writeFile;