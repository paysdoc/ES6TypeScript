interface ClientService {
    all: Array<Client>;
    add(client:Client):void;
    getAll():Array<Client>;
    getById(id:number):Client;
    delete(id:number):void;
}

declare function ClientService():void;

