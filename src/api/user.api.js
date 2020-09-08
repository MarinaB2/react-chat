import { handelResponse } from "./api";

const API_Reagister_URL = '';
const API_Login_URL = '';

const createFetchOptions = (method, body) => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
});

export const registerUser = (username, password) => {
    return fetch(
        API_Reagister_URL,
        createFetchOptions('POST', {
            user: {
                username,
                password
            }
        })
    ).then(resp => resp.json())
        .then(handelResponse)
}

export const loginUser = (username, password) => {
    return fetch(
        API_Login_URL,
        createFetchOptions('POST', {
            user: {
                username,
                password
            }
        })
    ).then(resp => resp.json())
        .then()
}