export type User = {
    id: string, 
    name: string, 
    avatar: string, 
    friends: Array<string>,
    lastData: string
}
export type Message = {
    id: string,
    type: 'text',
    content: string,
    date: number,
    from: string,
    fromName: string,
    to: string,
    toName: string
}
export type WebSocketMessage = {
    id: string,
    type: 'send' | 'init',
    content: Message
}
export type LowDBData = {
    messages: Array<Message>,
    users: Array<User>
}
