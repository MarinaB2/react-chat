import React, { useState } from 'react';
import { registerUser } from '../../api/user.api';
import { Link } from 'react-router-dom';


const RegisterForm = props => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [room, setRoom] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [registerError, setRegisterError] = useState('');

    const onRegisterCliked = async event => {

        setIsLoading(true);
        let result;

        try {
            const { status } = await registerUser(username, password, room);
            result = status === 201;

        } catch (e) {
            setRegisterError(e.message || e);
        } finally {
            setIsLoading(false);
            props.registerComplete(result);
        }
    };

    const onUserNameChanged = ev => setUsername(ev.target.value.trim());
    const onUserPasswordChanged = ev => setPassword(ev.target.value.trim());
    const onRoomChanged = ev => setRoom(ev.target.value.trim());

    return (
        <form>
            <div>
                <label>Username: </label>
                <input type="text" placeholder="Enter username" onChange={onUserNameChanged} />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" placeholder="Enter password" onChange={onUserPasswordChanged} />
            </div>
            <div>
                <label>Room: </label>
                <input type="text" placeholder="Enter password" onChange={onRoomChanged} />
            </div>
            <div>
                <Link onClick={e => (!username || !room) ? e.preventDefault() : null} to={`/chat?name=${username}&room=${room}`}>
                <button type="submit">Register</button>
                </Link>
            </div>
            {isLoading && <div>Registering user...</div>}
            {registerError && <div>{registerError}</div>}
        </form>
    )

};

export default RegisterForm;