alert('App.ts is transpiled and executed!');
//import Client from "./models/client";
//import ES5Example = MyLib.ES5Example;
//
//function* idMaker(){
//    var index = 0;
//    while(true)
//        yield index++;
//}
//var gen = idMaker();
//
////var example:ES5Example = new ES5Example();
////console.log(example.getRandomNumber());
////example.getRandomNumber();
//
//var role = 'user';
//function Secured(roleWithPermission:string = '*') {
//    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
//        var originalMethod = descriptor.value;
//        descriptor.value = function (...args:any[]) {
//            console.log('instance', args[0].role);
//            //console.log("The method args are: " + JSON.stringify(args));
//            if(roleWithPermission != '*' && roleWithPermission != role) return;
//            var result = originalMethod.apply(this, args);
//            //console.log("The return value is: " + result);
//            return result;
//        };
//        return descriptor;
//    };
//}
//
//function logParam(target: any, propertyKey: string | symbol, parameterIndex: number) {
//    console.log(target[propertyKey]);         // MyClass prototype
//    console.log(propertyKey);    // "myMethod"
//    console.log(parameterIndex); // 0
//}
//class Prof {
//    public role = 'user';
//}
//var prof = new Prof();
//console.log(prof instanceof Prof);
//class Service {
//    @Secured('admin')
//    testFunction(prof:Prof) {
//        console.log(`I'm called! ${prof}`);
//        alert(123);
//    }
//}
//new Service().testFunction(prof);
//
//const controllers = [];
//
//function Controller(param: any) {
//    return function(target: Function) {
//        controllers.push(target.name);
//    }
//}
//@Controller({
//    name: 'HomeCtrl'
//})
//class HomeCtrl {
//}
//
//console.log(controllers);
//
//var list = [{cb:null, id:1}, {cb:null, id:2}, {cb:null, id:3}];
//for(var i = 0; i < list.length; i++) {
//    var item = list[i];
//    item.cb = function () {
//        return item;
//    };
//    console.log(i);
//}
//for(var i = 0; i < list.length; i++) {
//    var item = list[i];
//    console.log(item.cb());
////}
//export default class Client{
//    firstName;
//    lastName;
//    id;
//    constructor() {
//
//    }
//}
//declare module MyLib {
//    export interface ES5Example {
//        title:string;
//        getRandomNumber(): () => number;
//    }
//}
//function ES5Example() {
//    this.title = "Hello World";
//    this.getRandomNumber = function () {
//        return Math.random() * 100;
//    }
//}
//var es5Example = new ES5Example();

function* idMaker(){
    var index = 0;
    while(true)
        yield index++;
}
var idGen = idMaker();
export class Person {
    firstName;
    lastName;
    id;
    constructor() {
        this.id = idGen.next().value;
    }
}
console.log(new Person());
console.log(new Person());
console.log(new Person());
console.log(new Person());