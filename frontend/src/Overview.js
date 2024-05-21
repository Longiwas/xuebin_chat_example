import { ChatList } from 'react-chat-elements'
import { useNavigate } from 'react-router'
import axios from 'axios'
import './App.css';
import { useState } from 'react';

function Overview() {
  const navigate = useNavigate()
  const [chatDataSource, setChatDataSource] = useState([{
    id: 'user1',
    avatar: 'images/icon1.jpg',
    title: '求职者',
    subtitle:'',
    date: new Date(),
    unread: 0
  }, {
    id: 'user2',
    avatar: 'images/icon2.jpg',
    title: '面试官',
    subtitle:'',
    date: new Date(),
    unread: 0
  }])
  const clickChatListItem = (chat) => {
    navigate('/'+chat.id)
  }
  return (
    <ChatList className='chat-list' dataSource={chatDataSource} onClick={clickChatListItem}></ChatList>
  );
}

export default Overview;
