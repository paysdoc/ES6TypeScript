# ES6 + Typescript Workshop
###Quintor
#####Rachèl Heimbach

##Install
Clone repo and execute the following command:
- npm install

##Run
The following command is given by the Angular getting started guide:
- npm run start (or "gulp build" if gulp is installed globally)

##Content
###gulpfile.js
This file compiles and copies all src files to the distribution folder.

###tsconfig.json
Options for the typescript compiler.

###/app
Contains all libs and source files.

####/libs
For this part only System.js is required.

###/dist (distribution) dir
Contains all libs and source files compiled and ready for use. (Will be deleted every time gulp builds!!!)

##Assignments setup
###Assignment 1 Gulp
Take a look inside the gulpfile.js file at the 'ts-compile' task that takes care of the transpilation process.
This tasks calls the 'gulp-typescript' plugin with the source files and tells the plugin to transpile
the code with the options specified in tsconfig.

###Assignment 2 System.js
Currently nothing is happening in our project. Inside the app.ts file is an alert saying everything worked out.
To get this alert to show up we have to tell System.js to start importing the transpiled files. We only have to
tell System.js the entry point of our application. After this System.js can import other files through imports in
the app.ts file.

Add this piece of code to index.html AFTER the lib script tags. If you've done it correctly, a alert will pop up in the
browser which means we're done with setting up System.js.
```html
<script>
  /**
   *  System.js will add a .js extension to every import.
   *  On compiletime the IDE can find the appropriate ts files (app folder).
   *  On runtime the files are transpiled to js (dist folder).
   */
  System.config({
      defaultJSExtensions: true
  });
  System.import('./app').catch(
      console.error.bind(console)
  );
</script>
```


##Assignments ES6
###Assignment 1 Classes
Create a new directory called 'models' inside the /app/src/ directory and fill it with a person.ts file.
Create a Person class inside the person.ts file. A person of this workshop has a firstName, lastName and id.

This person file WILL be transpiled to js by Gulp but WILL NOT be included (yet) inside the application.

```javascript
class ClassName {
    var1;
    var2;
    constructor() {
    
    }
}
```

###Assignment 2 Importing/Exporting
Remember how app.ts is the only file loaded in the browser so far? Now we want to include our person too.
Export the person by inserting the 'export' keyword in front of the 'class' keyword. Now person.ts exposes 
a person class to the outside world.

Inside our app.ts we can instantiate a new Person (var person = new Person()). Just type Person and you're IDE should recognize it and 
propose to import it. 

_If your IDE does not support this feature, you have to manually import it by importing the Person in brackets 
from the relative path of the location of the class (or just switch IDE's)._
```javascript
import {Person} from './models/person';
```

If everything compiles, try changing the Person export by inserting 'default' in between the 'export' and 'class'.
There can only be 1 default export per file (+ 0...n normal exports). Default exports will be imported by a keyword
without brackets (since there can only be 1 default, the assigned name doesn't matter).
```javascript
import Person from './models/person'; //<- Works
import RandomName from './models/person'; //<- Works
import {default as RandomName} from './models/person'; //<- Works
import RandomName, {OtherNormalExportedClasses} from './models/person'; //<- Works (if others are exported obviously)
```

###Assignment 3 Playing with transpiling.
Now that we have 2 interacting files, we're going to have a look at the different possible outputs by our transpiling 
process. Take a look at tsconfig's target and module attributes and check the dist folder javascript files. 
Change the target and module attributes and reset the gulp task to see the different javascript output.
- target: es5 || es6 (output js version)
- module: commonjs || amd || system 

Even tho the outputs look different, System.js is clever enough to interpret all of them.

###Assignment 4 Playing with new ES6 Features.
####Constructors
Append the Person's constructor with 2 parameters, firstName and lastName.
Let the constructor set its own values. Create a few persons with different names and console.log them.

####Class functions + custom interpolation.
Let's create a toString function inside the person class that returns its first and last name.
```javascript
class ClassName {
    fn() {
        return '';
    }
}
```

In stead of appending some strings to each other, we want to use the new interpolation that uses ` `.
Inside these `` we can put strings and values.
```javascript
var exampleText = 'someText';
var interpolation = `sd asd a`;
```