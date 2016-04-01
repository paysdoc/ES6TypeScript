/// <reference path="../typings/angularjs/angular.d.ts" />

import IModule = angular.IModule;
import {Test2Ctrl} from "./controllers/Test2";

var myApp:IModule = angular.module('qApp', ['fakeBackend']);
myApp.controller('Test2Ctrl', Test2Ctrl);
