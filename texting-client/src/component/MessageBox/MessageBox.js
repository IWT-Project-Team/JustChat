import React, { useState, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '@progress/kendo-theme-default/dist/all.css';
import { Chat } from '@progress/kendo-react-conversational-ui';
import Picker from 'emoji-picker-react';
import { IoIosRadioButtonOn } from 'react-icons/io';
import Recorder from '../Recorder/Recorder';

const AttachmentTemplate = (props) => {
  let attachment = props.item;
  if (attachment.contentType === 'audio') {
    return (
      <div className="k-card k-card-type-rich">
        <div className="k-card-body quoteCard">
          <audio
            controls
            src={attachment.content}
            style={{ width: '200px', height: '40px' }}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="k-card k-card-type-rich">
      <div className="k-card-body quoteCard">
        <img
          style={{ height: '200px', width: '280px' }}
          src={attachment.content}
          draggable={true}
        />
      </div>
    </div>
  );
};

const Toolbar = ({ uploadImage, clickHandler, item, uploadAudio }) => {
  const fileUpload = useRef();
  const [show, setShow] = useState(false);
  const [recording, setRecording] = useState(false);
  const media = useRef();
  return (
    <span>
      <input
        type="file"
        onChange={(e) => {
          uploadImage(e.target.files);
        }}
        style={{ display: 'none' }}
        ref={(el) => (fileUpload.current = el)}
      />
      <button
        className="sendimage k-button k-button-icon"
        onClick={() => fileUpload.current.click()}
      >
        <span className="k-icon k-i-image" />
      </button>
      <button
        className="sendimage k-button k-button-icon"
        onClick={() => setShow((pre) => !pre)}
      >
        {'😎'}
      </button>
      <button
        className="sendimage k-button k-button-icon"
        onClick={() => {
          if (!recording) {
            media.current = new Recorder();
          } else {
            media.current.stop();
            setTimeout(() => {
              console.log(media.current.audioChunks);
              uploadAudio(media.current.audioChunks);
            }, 300);
          }
          setRecording((pre) => !pre);
        }}
      >
        <IoIosRadioButtonOn size={20} color={recording ? 'red' : ''} />
      </button>
      {show ? <Picker onEmojiClick={clickHandler} /> : null}
    </span>
  );
};

const CustomMessage = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <button
        {...props.sendButton.props}
        onClick={(e) => {
          console.log(e);
          props.addNewMessage({
            message: {
              author: props.user,
              text: props.mess,
              timestamp: new Date(),
            },
          });
        }}
      />
      <input
        value={props.mess}
        autoFocus
        {...props.messageInput.props}
        onChange={(e) => props.setMess(e.target.value)}
      />
      {props.toolbarButton}
    </React.Fragment>
  );
};

const MessageBox = ({
  messages,
  user,
  addNewMessage,
  uploadImage,
  clickHandler,
  mess,
  setMess,
  uploadAudio,
}) => {
  const [showToolbar, setShowToolbar] = useState(false);

  return (
    <Chat
      user={user}
      messages={messages}
      onMessageSend={addNewMessage}
      placeholder={'Type a message...'}
      width={window.innerWidth > 500 ? 500 : window.innerWidth - 50}
      dir="down"
      showToolbar={showToolbar}
      onToolbarActionExecute={(e) => setShowToolbar((pre) => !pre)}
      toolbar={
        <Toolbar
          uploadAudio={uploadAudio}
          uploadImage={uploadImage}
          clickHandler={clickHandler}
        />
      }
      attachmentTemplate={AttachmentTemplate}
      messageBox={(props) => (
        <CustomMessage
          {...props}
          addNewMessage={addNewMessage}
          mess={mess}
          setMess={setMess}
          user={user}
        />
      )}
    ></Chat>
  );
};

export default MessageBox;
