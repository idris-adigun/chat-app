import {Contact} from './contact';
import {Message} from './message';

export interface Inbox{
    id: string;
    users: Contact[];
    messages: Message[];
}