interface ClientService {
    all: Array<Client>;
    add(client:Client):void;
    getAll():Array<Client>;
    getById(id:number):Client;
    delete(id:number):void;
}

declare function ClientService():void;

class Example {
    protected foo:string;
}
let example = new Example();
example.foo //error
example.foo = 'something'; //error

class ExampleChild extends Example {
    constructor() {
        super();
        this.foo; //ok
    }
}