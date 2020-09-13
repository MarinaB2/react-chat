import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import '../../css/chatCss.scss';



const ChatRoom = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
   
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

    const onRoomChanged = ev => setRoom(ev.target.value.trim());
    const onUserNameChanged = ev => setUsername(ev.target.value.trim());

    return (

        <form>
            <div>
                <label>Username: </label>
                <input type="text" placeholder={username} onChange={onUserNameChanged}></input>
            </div>
            <div>
                <label>Room: </label>
                <input type="text" placeholder="Enter room" onChange={onRoomChanged} />
            </div>
            <div>
                <Link onClick={e => (!username || !room) ? e.preventDefault() : null} to={`/chat?name=${username}&room=${room}`}>
                    <button >Join room</button>
                </Link>

            </div>
        </form>

    )

};

export default ChatRoom;
