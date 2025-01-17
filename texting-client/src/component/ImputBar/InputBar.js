import React from 'react';
import './InputBar.css';
import link from './../images/link.svg';

const InputBar = ({
  message,
  setMessage,
  sendMessage,
  setImage,
  uploadImage,
}) => {
  return (
    <div className="form">
      <input
        type="text"
        className="input"
        placeholder="Type a message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === 'Enter' ? sendMessage(event) : null
        }
      />
      <div className="image-upload">
        <label htmlFor="file-input">
          {console.log(link)}

          <svg
            width="1em"
            height="5.1em"
            viewBox="0 0 16 16"
            className="bi bi-card-image"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M14.5 3h-13a.5.5 0 0 0-.5.5v9c0 .013 0 .027.002.04V12l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15 9.499V3.5a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm4.502 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
            />
          </svg>
        </label>
        <input
          id="file-input"
          type="file"
          onChange={(e) => {
            setImage(e.target.files);
            uploadImage(e.target.files);
          }}
        />
      </div>
      <button className="sendButton" onClick={(event) => sendMessage(event)}>
        Send
      </button>
    </div>
  );
};

export default InputBar;
