import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar.js';
// import InputBar from '../ImputBar/InputBar.js';
// import Messages from '../Messages/Messages';
import MessageBox from '../MessageBox/MessageBox';
import { useHistory } from 'react-router-dom';
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState([]);
  const [user, setUser] = useState({});
  const history = useHistory();
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room, prot } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    console.log(socket);
    if (prot) {
      const password = prompt('Enter password for room ' + room);
      console.log(password);
      socket.emit('private', { name, room, password });
    } else socket.emit('join', { name, room });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  useEffect(() => {
    socket.on('err', (err) => {
      alert(err.message);
      history.push('/join-private');
    });
    socket.on(
      'message',
      (message) => {
        console.log(message);
        if (
          !user.name &&
          name &&
          name.trim().toLowerCase() === message.user.name.trim().toLowerCase()
        ) {
          setUser(message.user);
        }
        setMessages([
          ...messages,
          {
            timestamp: new Date(),
            text: message.text,
            author: message.user,
          },
        ]);
      },
      [messages]
    );
    socket.on('audio', (message) => {
      if (
        !user.name &&
        name &&
        name.trim().toLowerCase() === message.user.name.trim().toLowerCase()
      ) {
        setUser(message.user);
      }
      setMessages([
        ...messages,
        {
          author: message.user,
          text: '',
          timestamp: new Date(),
          attachments: [{ content: message.audio, contentType: 'audio' }],
        },
      ]);
    });
    socket.on('image', (message) => {
      console.log(message);
      if (
        !user.name &&
        name &&
        name.trim().toLowerCase() === message.user.name.trim().toLowerCase()
      ) {
        setUser(message.user);
      }
      setMessages([
        ...messages,
        {
          author: message.user,
          text: '',
          timestamp: new Date(),
          attachments: [{ content: message.image, contentType: 'image/' }],
        },
      ]);
    });
  });
  const sendMessage = (e) => {
    setMessages([...messages, e.message]);
    if (e) {
      socket.emit('sendMessage', e.message.text, () => setMessage(''));
    }
  };

  const emojiClick = (e, emoji) => {
    console.log(emoji);
    setMessage((pre) => pre + emoji.emoji);
  };

  const uploadAudio = (datas) => {
    console.log(datas);
    const buff = new Blob(datas, { type: 'video/webm' });
    console.log(buff);
    const reader = new FileReader();
    reader.readAsDataURL(buff);
    reader.onloadend = () => {
      const audio = reader.result;
      socket.emit('sendAudio', audio);
      setMessages((messages) => [
        ...messages,
        {
          author: user,
          text: '',
          timestamp: new Date(),
          attachments: [{ content: audio, contentType: 'audio' }],
        },
      ]);
    };

    // if (audio) {

    // }
  };

  const uploadImage = (imgs) => {
    if (imgs) {
      const FR = new FileReader();
      let val;
      FR.addEventListener('load', (e) => {
        val = e.target.result;
        socket.emit('sendImage', val, () => setImages([]));
        setMessages((messages) => [
          ...messages,
          {
            author: user,
            text: '',
            timestamp: new Date(),
            attachments: [
              {
                content: val,
                contentType: 'image/',
              },
            ],
          },
        ]);
        console.log(val);
      });
      FR.readAsDataURL(imgs[0]);
    }
  };
  console.log(messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <MessageBox
          user={user}
          addNewMessage={sendMessage}
          messages={messages}
          uploadImage={uploadImage}
          clickHandler={emojiClick}
          mess={message}
          setMess={setMessage}
          uploadAudio={uploadAudio}
        />
        {/* <Messages messages={messages} name={name} />
        <InputBar
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          setImage={setImages}
          uploadImage={uploadImage}
        /> */}
      </div>
    </div>
  );
};
export default Chat;
