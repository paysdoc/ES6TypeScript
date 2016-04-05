//alert('App.ts is transpiled and executed.');

import Person from "./models/person";

//let person1 = new Person('first', 'last');
//console.log(person1);
//person1.greet('Jan');
//person1.greet();
//
//let person2 = new Person('1', 'last');
//let person3 = new Person('2', 'last');
//let person4 = new Person('3', 'last');
//
//console.log(person2);
//person1.greetManyPeople(person2, person3, person4);


class Example {
    constructor(public foo) {}
}
console.log(new Example('foo'));

function* IdGenerator() { //Notice the * right after the method keyword, no this is not a typo.
    let index = 0;
    while(index < 4)
        yield index++;
}
let idGen:IterableIterator<number> = IdGenerator();
console.log(idGen.next().value);
console.log(idGen.next().value);
console.log(idGen.next().value);
