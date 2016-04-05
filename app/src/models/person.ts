function* IdGenerator() { //Notice the * right after the method keyword, no this is not a typo.
    let index = 0;
    while(true)
        yield index++;
}
let idGen:IterableIterator<number> = IdGenerator();
export default abstract class Person {

    private _id:number = idGen.next().value;
    public firstName:string;
    public lastName:string;

    get id():number {
        return this._id;
    }
    abstract greet(name:string = 'nobody'):void;
    greetManyPeople(...people:Array<Person>):void {
        for(let i = 0; i < people.length; i++) {
            this.greet(people[i].firstName);
        }
    }
    toString():string {
        return `${this.firstName} ${this.lastName}`;
    }
}