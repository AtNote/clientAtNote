'use strict';

const toMongo = require('../models/toMongoClass');

let argv = process.argv.slice(2);


let commandsSet = new Set([])



//command object that holds available commands
let commands = {
    '@new': newStuff,
    '@date': date,
    '@last': last,
    '@today': today,
    '@delete': deleteStuff,
    '@quit': quit,
    '@secret': secret,
    '@copy': copy,
    '@help': help,

}
//add commands to the command set
for(let key in commands){
    commandsSet.add(key);
}
console.log(commandsSet);
// checking the command object for a match
argv.forEach( (idx)=>{

    if(commands.hasOwnProperty(idx)){
        commands[idx](argv);
    }
})

//helper function

//adds tags to set
function addTagsToSet(arr, set){

    // console.log('called from addtags', arr);
    arr.forEach( (word)=>{
        //chack if word has @ sign and is in command set
        if (word[0] ==='@'){
            //checking if word is a reserve word
            if(!(commandsSet.has(word))){
                set.add(word.slice(1));

            }
        }

    })

}


//turns argv array into a string
function argvToString(arr){
    //strip @ signs

for (let i = 0; i<arr.length; i++){
    if(arr[i][0]==='@'){
        arr[i] = arr[i].slice(1);
    }
}
    
    return arr.join(' ');
    
}


function newStuff(arr){

    let tagSet = new Set();
    let str =argvToString(arr);
   

   //adds tags to set from an array

    addTagsToSet(arr, tagSet);

    console.log(tagSet.size);
    //takes in a string
    let newMongo = new toMongo(tagSet,str );
    console.log(newMongo);
    
}

function date(){

}
function last(){

}
function today(){

}
function deleteStuff(){

}
function quit(){

}
function secret(){

}
function copy(){

}
function help(str){
    // console.log(str)

}