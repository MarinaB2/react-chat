import React from 'react';
import '../../css/chatCss.scss';
import ReactEmoji from 'react-emoji';
import image from '../../images/avatar.png'

const Message = ({ message: { text, user }, username }) => {
  let isSentByCurrentUser = false;

  const trimmedName = username;

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div>
      
        <div className="messageContainer justifyEnd">
        <img src={image} alt="Avatar" class="avatar"/>
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
             <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p> 
          </div>
        </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p> 
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;