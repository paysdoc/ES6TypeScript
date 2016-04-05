//alert('App.ts is transpiled and executed!');
//
//function testRestParam(...params) {
//    return params.length;
//}
//testRestParam(1); //1
//testRestParam(1, 2, 3, 4); //4
//console.log(testRestParam(1));
//
//console.log(testRestParam(1, 2, 3, 4));
//import Client from "./models/client";
//import ES5Example = MyLib.ES5Example;
//
//
////var example:ES5Example = new ES5Example();
////console.log(example.getRandomNumber());
////example.getRandomNumber();
//

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

function idMaker(){
    var index = 0;
    //while(true)
    //    yield index++;
    return 1;
}
var idGen = idMaker();
interface IAuth {
    role:string;
}

//console.log(new Client('Jan'));
//console.log(new Person());
//console.log(new Client('Karel'));
//console.log(new Client('Kees'));

//class Example {
//    text:string;
//    getNumber():number {
//        return 1;
//    }
//}


function LogInAndOut (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    let className = target.constructor.name;
    //methodName == propertyKey;
    console.debug(`${className}.${propertyKey} is called`);

    var originalMethod = descriptor.value;
    //override the implementation.
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
class Test {
    @LogInAndOut
    //@Secured('admin')
    test(hello, world):string {
        return 'test';
    }
}
new Test().test(1, 2);

//var controllers = [];
//
//enum ACCESS_ROLES {
//    ADMIN = 'admin',
//    CLIENT = 'client'
//}
abstract class Person {
    firstName;
    lastName;
    private _id = idGen;
    protected askQueston ():void {
        //console.log(this.firstName + ': Question?');
    }

    //constructor() {
    //    this._id = idGen.next().value;
    //}
    get id() {
        return this._id;
    }
    private foo() {

    }
    abstract greet():string;
}


//var myAccessLevel = ACCESS_ROLES.CLIENT;
//interface IAccessLevel {
//    access_level: ACCESS_ROLES;
//}
//function AccessLevel(role:ACCESS_ROLES) {
//    return function (target:Function) {
//        let name = target.name;
//        (<IAccessLevel>target).access_level = role;
//        console.log(`${target.name} gives full permissions to ACCESS_ROLE: ${role}`);
//    }
//}
//function Secured(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
//    var originalMethod = descriptor.value;
//    descriptor.value = function (...args:any[]) {
//        let className = target.constructor.name;
//        var access_level = (<IAccessLevel>target.constructor).access_level;
//        if(access_level != myAccessLevel) {
//            console.error(`Permission '${myAccessLevel}' denied.`);
//            console.error(`${className}.${propertyKey} only accepts '${access_level}'.`);
//            return;
//        }
//        return originalMethod.apply(this, args);
//    };
//    return descriptor;
//}
interface IWalk {
    walk():string;
}
//@AccessLevel(ACCESS_ROLES.ADMIN)
class Client extends Person implements IWalk{
    walk():string {
        return 'Client walk';
    }
    constructor(firstName:string) {
        super();
        this.firstName = firstName;
        //console.log(this.id);
        //this.askQueston();
    }
    //@Secured
    greet() {
        return '';
    }
}
class Dog implements IWalk {
    walk():string {
        return 'Dog walk';
    }
}
var client = new Client('yo');
var dog = new Dog();

function test(walker:IWalk) {
    console.log(walker.walk())
}
test(dog);
test(client);

class Example {
    foo(obj:{}) {
        //console.log(obj.name);//error
        let customTypedObj = <{name:string}>obj;
        console.log(customTypedObj.name);//compiles
        console.log((<{name:string}>obj).name);//compiles
        console.log((<any>obj).name);//compiles
    }
}
new Example().foo({name:'test'});


//var service = new ClientService();
//
//service.add(new Client('Jan'));
//service.add(new Client('Kees'));
//service.add(new Client('Karel'));
//console.log(service.getById(1));
//console.log(service.getAll());
//console.log(service.delete(1));
//console.log(service.getById(2));