#!/usr/bin/env node

//--------------------- DEPENDANCIES ---------------------\\
const toMongo = require('./models/toMongoClass');
const superagent = require('superagent');
const url = 'https://at-note.herokuapp.com/api/notes';
const env = process.env.USER;
const writeFile = require('./models/edit-json.js');
const outputParser = require('./modules/outputParser.js');
const parseGet = outputParser.parseGet;
const parseDelete = outputParser.parseDelete;
//--------------------------------------------------------\\

const storage = require('./models/presistant');

let argv = process.argv.slice(2);
let commandsSet = new Set([]);

// command object that holds available commands
let commands = {
  '@new': newStuff,
  '@showall': showall,
  '@showlast': showlast,
  '@show': show,
  '@date': date,
  '@delete': deleteStuff,
  '@deleteall': deleteall,
  '--help': help,
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
/**
 *
 * Function that takes in an array and formats
 * it into a JSON object. Executes a superagent call
 * and will to post object to mongo database. 
 * @param {Array} arr Array of user input from CLI
 * @returns JSON object and 200 status code 
 */
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

/**
 *
 *Function that takes in an array and formats
 * it into a JSON object. Executes a superagent call 
 * and will post object to mongo. This is going to show you all
 * off the notes that you have created.
 * @param {Array} arr Array of user input from CLI
 * @returns JSON object and 200 status code 
 */
function showall(arr) { 
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

/**
 *
 * Function that takes in an array and formats
 * it into a JSON object. Executes a superagent call
 * and will post object to mongo. This is going to allow 
 * you to view the last note that you have saved.
 * @param {Array} arr Array of user input from CLI
 * @returns JSON object and 200 status code 
 */
function showlast(arr) {
  let mongoObject = formatObject(arr);
  //console.log(mongoObject);
  let newUrl = 'https://at-note.herokuapp.com/api/notes/_id' +  `/${storage[0]}`;
  // console.log(newUrl);
      
  return superagent
    .get(newUrl)
    .send(mongoObject)
    .then((res) => {
      parseGet(res.body.results)
      // console.log(res.body.results)
      if (!res) {
        console.log('DID NOT SAVE');
      }
    })
    .catch();
}

/**
 *
 * Function that takes in an array and formats
 * it into a JSON object. Checks to see if you have 
 * notes saved, if no then it will show you the last note
 * else it will show you all of your notes. 
 * @param {Array} arr Array of user input from CLI
 */
function show(arr) { 
  let mongoObject = formatObject(arr);
  let concatUrl = url;
  //if argv empty then show last note 
  // console.log(arr);
  if(arr.length === 0){
    showlast(arr);
  } else {
    showall(arr);
  }
}

/**
 *
 * Function that takes in an array and formats 
 * it into a JSON object. Executes a superagent call
 * and will post object to mongo. This allows you to 
 * delete the last not that yoou had saved. Or if you 
 * include a tag it will delete all notes that contian that tag.
 * @param {Array} arr Array of user input from CLI
 * @returns JSON object and 200 status code 
 */
function deleteStuff(arr) {
  let mongoObject = formatObject(arr);
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

/**
 *
 * Function that takes in array and formats
 * it into a JSON object. Executes a superagent call
 * and will post object to mongo. This will allow you 
 * to competely clear out your notes by deleting them all. 
 * @param {Array} arr Array of user input from CLI
 * @returns JSON object and 200 status code
 */
function deleteall(arr) {
  let mongoObject = formatObject(arr);
  let concatUrl = url;
  concatUrl += `/user/${env}`;
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

/**
 *
 * Function that takes in array and formats
 * it into and JSON object. Executes a superagent call
 * and will post object to mongo. This allows you to 
 * insert a specifc date so you are able to view notes
 * taken on that date. 
 * @param {Array} arr Array of user input from CLI
 * @returns JSON objcet and 200 status code
 */
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

/**
 * 
 * Function that helps you view 
 * commands that are available within
 * the package. 
 */
function help() {
  let helpString = `
                    @note will start your npm package
                    @note @new 'your note' 
                    @note @showall
                    @note @showlast
                    @note @show <tag>
                    @note @date mm-dd-yyyy
                    @note @delete <tag>
                    @note @deleteall
                    @note @delete`;

  let textObj = [{ tags: [],
  _id: '',
  note: helpString,
  user: '',
  __v: 0 }];
  parseGet(textObj);
}

//--------------------- HELPERS ---------------------\\

// makes sure the first index of argv is a commmand
/**
 *
 * Function is used to format the arr into 
 * a JSON object. Create a set that will be 
 * the tags set in your notes. 
 * @param {Array} arr Array of user input from CLI
 * @returns string with tags 
 */
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
/**
 *
 * Function that takes in an array and a set. 
 * Checking for the @ and recoginize 
 * it as a tag and include it in the set of all 
 * notes that include that tag. 
 * @param {Array} arr Array of user input from CLI
 * @param {Set} set Set of tags of user input from CLI
 */
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
/**
 *
 * Function that takes in an array and will 
 * convert an argument into a string. This is 
 * going to remove all @ 
 * @param {Array} arr Array of user input from CLI
 * @returns string
 */
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
/**
 *
 * Function that will take in a date and then
 * format it into the required format specified.
 * @returns the date in the correct format 
 */
function timeStamp() {
  let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  let currentDate = new Date();
  let date = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();

  return `${months[month]}-${date}-${year}`;
}