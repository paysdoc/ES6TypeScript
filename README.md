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
```
Take a look inside the gulpfile.js file at the 'ts-compile' task that takes care of the transpilation process.
This tasks defines the sources files, pipes it through 'gulp-typescript' and places inside the distribution folder.
```

###Assignment 2 System.js
Currently nothing is happening in our project. Inside the app.ts file is an alert saying everything worked out.
To get this alert to show up we have to tell System.js to start importing the transpiled files. We only have to
tell System.js the entry point of our application. After this System.js can import other files through imports in
the app.ts file.
```
Add the following piece of code to index.html AFTER the lib script tags. If you've done it correctly, an alert will pop up in the
browser which means that we're done with setting up System.js.
```

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
```javascript
class Example {
    value = 123;
    //...
}
```

```
Create a new directory called 'models' inside the /app/src/ directory and fill it with a person.ts file.
Create a Person class inside the person.ts file with the following variables:
- firstName
- lastName
- id
```
_This person file WILL be transpiled by gulp-typescript to js, but WILL NOT be included in the browser._

###Assignment 2 Importing/Exporting
####Regular import/export (0..n per file)
```javascript
export class Example {
    //...
}
```
System.js is currently unaware of person.ts's existence because none of its files (app.ts) is importing it.
Before person.ts can be imported it has to expose something to the outside world.
```
Export the person by inserting the 'export' keyword in front of the 'class' keyword.
Now person.ts exposes a person class ready to be imported by some other file.

When in app.ts, type Person and let autocompletion do the importing for you.
```
_If your IDE does not support this feature, you have to manually import it. The import paths are relative to the
location of the file that is doing the import._
```javascript
import {Person} from './models/person'; // './' is very important
import {Person as P} from './models/person'; // also possible
```

####Default import/export (0..1 per file)
```javascript
export default class Example {
    //...
}
```
Default exports are imported differently than regular imports. Since there is only one default export per file 
(if you define multiple, only the last will exported) the name doesn't matter.
```javascript
import Example from './example'; //<- Works
import RandomName from './example'; //<- Works
import {default as RandomName} from './example'; //<- Works
import RandomName, {Other} from './example'; //<- Works (let's assume Other is an exported class)
```

###Assignment 3 Playing with transpiling.
Now that we have 2 interacting files, we're going to have a look at the different possible outputs of the transpiling process.
process. 
```
Take a look at tsconfig's 'target' and 'module' attributes and check the dist folder javascript files content. 
Change the target and/or module attributes and reset the gulp task to see the different ways of transpiling.
- target: es5 || es6 (output js version)
- module: commonjs || amd || system 
```

###Assignment 4 Playing with new ES6 Features.
####Constructors
```javascript
class Example {
    foo;
    constructor(foo){
        this.foo = foo;
    }
}
let example = new Example('value');
```

```
Append the Person's constructor with 2 parameters, firstName and lastName.
Let the constructor set its own values. Create a few persons with different names and log them.
```

####Class methods + custom interpolation.
```javascript
class Example {
    constructor() {}
    foo() {
        return 'example';
    }
}
let example = new Example('value');
example.foo();
```

