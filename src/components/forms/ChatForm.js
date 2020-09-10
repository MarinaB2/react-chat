
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../formComponents/InfoBar';
import Input from '../formComponents/Input';
import Messages from '../formComponents/Messages';
import TextContainer from '../formComponents/TextContainer';

let socket;

const ChatForm = ({ location }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const endPoint = 'http://localhost:5000/';

    useEffect(() => {
        const { username, password, room } = queryString.parse(location.search);


        socket = io(endPoint);

        setUsername(username);
        setPassword(password);
        setRoom(room);

        console.log(socket);
        socket.emit('register', { username, password, room }, (error) => {
            if (error) {
                alert(error);
            }
        });

    }, [endPoint, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {

            socket.emit('sendMessage', message, () => setMessage('')); //clear input filed when the message is sent 
        }

    }
    console.log('user and users from chatForm', username, users);
    console.log(message, messages);
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} username={username} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
};

export default ChatForm;