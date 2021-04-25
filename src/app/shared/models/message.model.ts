export interface Message{
    sender: string;
    recipient: string;
    date_sent: Date;
    message: string;
    conversationId: string;
}

export interface MessageQueryConfig{
    path: string, //  path to collection
    field: string, // field to orderBy
    limit: number, // limit per query
    reverse: boolean, // reverse order?
    prepend: boolean // prepend to source?
}