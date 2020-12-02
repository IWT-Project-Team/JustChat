import React, { useState } from 'react';
// import Chat from '../component/Chat/Chat.js';
import { Link, useHistory } from 'react-router-dom';

const SignIn = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const history = useHistory();
  return (
    <div className="">
      <div className="joinOuterContainer">
        <div className="br2 ba white shadow-2 -m b--white-10 mv6 w-100 w-50-m w-25-l mw6 center card">
          <h1 className="heading ">SignIn</h1>
          <div>
            <input
              placeholder="User Name"
              className="InputUsername"
              type="text"
              onChange={(event) => {
                setName(event.target.value);
                console.log(name);
              }}
            />
          </div>
          <div>
            <br></br>
            <input
              placeholder="Room"
              className="inputPassword"
              type="text"
              onChange={(event) => {
                setRoom(event.target.value);
                console.log(room);
              }}
            />
            <br></br>
          </div>
          <Link
            onClick={(event) =>
              !name || !room ? event.preventDefault() : null
            }
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className="button mt-20" type="submit">
              SignIn
            </button>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              history.push('/join-private');
            }}
            className="button mt-20"
            type="submit"
          >
            Join private room
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              history.push('/create-room');
            }}
            className="button mt-20"
            type="submit"
          >
            Create private room
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
