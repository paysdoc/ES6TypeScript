import Person from "./person";
export default class Client extends Person{
    constructor(firstName:string, lastName:string) {
        super(firstName, lastName);
    }
}
var client = new Client('1', '3');