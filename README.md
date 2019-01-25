## AtNote

### Authors & Acknowledgements: Siobhan Niess, Jonathan DiQuattro, Brent Woodward, and Jacob Anderson

### About the AtNote
This was a npm package that was created to help users take notes while they are in their termial and writing code as well. Users are able to quickly takes notes as they 

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
    * This writes a file 
#### `stash.js`
    * This holds the username 
#### `toMongoClass.js`
    * This 
#### `app.js`
    * This holds the functionality of each of the commands
#### `outputParser.js`
    * This 

##### Exported Values and Methods
### Dependencies

#### Running the app
* Start by downloading the npm package: `npm i -g atnote`
* In your command line run: `@note`
    * This is going to start the package
* Follow the above feature commands to start your note taking
  
#### Tests
* How do you run tests?
    * run the command `npm test` in your terminal 
* What assertions were made?
    *
* What assertions need to be / should be made?
    *