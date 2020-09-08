import React from 'react';
import LoginForm from '../forms/LoginForm';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { setStorage, getStorage } from '../../utils/localStorage';

const Login = () => {

    const history = useHistory();
    const { token } = getStorage('ra-session');

    const handelLoginClickded = ({ user, token }) => {
        console.log('From login', user);
        console.log('From login', token);
        setStorage('ra-session', {
            user,
            token
        });
        history.replace("/chat");
    }
    return (
        <div>
            {token && <Redirect to="/chat" />}
            <h1>Login</h1>
            <LoginForm loginComplete={handelLoginClickded} />
            <Link to="/register">Does not have an account ! register</Link>
        </div>
    );
}
export default Login;