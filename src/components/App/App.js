import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard.js';
import Login from '../Login/Login.js';
import Preferences from '../Preferences/Preferences.js';
import useToken from './useToken.js';
import Quiz from '../Quizzes/C++/Quiz'
import Logout from './Logout.js';
import './App.css';


// import Settings from '../Settings/Settings.js'



function App() {


  const [tokenAuthorised, SetAuthState] = useState();
  const { token, setToken } = useToken();



  tokenAuthoriser()



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
    //     console.log(response)

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


  if (!tokenAuthorised) {

    return <Login setToken={setToken} />
  }
  //console.log(tokenAuthorised)



  return (
    <div className="wrapper">
      <BrowserRouter>
        <div className="boomer">
          <ul>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/logout">Log out</Link>
            </li>
          </ul>
        </div>
        <Switch>

          <Route path="/dashboard">
            <Dashboard setToken={setToken} />
          </Route>
          <Route path="/leaderboard">
            <Preferences setToken={setToken} />
          </Route>
          <Route path="/quizzes/c++">
            <Quiz setToken={setToken} />
          </Route>
          <Route path="/logout">
            <Logout setToken={setToken} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );


}



export default App;



