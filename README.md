## AtNote

### Authors & Acknowledgements: Siobhan Niess, Jonathan DiQuattro, Brent Woodward, and Jacob Anderson

### About the AtNote
This was a npm package that was created to help users take notes while they are in their termial with ease. Allows users to multitask between note taking and writing code in a non-intrustive process. This si also customizable for each user.

### Download & Installation
* `npm i -g atnote`

### Features
* `@note` -This is going to the first command that you are going to run in your terminal after oyu have successfully downloaded the npm package.
* `@note @new 'your note'` -This is going to be the command that you are going to runin your terminal when you want to create a new note and have it saved.
* `@note @showall` -This is the command that you are going to want to run in your terminal when you are wanting too view all of the notes that you have saved.
* `@note @showlast` -This is the command that you are going to want to run in your terminal when you are wanting to view the last note that you have saved.
* `@note @show <tag>` -This is the command that you are going to want to run in your terminal when you are wanting to view all notes that are attached to that specific tag.
* `@note @show` -With this command if you run in it in your terminal it will defualt to showing you the last note that you saved.
* `@note @date mm-dd-yyyy` -This is the command that you are going to want to run in your teminal if you are wanting to view your notes that you had save on that specific date.
* `@node @delete <tag>` -This is the command that you are going to want to run in your terminal if you are wanting to delete all notes that are attached to that specific tag.
* `@note @deleteall` -This is the command that you are going to want to run in your terminal if you are wanting to completely delete all of the notes that you have saved.
* `@note @delete` -This is the command that you are going to want to run in your terminal if you ware wanting to delete the last note that you have saved. This also help to prevent you from accidentally deleting all of your notes.

### List of Features
`@note` 
`@note @new 'your note'` 
`@note @showall`
`@note @showlast`
`@note @show <tag>`
`@note @date mm-dd-yyyy`
`@note @delete <tag>`
`@note @deleteall`
`@note @delete`

### Links and Resources
* [repo](https://github.com/AtNote/clientAtNote)
* [travis]()
* [server]()

#### Documentation
* [jsdoc](https://at-note.herokuapp.com/clientdocs/)

### License
    * MIT

### Modules
#### `edit-json.js`
    * This writes a file and takes in a new Set that turns it into an array. Also to establish a file path that was going to work on everyones computer.  
#### `stash.js`
    * This writes to the file after the last `note` was made and saves the id connected with it. This makes it so you are able to pull down the last `note` that you made. 
#### `toMongoClass.js`
    * This is the Mongo Schema that creates an instance of the class and holds new objects that will be used tjroughout the code base.
#### `app.js`
    * This holds the functionality of each of the commands and all of the helper functions connected with the base functions. 
#### `outputParser.js`
    * This formats the output to the console, separates the `@` from the tags, and adds in the colors that you will see as you use this package.

### Dependencies
* Dotenv
* Superagent

#### Running the app
* Start by downloading the npm package: `npm i -g atnote`
* In your command line run: `@note`
    * This is going to start the package
* Follow the above feature commands to start your note taking
  
#### Tests
* How do you run tests?
    * run the command `npm test` in your terminal 
* What assertions were made?
    * timeStamp functon
        * check to see if it would return the current date and that it would match the required format
    * argvToString function
        * check to see if it would return a string from an array 
        * check if it would remove the `@` from each index in the array
        * return the string without the `@`
    * addTextToSet fucntion
        * check to see if it would return an object with the `note` property
* What assertions need to be / should be made?
    * To test all of the promises