import { UserProfile } from '../models/user.model';

export class setUserProfile {
    static readonly type = '[USERPROFILE] Add'
    constructor(public payload: UserProfile){
    }
}

export class RemoveUserProfile {
    static readonly type = '[USERPROFILE] Remove'
    constructor(public payload: string){
    }
}