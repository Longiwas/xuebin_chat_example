import { ChatList } from 'react-chat-elements'
import { Outlet } from 'react-router'
import axios from 'axios'
import './App.css';
import { useState } from 'react';

function App() {
  const [chatDataSource, setChatDataSource] = useState([])
  const id = localStorage.getItem('id') ?? 'user1'
  if (chatDataSource.length === 0) {
    axios.get('/messagelist', {
      params: {
        id
      },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      const data = res.data
      console.log(data)
      if(data.content) {
        setChatDataSource([{
          id: data.id,
          avatar: 'images/'+data.avatar,
          title: data.name,
          subtitle: data.content.content,
          date: new Date(data.content.date),
          unread: 0
        }])
      } else {
        setChatDataSource([{
          id: data.id,
          avatar: 'images/'+data.avatar,
          title: data.name,
          subtitle:'',
          date: new Date(),
          unread: 0
        }])
      }
    })
  }
  return (
    <div>
      <div style={{backgroundColor: 'black', opacity: 0.7, textAlign: 'center', alignItems: 'center', color: 'White', fontSize: 20, padding: 18 }}>
        Talk is cheap, show you the code
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
