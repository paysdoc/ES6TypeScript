function* IdGenerator() { //Notice the * right after the method keyword, no this is not a typo.
    let index = 0;
    while(index < 4)
        yield index++;
}
let idGen:IterableIterator<number> = IdGenerator();
console.log(idGen.next().value);
console.log(idGen.next().value);
console.log(idGen.next().value);
export default class Person {

    private _id:number = idGen.next().value;
    public firstName:string;
    public lastName:string;

    constructor(firstName:string, lastName:string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get id():number {
        return this._id;
    }
    greet(name:string = 'nobody'):void {
        console.log(`Hello ${name}`);
    }
    greetManyPeople(...people:Array<Person>):void {
        for(let i = 0; i < people.length; i++) {
            this.greet(people[i].firstName);
        }
    }
    toString():string {
        return `${this.firstName} ${this.lastName}`;
    }
}