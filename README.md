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
gulpfile.js
This file compiles and copies all src files to the distribution folder.

tsconfig.json
Options for the typescript compiler.

/app
Contains all libs and source files.

/dist (distribution) dir
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
// class example
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
```javascript
class Example {
    foo;
    constructor(foo){
        this.foo = foo;//inside classes instance variables are accessed through 'this'.
    }
}
```

####Class functions + custom interpolation.
Let's create a toString function inside the person class that returns its first and last name.
```javascript
//class funtion with return example
class Example {
    exampleFn() {
        return 'example';
    }
}
```

In stead of appending some strings to each other, we want to use the new interpolation that uses `.
Inside these symbols we can put strings and values.

```javascript
var exampleText = 'someText';
var interpolation = `exampleText = ${exampleText}`;
```

####Default params.
Give the person a greet function that expects a name and will console 'Hello ${name}!'.
Imagine the person will say 'Hello nobody!' if we don't give it a name.
In stead of doing an undefined check we simply give the name param a default value of 'nobody'.
```javascript
//default param example
    (param = 1) {
        console.log(param) //1 if it's called without parameter.
    }
```

Sometimes we don't necessarily expect a parameter. Now we can use the optional parameter.

####Rest param.
Create a greetMany function that will iterate through a list of people and greet them by name.
Instead of expecting a list as param, we want to implement the rest param.

```javascript
//rest param example
function restExample(...params) {
    return params.length;
}
restExample(1); //1
restExample(1, 2, 3, 4) //4
```

####Generators.
A completely new feature of ES6 is the generator function. Basically it's a function that can keep track of its own 
state. Create an id generator inside person.ts (above the Person class) and let it set the id of the person in its constructor.
Notice the * right after the function keyword, no this is not a typo.
```javascript
function* idMaker(){
    var index = 0;
    while(true)
        yield index++;
}
var idGen = idMaker();
console.log(idGen.next().value); //0
console.log(idGen.next().value); //1
console.log(idGen.next().value); //2
```

####Let and const keyword.
"let is the new var" - [Is there any reason to use the “var” keyword in ES6?](http://programmers.stackexchange.com/questions/274342/is-there-any-reason-to-use-the-var-keyword-in-es6) 

The new 'let' keyword has solved the block scoping issues of var and is recommended for ES6.

Const is the new JS equivalent to Java's final.
```javascript
const wontChange = 'Test';
wontChange = 'OtherTest'; //error

const willChange = {content: 'Test'};
willChange.content = 'OtherTest'; //ok
willChange = {content: 'OtherTest'}; //error
```

###Assignment 5 Inheritance 
Create a new file called client.ts inside the models directory. Inside the file create a Client class that extends from Person.
For now the client also expects a firstName and lastName, but in stead of setting the values it'll pass it to the Person
through a super call. 
```javascript
class A {
    constructor() {
        this.id = 1;
    }
}
class B extends A {
    constructor() {
        super();
    }
}
```

##Assignments Typescript
IMPORTANT
From this moment onwards keep track of your nodejs/cmd/terminal where the gulp task is running.
Typescript errors won't always compile, this means the browser won't be updated as well!

###Assignment 1 Basic types
Take a look at the Person class. Even tho it's located inside a typescript file, we haven't touched any Typescript yet.
The first thing we can do is adding types to all variables and functions (return types) inside Person. [here](https://www.typescriptlang.org/docs/handbook/basic-types.html) is a link with some basic types.
After this is done, create a new person in a variable and check your IDE's auto completion. Suddenly we know exactly
what's expected and even get compiler errors if we put in the wrong values.
```javascript
class Example {
    text:string;
    constructor(text:string) {
        this.text = text;
    }
    getNumber():number {
        return 1;
    }
}
```

###Assignment 2 Access modifiers
In many other languages it's good practice to make every single variable private and accessible through getters and setters.
In JavaScript this isn't a common thing to do and feels very optional. Here follows an implementation that uses private instance members
in a different way.

Make the id in Person private and rename it to _id. Inside the constructor set _id to the generated id. Add a get method id
that returns the _id. We aren't creating a setter because we don't want to be able to change the generated id.

Print the id of an instantiated Person and try to set its id.
```javascript
class Example {
    private _myVar;
    get myVar() {
        return _myVar;
    }
    set myVar(myVar) {
        this._myVar = myVar;
    }
}
```

For the rest of the workshop, think about your Class variables/functions visibilities (public/private). This is also a handy tool
to optimise your auto completion.

##Assignment 3