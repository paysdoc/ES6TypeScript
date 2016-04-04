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
