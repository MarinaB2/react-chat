import React from 'react';
import ChatForm from '../forms/ChatForm';
import UsersList from '../forms/UsersList';


const Chat = () => {
    return (
        <div>
            <h1>Chat</h1>
            <ChatForm></ChatForm>
            <UsersList></UsersList>
        </div>
    );
}
export default Chat;