/// <reference path="../typings/angularjs/angular.d.ts" />

//import {TestCtrl} from "./controllers/test";
//
//export class Application {
//    constructor() {
//        angular.module('qApp', ['fakeBackend'])
//        .config(function ($logProvider:ng.ILogProvider) {
//            $logProvider.debugEnabled(false);
//        })
//        .run(TestHttp)
//        .controller('TestCtrl', TestCtrl)
//    }
//}
//class TestHttp {
//    static $inject:[string] = ['$http'];
//    constructor($http:ng.IHttpService) {
//        $http.get('/clients').then((res:ng.IHttpPromiseCallbackArg<Client[]>) => {
//            var clients:Client[] = res.data;
//            console.log(clients);
//        });
//    }
//}
//
//class Client {
//    firstName:string;
//    lastName:string;
//    id:number;
//}
//new Application();

import {Client} from "./models/client";
new Client("Hello", "World");