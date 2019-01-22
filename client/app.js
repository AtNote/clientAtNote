'use strict';

const toMongo = require('../models/toMongoClass');
const superagent = require('superagent');
const url = 'https://at-note.herokuapp.com/api/notes';

let argv = process.argv.slice(2);

let commandsSet = new Set([]);

//command object that holds available commands
let commands = {
  '@new': newStuff,
  '@get': get,
  '@date': date,
  '@last': last,
  '@today': today,
  '@delete': deleteStuff,
  '@quit': quit,
  '@secret': secret,
  '@copy': copy,
  '@help': help,
};
//add commands to the command set
for (let key in commands) {
  commandsSet.add(key);
}
// checking the command object for a match

if (commands.hasOwnProperty(argv[0])) {
  //searches commands object for a tag
  commands[argv[0]](argv.slice(1));
} else {
  console.log('not a command');
}
//
function newStuff(arr) {
  let mongoObject = formatObject(arr);
  console.log(mongoObject);

  return superagent
    .post(url)
    .send(mongoObject) //mongoObject
    .then((res) => {
      if (!res) {
        console.log('DID NOT SAVE');
      }
    })
    .catch(console.log('newStuff Error'));
}

function get(arr) {
  let mongoObject = formatObject(arr);
  console.log(mongoObject);

  return superagent
    .get(url)
    .query(mongoObject) //mongoObject
    .then(res => {
      if (!res) {
        console.log('DID NOT SAVE');
      }
    })
    .catch(console.log('Get error'));
}
function date() {}
function last() {}
function today() {}
function deleteStuff() {}
function quit() {}
function secret() {}
function copy() {}
function help(str) {
  // console.log(str)
}

//--------------------- HELPERS ---------------------\\

// makes sure the first index of argv is a commmand
function formatObject(arr) {
  let tagSet = new Set();
  //adds tags to set from an array
  addTagsToSet(arr, tagSet);
  let str = argvToString(arr);
  //takes in a string
  return new toMongo(tagSet, str);
}

//adds tags to set
function addTagsToSet(arr, set) {
  arr.forEach(word => {
    //chack if word has @ sign and is in command set
    if (word[0] === '@') {
      //checking if word is a reserve word
      if (!commandsSet.has(word)) {
        set.add(word.slice(1));
      }
    }
  });
}

//turns argv array into a string
function argvToString(arr) {
  //strip @ signs
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === '@') {
      arr[i] = arr[i].slice(1);
    }
  }
  return arr.join(' ');
}


/*
'{"note":"Hello","user":"Brent"}'

{
  tags: Set { 'science' },
  note: 'science hi brent and siob',
  user: 'janderson' }
*/

// function addTagsToArr(arr) {
//   let tagsArr = [];
//   arr.forEach(word => {
//     //chack if word has @ sign and is in command set
//     if (word[0] === '@') {
//       //checking if word is a reserve word
//       if (!commandsSet.has(word)) {
//         tagsArr.push(word.slice(1));
//       }
//     }
//   });
// }