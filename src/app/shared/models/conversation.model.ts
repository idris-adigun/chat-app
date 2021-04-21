export interface Conversation{
    uid: string
    lastUpdated: Date;
    lastMessage: string;
    member: string[];
}