import Person from "./person";
export default class Client extends Person{
    greet(name?:string):void {
    }
    constructor(firstName:string, lastName:string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
var client = new Client('1', '3');