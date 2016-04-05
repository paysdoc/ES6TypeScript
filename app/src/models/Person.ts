function* IdGenerator() { //Notice the * right after the method keyword, no this is not a typo.
    let index = 0;
    while(true)
        yield index++;
}
let idGen = IdGenerator();

export default class Person {
    firstName:string;
    lastName:string;
    id = idGen.next().value;
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    toString() {
        return `${this.firstName} ${this.lastName}`;
    }
    greet(name = 'nobody') {
        console.log(`Hello ${name}`);
    }
    greetManyPeople(...people) {
        for(let i = 0; i < people.length; i++) {
            this.greet(people[i].firstName);
        }
    }
}