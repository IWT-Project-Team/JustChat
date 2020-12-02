import React, { useState } from 'react';
// import Chat from '../component/Chat/Chat.js';
import { Link, useHistory } from 'react-router-dom';

const JoinRoom = () => {
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
              }}
            />
            <br></br>
          </div>
          <Link
            onClick={(event) =>
              !name || !room ? event.preventDefault() : null
            }
            to={`/chat?name=${name}&room=${room}&prot=${true}`}
          >
            <button className="button mt-20" type="submit">
              SignIn
            </button>
          </Link>
          <button
            onClick={() => history.push('/')}
            className="button mt-20"
            type="submit"
          >
            Join Public
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
