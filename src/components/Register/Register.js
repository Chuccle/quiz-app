import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Login from '../Login/Login.js'
import './Register.css';


async function RegisterUser(credentials) {

    return fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}


export default function Register({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [passwordCompare, setPasswordCompare] = useState();
    const [Nextpage, setNextPage] = useState()

    if (Nextpage) {

        return <Login setToken={setToken} />

    }

    const handleSubmit = async e => {
        e.preventDefault()


        if (!username && password) {
            console.log('Please enter Username and Password!');
            return false;
        }
        else if (password !== passwordCompare) {
            console.log('Please reenter passwords!');
            return false;
        }
        else {
            const token = await RegisterUser({
                username,
                password
            });
            setToken(token);
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <div>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        <p>Retype Password</p>
                        <input type="password" onChange={e => setPasswordCompare(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        <button type="submit">Submit</button>

                    </label>
                </div>
            </form>
            <div className="loginPageButton" >
                <button onClick={e => setNextPage(true)}>Login page</button>

            </div>
        </div>
    )
}

Register.propTypes = {
    setToken: PropTypes.func.isRequired
};