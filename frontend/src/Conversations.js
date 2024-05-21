import { MessageList, Input, Button } from 'react-chat-elements'
import {v4} from 'uuid'
import './App.css';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
const flex = {
  display: 'flex',
  flexDirection: 'column',
  height: '90vh',
  width: '100%',
}
const input = {

}
function Conversation(props) {
  const {userid} = useParams()
  const [messageDataSource, setMessageDataSource] = useState([])
  const [ws, setWS] = useState(new WebSocket('ws://localhost:8422'))
  const inputRef = useRef()
  const name = userid === 'user1' ? '求职者' : '面试官'
  const avatar = userid === 'user1' ? 'icon1.jpg' : 'icon2.jpg'
  const user2avatar = userid === 'user2' ? 'icon1.jpg' : 'icon2.jpg'
  ws.onopen = event => {
    ws.send(`{ "id": "${userid}", "type": "init" }`)
  }
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data.toString())
    setMessageDataSource([
        ...messageDataSource,
        {
          id: message.id,
          position: userid === message.from ? 'right': "left",
          type:"text",
          title:message.fromName,
          text: message.content,
          avatar: '/images/'+(userid === message.from ? avatar: user2avatar)
        }
    ])
  }
  const sendMessage = () => {
    const messageid = v4()
    ws.send(`{ "id": "${userid}", "type": "send", "content": { "id": "${messageid}", "type": "text", "content": "${inputRef.current.value}", "date": ${new Date().getTime()}, "from": "${userid}", "to": "${userid === 'user1' ? 'user2': 'user1'}", "fromName": "${name}", "toName": "${userid === 'user1' ? '面试官': '求职者'}" } }`)
    setMessageDataSource([
      ...messageDataSource,
      {
        id: messageid,
        position:"right",
        type:"text",
        title: name,
        text: inputRef.current.value,
        avatar: '/images/'+avatar
      }
  ])
  }
  return (
    <div style={flex}>
      <div style={{flex: 1, borderBottom: 1, borderBottomColor: '#CCCCCC', borderBottomStyle: 'solid', overflowY: 'auto'}}>
        <MessageList className='message-list'
        toBottomHeight={'100%'}
        lockable={true}
        dataSource={messageDataSource}></MessageList>
      </div>
      <div style={{width: '100%', display: "flex", flexDirection: "row", justifyContent: "space-between", width: '100vw', alignItems: 'center', backgroundColor: '#EEEEEE' }}>
        <Input
          multiline={true}
          referance={inputRef}
          rightButtons={[<Button title="" text='发送' onClick={sendMessage} />]}
        />
        
      </div>
    </div>
  );
}

export default Conversation;
