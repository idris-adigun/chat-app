import { Contact } from '../models/contact.model';

export class addContact {
    static readonly type = '[CONTACT] Add'
    constructor(public payload: Contact){
    }
}

export class removeContact {
    static readonly type = '[CONTACT] Remove'
    constructor(public payload: string){
    }
}