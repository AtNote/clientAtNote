'use strict';
const app = require('../app');

describe( 'app.js does way to much stuff', ()=>{

describe('time stamp does the following:',()=>{
    it('it should return the current date',()=>{

        let date = app.timeStamp();

        expect(date).toBeTruthy();
    })
    it('should match the mm-dd-yyyy format', ()=>{
        let d = new Date();
        let date = app.timeStamp();
        let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

        let dateString =d.toLocaleDateString();
        let convertMonth = parseInt(dateString[0]-1);
       
        dateString = dateString.slice(1);
        dateString =dateString.replace('/','-');
        dateString =dateString.replace('/','-');


        let month = months[convertMonth];

        dateString = `${month}${dateString}`;

        expect(date).toEqual(dateString);
        // console.log(dateString);


    })
})

describe('argvToString should take in an array and return a string', ()=>{

    it('should take in an array and return a string',()=>{
        let arr =['@command', '@tag', '@anothertag', 'here', 'is', 'some', 'stuff'];
        let result = app.argvToString(arr);
        
        expect(typeof(result)).toBe('string');

    })
    it('it should strip the "@" sign from each string in the array', ()=>{
        let arr =['@command', '@tag', '@anothertag', 'here', 'is', 'some', 'stuff'];
        let result = app.argvToString(arr);

        expect(result.split(' ')).toEqual( [ 'command', 'tag', 'anothertag', 'here', 'is', 'some', 'stuff' ]);

    })
    it('it should return a string version of the array without the "@" signs', ()=>{
        
        let arr =['@command', '@tag', '@anothertag', 'here', 'is', 'some', 'stuff'];
        let argV = app.argvToString(arr);

        expect(argV).toBe("command tag anothertag here is some stuff");

    })


})
describe('addTagsToSet should should add tags to a set',()=>{

it('should check for reserverd words', ()=>{
    let arr =['@command', '@tag', '@anothertag', 'here', 'is', 'some', 'stuff','@new', '@show', '@date', '@last', '@delete', '@help'];

    // let commandSet =Set (['@new', '@show', '@date', '@last', '@delete', '@help' ]);

    let set = new Set();
    let addTags = app.addTagsToSet(arr, set);
    expect(set).not.toContain(['@new', '@show', '@date', '@last', '@delete', '@help' ])


})
it('should populate a set with a a username salt if the word has an "@" and it isnt a reserved keyword', ()=>{
    let arr =['@command', '@tag', '@anothertag', 'here', 'is', 'some', 'stuff','@new', '@show', '@date', '@last', '@delete', '@help'];
    let set = new Set();
    let addTags = app.addTagsToSet(arr, set);
    expect(set.has("jonathan*command")).toBe(true);
    expect(set.has("jonathan*tag")).toBe(true);
    expect(set.has("jonathan*anothertag")).toBe(true);
})


})
describe('newStuff should take in an array and make a post to mongo', ()=>{
    it('should take in an array of strings and retrun a an object with a note property', ()=>{

        let arr =['@command', '@tag', '@anothertag', 'here', 'is', 'some', 'stuff'];

        let format = app.formatObject(arr);
        expect(format.note).toBeTruthy();
    })
})
})