import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import Overview from './Overview.js';
import Conversation from './Conversations.js';
import reportWebVitals from './reportWebVitals.js';
import { HashRouter, Route, Routes } from 'react-router-dom'
//chat css
import "react-chat-elements/dist/main.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Overview></Overview>}></Route>
          <Route path=':userid' element={<Conversation/>}></Route>
        </Route>
      </Routes>
    </HashRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
