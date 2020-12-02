import React, { useState, useEffect } from 'react';
import './App.css';
// import Tachyons from 'tachyons';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './component/SignIn/SignIn.js';
import Chat from './component/Chat/Chat.js';
import JoinRoom from './component/PrivateRoom/JoinRoom';
import CreateRoom from './component/PrivateRoom/CreateRoom';
import './SignIn.css';
import Recorder from './component/Recorder/Recorder';
const App = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={SignIn} />
        <Route path="/create-room" component={CreateRoom} />
        <Route path="/join-private" component={JoinRoom} />
        <Route path="/Chat" component={Chat} />
      </div>
    </Router>
  );
};

export default App;
