import { Contact } from '../models/contact.model';

export class setContact {
    static readonly type = '[CONTACT] Set'
    constructor(public payload: Contact){
    }
}

export class removeContact {
    static readonly type = '[CONTACT] Remove'
    constructor(public payload: string){
    }
}