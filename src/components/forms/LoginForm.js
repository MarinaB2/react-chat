import React, { useState } from 'react';
import { loginUser } from '../../api/user.api';
import { Link } from 'react-router-dom';


import { toast } from "react-toastify";

const LoginForm = ({ setAuth }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { password, username };
          const response = await fetch(
            "http://localhost:5000/authentication/login",  
            {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
    
          const parseRes = await response.json();
    
          if (parseRes.jwtToken) {
            localStorage.setItem("token", parseRes.jwtToken);
            setAuth(true);
            toast.success("Logged in Successfully");
          } else {
            setAuth(false);
            toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
        }
      };

    const onUserNameChanged = ev => setUsername(ev.target.value.trim());
    const onUserPasswordChanged = ev => setPassword(ev.target.value.trim());


    return (
     
        <form onSubmit={onSubmitForm}>
            <div>
                <label>Username: </label>
                <input type="text" placeholder="Enter username" onChange={onUserNameChanged} />
            </div>
            <div>
                <label>Username: </label>
                <input type="password" placeholder="Enter password" onChange={onUserPasswordChanged} />
            </div>
            <div>
                <button >Login</button>
            </div>
            <Link to="/register">Does not have an account ! register new</Link>
            {isLoading && <div>Logging in...</div>}
            {loginError && <div>{loginError}</div>}
        </form>
     
    )

};

export default LoginForm;