import { UserProfile } from '../models/user.model';
import { Contact } from '../models/contact.model';

export class setUserProfile {
    static readonly type = '[USERPROFILE] Set'
    constructor(public payload: UserProfile){
    }
}

export class RemoveUserProfile {
    static readonly type = '[USERPROFILE] Remove'
    constructor(public payload: string){
    }
}