import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from '../Dashboard/Dashboard.js';
import Login from '../Login/Login.js';
import Preferences from '../Preferences/Preferences.js';
import Register from '../Register/Register.js'
import useToken from './useToken.js';


function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  async function verifyToken(jwttoken) {

    return fetch('http://localhost:8080/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        
      },
      body: JSON.stringify(jwttoken)
    })
      .then(data => data.json())
      
  }

  function dashboardRedirect() {

    if (token)
     {
       const response = verifyToken({token});
       console.log(response)
      
      return <Dashboard setToken={setToken}/>

    }
    else {
      return <Login setToken={setToken} />
    }

  }
  


  return (
    <div className="wrapper">
      <h1>Application</h1>
      <div>
        <h1>To dashboard</h1>
        <button onClick={dashboardRedirect}>Dashboard</button>
        <div>
          <hr></hr>
          </div>
          </div>

        <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard setToken={setToken}  />
          </Route>
          <Route path="/preferences">
            <Preferences  setToken={setToken}/>
          </Route>
          <Route path="/register">
            <Register setToken={setToken} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}


export default App;