# ES6 + TypeScript Workshop
###Quintor
#####Rachèl Heimbach
This is an Angular 1 project setup for ES6 + TypeScript

##Content
#####tsconfig.json
Options for the TypeScript compiler.

#####/app/
Contains all libs and source files.

#####/dist/ (distribution) 
Contains all libs and source files compiled and ready for use. (Will be deleted every time gulp builds!!!)

##Install
Clone repo and execute the following command:
- npm install

## Tools
### Gulp
Gulp provides this project with browser-sync for faster development and makes sure everything in the app folder ends up in the dist folder.
### Tasks
##### gulp serve
Compiles TypeScript, copies all src files to dist, watches for every file change and starts browser-sync.

##### gulp serve-no-ts
This task ignores TypeScript if you prefer your IDE compiling TypeScript. Gulp will copy the generated js files to the dist folder.

#### Run Gulp
##### IDE
If your IDE supports Gulp, you can execute commands from there.

In Webstorm: right click gulpfile.js -> Show Gulp Tasks.

##### Terminal/nodejs/cmd
Make sure gulp is globally install: 'npm install -g gulp'.

If you don't have gulp installed you can use npm: 'npm run gulp' || 'npm run gulp-no-ts'.

##### Alternative
If you're having difficulties with gulp you can let your IDE compile the files and serve the app folder in localhost.

## Assignment
Start creating your own Angular 1 app in ES6+TS.
Tips:
- There are declaration files included for the Angular API. This means there's a type and autocompletion for
every Angular method.
- The fakeBackend module provides a $httpBackend that mocks responses for if you want to test $http.
```
GET     /clients        | Returns all clients without additional information
GET     /clients/:id    | Returns one single client including additional information.
POST    /clients        | Creates a new client.
PUT     /clients/:id    | Updates existing client.
DELETE  /clients/:id    | Deletes existing client.
```