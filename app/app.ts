/// <reference path="../typings/angularjs/angular.d.ts" />

export class Application {
    constructor() {
        angular.module('qApp', ['fakeBackend'])
        .config(function ($logProvider:ng.ILogProvider) {
            $logProvider.debugEnabled(false);
        })
        .run(TestHttp);
    }
}
class TestHttp {
    static $inject:[string] = ['$http'];
    constructor($http:ng.IHttpService) {
        $http.get('/clients').then((res:ng.IHttpPromiseCallbackArg<Client[]>) => {
            var clients:Client[] = res.data;
            console.log(clients);
        });
    }
}

class Client {
    firstName:string;
    lastName:string;
    id:number;
}
new Application();