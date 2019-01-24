#!/usr/bin/env node

//--------------------- DEPENDANCIES ---------------------\\
const toMongo = require('./models/toMongoClass');
const superagent = require('superagent');
const url = 'https://at-note.herokuapp.com/api/notes';
const env = process.env.USER;
const writeFile = require('./models/edit-json.js');
const outputParser = require('./outputParser');
const parseGet = outputParser.parseGet;
const parseDelete = outputParser.parseDelete;
//--------------------------------------------------------\\

const storage = require('./models/presistant');

let argv = process.argv.slice(2);
let commandsSet = new Set([]);

// command object that holds available commands
let commands = {
  '@new': newStuff,
  '@show': get,
  '@date': date,
  '@last': last,
  '@today': today,
  '@yesterday': yesterday,
  '@delete': deleteStuff,
  '@help': help,
};

// add commands to the command set
for (let key in commands) {
  commandsSet.add(key);
}

// check the command object for a match
if (commands.hasOwnProperty(argv[0])) {
  // searches commands object for a tag
  commands[argv[0]](argv.slice(1));
} else {
  console.log('not a command');
}

//--------------------- COMMAND FUNCTIONS ---------------------\\
function newStuff(arr) {
  let mongoObject = formatObject(arr);
  // console.log(mongoObject);

  return superagent
    .post(url)
    .send(mongoObject)
    .then((res) => {
      let body = [res.body._id];
      writeFile(body);
      if (!res) {
        console.log('Note did NOT save');
      }
    })
    .catch();
}

function get(arr) { 
  let mongoObject = formatObject(arr);
  let concatUrl = url;
  if(arr[0]) {
    arr[0].slice(1);
    concatUrl += `/tags/${process.env.USER}*${arr[0]}`;
  } else {
    concatUrl += `/user/${env}`;
  }

  return superagent
    .get(concatUrl)
    .then(res => {
      parseGet(res.body.results);
      if (!res) {
        console.log('Note did NOTE save');
      }
    })
    .catch();
}

function last(arr) {
  let mongoObject = formatObject(arr);
  //console.log(mongoObject);

  return superagent
    .post(url)
    .send(mongoObject)
    .then((res) => {
      parseGet(res.body.results)
      if (!res) {
        console.log('DID NOT SAVE');
      }
    })
    .catch();
}

function deleteStuff(arr) {
  let mongoObject = formatObject(arr);
  //console.log(mongoObject);

  //if arr has length delete tag else delete last
  if(arr.length > 0) {
    let concatUrl = url;
    if(arr[0]) {
      arr[0].slice(1);
      concatUrl += `/tags/${process.env.USER}*${arr[0]}`;
    } else {
      concatUrl += `/user/${env}`;
    }
    
    return superagent
      .delete(concatUrl)
      .then(res => {
        parseDelete(res.body.n);
        if (!res) {
          console.log('DID NOT SAVE');
        }
      })
      .catch();
  }
  else {
    let concatUrl = url;
    if(!arr[0]) {
      concatUrl += `/_id/${storage[0]}`;
    } else {
      concatUrl += `/user/${env}`;
    }
    
    return superagent
      .delete(concatUrl)
      .then(res => {
        parseDelete(res.body.n);
        if (!res) {
          console.log('DID NOT SAVE');
        }
      })
      .catch();
  }
} 

function date(arr) {
  let mongoObject = formatObject(arr);
  let concatUrl = url;
  if(arr[0]) {
    arr[0].slice(1);
    concatUrl += `/tags/${process.env.USER}*${arr[0]}`;
  } else {
    concatUrl += `/user/${env}`;
  }

  return superagent
    .get(concatUrl)
    .then(res => {
      parseGet(res.body.results);
      if (!res) {
        console.log('Note did note save');
      }
    })
    .catch();
}

function today() {
  
}

function yesterday() {

}

function help() {}

//--------------------- HELPERS ---------------------\\

// makes sure the first index of argv is a commmand
function formatObject(arr) {
  let tagSet = new Set();
  //add adte to the tag set

  tagSet.add(process.env.USER + '*' +timeStamp());
  // adds tags to set from an array
  addTagsToSet(arr, tagSet);
  let str = argvToString(arr);
  // takes in a string
  return new toMongo(tagSet, str);
}

// adds tags to set
function addTagsToSet(arr, set) {
  arr.forEach(word => {
    // check if word has @ sign and is in command set
    if (word[0] === '@') {
      // checking if word is a reserve word
      if (!commandsSet.has(word)) {
        let addWord = process.env.USER + '*' +word.slice(1);
        set.add(addWord);
      }
    }
  });
}

// turns argv array into a string
function argvToString(arr) {
  // strip @ signs
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === '@') {
      arr[i] = arr[i].slice(1);
    }
  }
  return arr.join(' ');
}

//getting by date
function timeStamp() {
  let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  let currentDate = new Date();
  let date = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();

  return `${months[month]}-${date}-${year}`;
}