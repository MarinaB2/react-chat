import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";


const RegisterForm = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { password, username };
            const response = await fetch(
                "http://localhost:5000/authentication/register",
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
                toast.success("Register Successfully");
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
            <h1>Register new account : </h1>
            <div>
                <label>Username: </label>
                <input type="text" placeholder="Enter username" onChange={onUserNameChanged} />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" placeholder="Enter password" onChange={onUserPasswordChanged} />
            </div>
            <div>
                <button >Register</button>
            </div>
            <br></br>
            <Link to="/login">Already registred? Login here</Link>
        </form>
    )

};

export default RegisterForm;