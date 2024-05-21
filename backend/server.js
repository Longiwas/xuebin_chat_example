// koa
const WebSocket = require('ws')
const Koa = require('koa')
const Router = require('@koa/router')
// db
//const { JSONFilePreset } = require('lowdb/node')
// type
//import { Low } from 'lowdb/lib'
// koa
const app = new Koa();
// initializing messages data
/*const defaultData: LowDBData = { "messages": [], "users": [] }
var wholeData: LowDBData = { "messages": [], "users": [] }
var db:Low<LowDBData>;
(async () => {
    db = await JSONFilePreset<LowDBData>('init.json', defaultData)
    await db.read()
})();*/
const user1Messages = []
const user2Messages = []
// http
const httpRouter = new Router()
const port = 8423

httpRouter.get('/messagelist', async (ctx, next) => {
    const id = ctx.query.id
    //const user = db.data.users.find(item => item.id === id)
    if (!['user1', 'user2'].includes(id)) {
        ctx.status = 404
        ctx.body = 'id is not exist'
        await next()
    } else {
        //const message = db.data.messages.find(item => item.to === user.id) ?? { content: '' }
        if (id === 'user2') {
            ctx.body = {
                id: "user2",
                name: "面试官",
                avatar: "icon2.jpg",
                content: user2Messages[0]
            }
        } else if (id === 'user1') {
            ctx.body = {
                id: "user1",
                name: "求职者",
                avatar: "icon1.jpg",
                content: user1Messages[0]
            }
        } else {
            ctx.status = 404
            ctx.body = {
                error: "User not found."
            }
        }
        await next()
    }
})
app.use(async (ctx, next) => {
    await next()
})
.use(httpRouter.routes()).use(httpRouter.allowedMethods())
.listen(port, () => {
    console.log('Server is running in the port: '+port)
})

// websocket
const clients = {}
const wss = new WebSocket.Server({port: 8422})
wss.on('connection', (ws) => {
    ws.on('message', async message => {
        const received = JSON.parse(message.toString())
        if (received.type === 'init') {
            clients[received.id] = ws
            console.log(received.id + ' has been connected')
        }else if (received.type === 'send') {
            if (received.id === 'user1') user2Messages.unshift(received.content)
            else if (received.id === 'user2') user1Messages.unshift(received.content)
            //await db.write()
            const tows = clients[received.content.to]
            if (tows!==undefined) {
                tows.send(JSON.stringify({...received.content}))
            }
            /*const timeout5ReplyPromise = new Promise((resolve, reject) => {
                
            })*/
            setTimeout(() => {
                const nowDate = new Date().getTime()
                const autoReply = {id: nowDate.toString(), type: 'text', content: '[自动回复] 你好, 我现在有事不在, 一会再联系.', date: nowDate, from: 'user1', to: 'user2', fromName: '求职者', toName: '面试官'}
                console.log(autoReply)
                if (received.id === 'user1') {
                    if ((user1Messages.length > 0 && nowDate - user1Messages[0].date >= 4500) || user1Messages.length === 0) {
                        autoReply.from = 'user2'
                        autoReply.to = 'user1'
                        autoReply.fromName = '面试官'
                        autoReply.toName = '求职者'
                        user1Messages.unshift(autoReply)
                        tows.send(JSON.stringify(autoReply))
                        ws.send(JSON.stringify(autoReply))
                    }
                    
                } else if (received.id === 'user2') {
                    if ((user2Messages.length > 0 && nowDate - user2Messages[0].date >= 4500) || user2Messages.length === 0) {
                    
                        console.log('new message date: '+user2Messages[0].date)
                        console.log('cut date: '+(nowDate - user2Messages[0].date))
                        user2Messages.unshift(autoReply)
                        tows.send(JSON.stringify(autoReply))
                        ws.send(JSON.stringify(autoReply))
                    }
                }
            }, 5000);
        }
    })
})