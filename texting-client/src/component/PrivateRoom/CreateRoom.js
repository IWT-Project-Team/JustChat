import React, { useState } from 'react';
// import Chat from '../component/Chat/Chat.js';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const CreateRoom = () => {
  const [room, setRoom] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  return (
    <div className="">
      <div className="joinOuterContainer">
        <div className="br2 ba white shadow-2 -m b--white-10 mv6 w-100 w-50-m w-25-l mw6 center card">
          <h1 className="heading ">Create Room</h1>
          <div>
            <input
              value={room}
              placeholder="Room name"
              className="InputUsername"
              type="text"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
          </div>
          <div>
            <br></br>
            <input
              value={password}
              placeholder="Password"
              className="inputPassword"
              type="text"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <br></br>
          </div>
          <button
            onClick={async () => {
              console.log(room, password);
              try {
                const res = await axios.post('http://localhost:5000/room', {
                  room,
                  password,
                });
                console.log(res);
                setRoom('');
                setPassword('');
                alert(
                  `${res.data.room.room} created successfully! Share room name and password with friends to join in..`
                );
              } catch (er) {
                console.log(er.response);
                alert(er.response.data.error);
              }
            }}
            className="button mt-20"
            type="submit"
          >
            Create
          </button>
          <button
            onClick={async () => {
              history.push('/join-private');
            }}
            className="button mt-20"
            type="submit"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
