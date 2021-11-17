import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Register from '../Register/Register.js'
import Fetch from '../res/FetchFunc'



export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [Nextpage, setNextPage] = useState()

  if (Nextpage) {

    return <Register setToken={setToken} />

  }


  const handleSubmit = async e => {
    e.preventDefault()


    if (username && password) {

      try {
        const token = await Fetch('http://localhost:8080/login', {
          username,
          password
        });
        console.log(token)
        setToken(token);
      }
      catch
      {
        alert("A server error occurred")
      }
    }
    else {
      console.log('Please enter Username and Password!');
      return false;
    }
  }


  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
        </div>
        <label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </label>
      </form>
      <div className="registerPageButton" >
        <button onClick={e => setNextPage(true)}>Register Instead</button>
      </div>
    </div>

  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};