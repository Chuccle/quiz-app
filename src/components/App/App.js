import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Dashboard from '../Dashboard/Dashboard.js';
import Login from '../Login/Login.js';
import Preferences from '../Preferences/Preferences.js';
import useToken from './useToken.js';





// Allow Default page to also be register on top of login
function App() {


  const [ tokenAuthorised, SetAuthState ] = useState(); 
  const { token, setToken } = useToken();
 
  if (!token) {

    return <Login setToken={setToken} />
  } 




    async function verifyTokenFetch(jwttoken) {

      return fetch('http://localhost:8080/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify(jwttoken)
      })


        .then(data => data.json()) 

        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error)
        });


    }

    async function tokenAuthoriser() {
      var response = await verifyTokenFetch({ token });
      console.log(response)

    try {
      if (response.error) {
  
        SetAuthState(false)  
      }
      else if (response.message) {
         
        SetAuthState(true)
        
      }
    } catch {

      alert("A server error occurred")


    }
  }


tokenAuthoriser()

  
console.log(tokenAuthorised)





    if (!tokenAuthorised) {
      return (<Login setToken={setToken} />)
    }

    return (
      <div className="wrapper">
        <h1>Application
        </h1>
        <BrowserRouter>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
            <div>
              <hr></hr>
            </div>
          </div>
          <Switch>
            <Route path="/dashboard">
              <Dashboard setToken={setToken} />
            </Route>
            <Route path="/preferences">
              <Preferences setToken={setToken} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );


  }



export default App;


