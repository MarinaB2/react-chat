  
import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import '../../css/chatCss.scss';
import Message from './Message';

const Messages = ({ messages, username }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} username={username}/></div>)}
  </ScrollToBottom>
);

export default Messages;