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
Options for the typescript compiler. Most important options for this workshop are:
- target: es5 || es6 (output js version)
- module: commonjs || amd || system 

###/app
Contains all libs and source files.

####/libs
For this part only System.js is required.

###/dist (distribution) dir
Contains all libs and source files compiled and ready for use. (Will be deleted every time gulp builds!!!)

##Assignments
###Assignment 1
Inside the gulpfile.js is a 'ts-compile' task that takes care of the transpilation to JS.
This tasks calls the 'gulp-typescript' plugin with the source files and tells the plugin to transpile
the code with the options specified in tsconfig.

###Assignment 2

```javascript
  /**
   *  System.js will add a .js extension to every import.
   *  On compiletime the IDE can find the appropriate ts files.
   *  On runtime the files are transpiled to js and used in the dist folder.
   */
  System.config({
      defaultJSExtensions: true
  });
  System.import('./app').catch(
      console.error.bind(console)
  );
```