Let's create a toString method inside the person class that returns its first and last name.
In stead of appending some strings to each other, we want to use the new interpolation that uses `.
Inside these symbols we can put strings and values.

```javascript
var exampleText = 'someText';
var interpolation = `exampleText = ${exampleText}`;
```

####Default params.
Give the person a greet method that expects a name and will console 'Hello ${name}!'.
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
Create a greetMany method that will iterate through a list of people and greet them by name.
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
A completely new feature of ES6 is the generator method. Basically it's a method that can keep track of its own 
state. Create an id generator inside person.ts (above the Person class) and let it set the id of the person in its constructor.
Notice the * right after the method keyword, no this is not a typo.
```javascript
function* IdGenerator(){
    var index = 0;
    while(true)
        yield index++;
}
var idGen = IdGenerator();
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
The first thing we can do is adding types to all variables and methods (return types) inside Person, [here](https://www.typescriptlang.org/docs/handbook/basic-types.html) is a link with some basic types.
After this is done, create a new person with a variable and check your IDE's auto completion. Now we know exactly
what's expected and get compile errors if we put in the wrong values.
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

For the rest of the workshop, think about your Class variables/methods visibilities (public/private/protected). This will help
to optimise your auto completion and code structure.

####public

Public exposes instance members to the outside.
This means that these variables and methods can be accessed by other code.

```javascript
class Example {
    public foo:string;
    //foo:string; //same
}
let example = new Example();
example.foo //ok
example.foo = 'something'; //ok
```

####private

```javascript
class Example {
    private foo:string;
}
let example = new Example();
example.foo //error
example.foo = 'something'; //error
```

In Java it's considered a good practice to make every single variable private and accessible through getters and setters.
In JavaScript this is also possible.
```javascript
class Example {
    private _foo; //The underscore is there to prevent namecollision with the get/set method name.
    get foo() {
        return _foo;
    }
    set foo(foo) {
        this._foo = foo;
    }
}
```

```
Make the id in Person private and rename it to _id. Inside the constructor set _id to the next value of 
the IdGenerator. Add a get method id that returns the _id. A set id method is unnecassary because we don't
want to let the outside world mess with the id.

Print the id of an instantiated Person and try to set its id.
```

####protected

Protected variables/methods are private to the outside world, but can be called/modified by the instance itself or its subclasses.
So imagine that all people can ask questions, meaning only they can take initiative to ask something. A protected method 'ask' would be
the solution. Person will be able to ask a question just like every subclass (Client in this case).
Implement a protected 'ask' method that consoles a question and call it (from within the instance).

##Assignment 3 Abstract
###classes
```javascript
abstract class Example {
    
}
new Example() //error
```
Person is a very generic class and term. In applications we never talk about a person, we rather talk about clients, employees and
admins. Those types of people have something in common, they're people. We want to define a person, but never instantiate it 
because it only serves as a super class to other types of people.
```
Remove all Person instantiations and make Person abstract by inserting the 'abstract' keyword 
before the 'class' keyword. Don't forget to move the _id generator out of the constructor 
because abstract classes can't have constructors here. (It is possible to instantiate an 
abstract class if it has a constructor, this is probably a bug?).
```
###methods
```javascript
abstract class Example {
    abstract foo();
}
class NotAbstractClass extends Example { //error must implement a foo function.
    
}
```
Abstract methods are methods without a body that MUST be implemented by the subclass of the abstract class.
```
Since a Person will never have to greet another person, remove the body and add the 'abstract' 
keyword in front of it. The Typescript compiler should complain about the Client class for not
having a greet method.
```
##Assignment 4 interfaces
Interfaces serve multiple purposes in Typescript. As the Java equivalent of interfaces and 
(as you'll see in the next assignment) as a type.

```
Create a Dog class. We don't really need to implement it, we just need a different type of class.
When comparing a dog and a client, we can conlcude that they both are able to walk. This resemblence
is nog big enough to create a common superclass and can be solved by an interfcace. Create an interface
called IWalk that implements a walk():void method. Let the Client and Dog implement the IWalk interface.
Now it's possible to create a method that expects something that can walk and accepts a Client and a Dog
even though they are different classes.
```

##Assignment 5 Custom types
```
class Example {
    foo(item: {index:number, name: string}):void {}
}
```
While working in JavaScript you don't always want to make a class for passing some set of variables to a method.
In Typescript it's possible to easily overcome this issue by specifying constructed parameter types inline.
```
Create a method with inline variaties of types.
```
Nobody likes duplicated code, so when you notice that a custom inline type is being reused, a simple solution would be
defining an interface with those properties. This interface will not necessarily be implemented by a class because it 
serves as a type.
```
Replace the previously created inline custom type with an interface type.
```

##Assignment 6 Decorators
Decorators are like annotations and can be used to add meta data or behaviour to classes, methods, params and variables.
###Class decorators
<<Decorate a class so it gets registered with extra data Angular 2's @Component equivalent>>

###Method decorators
```javascript
function MyDecorator (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) { }
class Example {
    @MyDecorator
    foo() { }
}

function MyDecorator (value:string) {
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) { }
}
class Example {
    @MyDecorator('someValue')
    foo() { }
}
```
Method decorators can for example intercept behaviour and register calls.

```
To find out how a method decorator works, copy the following code snippet and decorate a
method of the Client. Call the decorated method, check the console and browse through the decorator 
to get an idea of what's happening.
```

```javascript
function LogInAndOut (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    let className = target.constructor.name;
    //methodName == propertyKey;
    console.debug(`${className}.${propertyKey} is called`);

    var originalMethod = descriptor.value;
    descriptor.value = function (...args:any[]) {
        //before method call
        console.debug("The method args are: " + JSON.stringify(args));
        var result = originalMethod.apply(this, args);
        //after method call
        console.debug("The return value is: " + result);
        return result;
    };
    return descriptor;
}
```
###Param decorators
<<Decorate a param so it prints>>

##Assignment 7 Existing JavaScript (declaration files .d.ts)
If you have written a gigantic JavaScript library, you really don't want to rewrite the thing in TypeScript.
That's why declaration files exist.
```
Copy the following code snippet and past it into a JavaScript file (client.service.js) and add a script tag 
to the index.html. This file represents a piece of JavaScript that we don't want to rewrite in TypeScript 
(imagine it's from your library). The JS code is loaded, but your Typescript files will not know of its
existence.
```

```javascript
function ClientService() {
    this.all = [];
    this.getAll = function() {
        return this.all;
    };
    this.getById = function (id) {
        for(var i = 0;i < this.all.length; i++) {
            if(this.all[i].id == id) {
                return this.all[i];
            }
        }
        return null;
    };
    this.add = function (client) {
        this.all.push(client)
    };
    this.delete = function (id) {
        for(var i = 0;i < this.all.length; i++) {
            if(this.all[i].id == id) {
                this.all.splice(i, 1);
                break;
            }
        }
    };
}
```

```
Create a ClientService declaration file (client.service.d.ts). Inside this file create an interface that
contains all values and methods (including proper types) of the JS ClientService. After this is done, we
have to declare the function so Typescript will know it exists. Now we use external JavaScript code inside
the Typescript scope.
```

```javascript
declare function ClientService():void;

// Usually your application should create a reference to the declaration file, but it seems to work
// without it (Webstorm 11).
/// <references path="./client.service.d.ts" />
```