#!/usr/bin/env node

const toMongo = require('./models/toMongoClass');
const superagent = require('superagent');
const url = 'https://at-note.herokuapp.com/api/notes';
const env = process.env.USER;

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
    .send(mongoObject)
    .then((res) => {
      console.log(res.body._id);
      if (!res) {
        console.log('DID NOT SAVE');
      }
    })
    .catch(console.log('newStuff Error'));
}


//router.get('/api/notes/:key/:value', getAllNotes);
//router.get('/api/notes/tags/<tag variable>', getAllNotes);
//router.get('/api/notes/user/<user variable>', getAllNotes);
//url+'/user/janderson'
//https://at-note.herokuapp.com/api/notes


function get(arr) {
  let mongoObject = formatObject(arr);
  console.log(mongoObject);
  let concatUrl = url;
    if(arr[0]) {
      arr[0].slice(1);
      concatUrl += `/tags/${arr[0]}`;
    } else {
      concatUrl += `/user/${env}`;
    }

  return superagent
    .get(concatUrl)
    .then(res => {
      console.log(res.body.results);
      if (!res) {
        console.log('DID NOT SAVE');
      }
    })
    .catch(console.log('Get error'));
}
function date() {}

//router.get('/api/notes/:key/:value', getAllNotes);
function last(arr) {
  let mongoObject = formatObject(arr);
  console.log(mongoObject);

  return superagent
    .post(url) //add to url the key of user, and the value of saved id.
    .send(mongoObject)
    .then((res) => {
      console.log(res.body._id);
      if (!res) {
        console.log('DID NOT SAVE');
      }
    })
    .catch(console.log('newStuff Error'));
}

function today() {}

function deleteStuff(arr) {
  let mongoObject = formatObject(arr);
  console.log(mongoObject);
  let concatUrl = url;
    if(arr[0]) {
      arr[0].slice(1);
      concatUrl += `/tags/${arr[0]}`;
    } else {
      concatUrl += `/user/${env}`;
    }
console.log(concatUrl);
  return superagent
    .delete(concatUrl)
    .then(res => {
      console.log(res.body);
      if (!res) {
        console.log('DID NOT SAVE');
      }
    })
    .catch(console.log('Get error'));
}

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
*/