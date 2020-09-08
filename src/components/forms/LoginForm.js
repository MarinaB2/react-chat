import React, { useState } from 'react';
import { loginUser } from '../../api/user.api';

const LoginForm = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const onLoginCliked = async event => {

        setIsLoading(true);
        setLoginError('');
        let LoginResult;

        try {
            LoginResult = await loginUser(username, password);
        } catch (e) {
            setLoginError(e.message || e);
        } finally {
            setIsLoading(false);
            props.loginComplete(LoginResult.data);

        }
    };

    const onUserNameChanged = ev => setUsername(ev.target.value.trim());
    const onUserPasswordChanged = ev => setPassword(ev.target.value.trim());


    return (
        <form>
            <div>
                <label>Username: </label>
                <input type="text" placeholder="Enter username" onChange={onUserNameChanged} />
            </div>
            <div>
                <label>Username: </label>
                <input type="password" placeholder="Enter password" onChange={onUserPasswordChanged} />
            </div>
            <div>
                <button type="button" onClick={onLoginCliked}>Login</button>
            </div>
            {isLoading && <div>Logging in...</div>}
            {loginError && <div>{loginError}</div>}
        </form>
    )

};

export default LoginForm;