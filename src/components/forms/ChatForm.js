
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../formComponents/InfoBar';
import Input from '../formComponents/Input';
import Messages from '../formComponents/Messages';
import TextContainer from '../formComponents/TextContainer';
import { toast } from "react-toastify";


import '../../css/chatCss.scss';

let socket;

const ChatForm = ({ location }, { setAuth }) => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

     const endPoint = 'http://localhost:5000/';

     const getUsername = async () => {
        try {
            const res = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { jwt_token: localStorage.token }
            });

            const parseData = await res.json();
            setUsername(parseData.username);
            
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getUsername();
        
    }, []);

    useEffect(() => {
      
        const { room } = queryString.parse(location.search);

       socket = io(endPoint);


       setUsername(username);
        setRoom(room);

        console.log(socket);
        socket.emit('login', { username, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
        

    }, [endPoint, username, location.search]);

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

    const logout = async e => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setAuth(false);
            toast.success("Logout successfully");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="outerContainer">

            <h2>Welcome {username}</h2>
            <button onClick={e => logout(e)} className="btn btn-primary">
                Logout
      </button>
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