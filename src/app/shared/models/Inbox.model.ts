import {Contact} from './contact.model';
import {Message} from './message.model';

export interface Inbox{
    id: string;
    users: Contact[];
    messages: Message[];
}