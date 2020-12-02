import React from 'react';
import './Message.css';

const Message = ({ message, name }) => {
  let isCurrentUser = false;
  // string1.localeCompare(string2) == 0
  console.log(message.val.user);
  if (message.val.user.trim().toLowerCase() === name.trim().toLowerCase()) {
    isCurrentUser = true;
    console.log('iscurrentUser=True', name);
  } else {
    console.log('isCurrentUser=False', name);
  }
  console.log(name);
  return isCurrentUser == true ? (
    <div className="messageContainer01">
      <p className="sentText pr-10"> {message.val.user} </p>
      <br></br>
      <div className="messageBox backgroundBlue">
        {message.type === 'text' ? (
          <p className="messageText colorWhite">{message.val.text} </p>
        ) : (
          <img
            style={{ width: '120px', height: '120px' }}
            src={message.val.image}
            alt="message"
          />
        )}
      </div>
    </div>
  ) : (
    <div className="messageContainer02">
      <p className="sentText p1-10"> {message.val.user} </p>
      <div className="messageBox backgroundLight">
        {message.type === 'text' ? (
          <p className="messageText colorWhite"> {message.val.text} </p>
        ) : (
          <img
            style={{ width: '120px', height: '120px' }}
            src={message.val.image}
            alt="message"
          />
        )}
      </div>
    </div>
  );
};

export default Message;
