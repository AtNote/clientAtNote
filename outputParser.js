'use strict';

function parseGet(arr) {
  let noteArr = [];
  let tagsArr = [];

  // formats object and stick the notes and tags into arrays
  arr.forEach(note => {
    noteArr.push(note.note);
    let tagString = '';
    note.tags.forEach(tag => { //each tag
      tagString += formatTags(tag);
    });
    tagsArr.push(tagString.slice(0, tagString.length-2)); //takes comma off last command
  });

  // defining colors
  let FgGreen = '\x1b[32m%s\x1b[0m';
  let FgYellow = '\x1b[33m%s\x1b[0m';
  let FgBlue = '\x1b[34m%s\x1b[0m';

  // prints arrays
  if (arr.length > 0){
    for (let i = 0; i < noteArr.length; i++) {
      console.log(noteArr[i]);
      console.log(FgGreen, tagsArr[i]);
    }
  } else {
    console.log('No notes found');
  }
}

//formatTags
function formatTags(string){
  let regx = /[^*]+./;
  string = string.replace(regx, '@');
  string += ', ';
  return string;
  //user*bananas => bananas

}

function parseDelete(numDeleted) {
  if (numDeleted > 1) {
    console.log(`${numDeleted} notes deleted`);
  } else if(numDeleted ===1 ) {
    console.log(`${numDeleted} note deleted`);
  } else {
    console.log('No notes deleted');
  }
}


module.exports = {parseGet, parseDelete};




