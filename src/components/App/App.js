import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard.js';
import Login from '../Login/Login.js';
import Preferences from '../Leaderboards/Leaderboards.js';
import useToken from './useToken.js';
import Quiz from '../Quizzes/Quiz.js'
import Logout from './Logout.js';
import { QuizCreator } from '../QuizCreator/QuizCreator.js';
import Fetch from '../FetchData/FetchFunc'
import './App.css';



function App() {


  const [tokenAuthorised, SetAuthState] = useState(false);
  const { token, setToken } = useToken();


  useEffect(() => {
    async function tokenAuthoriser() {

      try {

        const response = await Fetch('http://localhost:8080/auth',{ token });
        //     console.log(response)


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

  })


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
            <li>
              <Link to="/quizcreator">Create a quiz</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/leaderboard">
            <Preferences />
          </Route>
          <Route path="/quiz">
            <Quiz />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/quizcreator">
            <QuizCreator />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );


}



export default App;



