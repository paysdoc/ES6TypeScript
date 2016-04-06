/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
angular.module('qApp', ['fakeBackend', 'ngRoute']);
/**
    When using classes for Controllers don't forget to add a static $inject variable for dependency injection.

    export default class HomeCtrl{
        static $inject:[string] = ['$location', 'UserService'];

        constructor($location:ng.ILocationService, UserService:UserService) {}
    }

    Use controllerAs syntax for controllers
 */