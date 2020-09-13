import React, {useEffect, useState} from 'react';
import RegisterForm from '../forms/RegisterForm';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { getStorage } from '../../utils/localStorage';


const Register = () => {

    // const { token } = getStorage('ra-session');
    // const history = useHistory();

    // const handelReagisterClickded = (result) => {
    //     console.log('From Register', result);
    //     if (result) {
    //         history.replace("/chat");
    //     }
    // }

    return (
        <div>
            {/* {token && <Redirect to="/chat" />} */}
            <h1>Register</h1>
            {/* <RegisterForm registerComplete={} /> */}
            <Link to="/login">Already registred? Login here</Link>
        </div>
    )
};
export default Register;