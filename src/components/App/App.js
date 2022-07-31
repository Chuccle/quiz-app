import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard.js';
import DashboardSearch from '../Dashboard/Search/DashboardSearch.js';
import Login from '../Login/Login.js';
import Leaderboard from '../Leaderboards/Leaderboards.js';
import useToken from './useToken.js';
import Quiz from '../Quizzes/Quiz.js'
import Logout from './Logout.js';
import QuizManager from '../QuizManager/QuizManager.js';
import { QuizCreator } from '../QuizCreator/QuizCreator.js';
import AuthFetch from '../res/FetchFunc';
import NotFound from './NotFound';
import QuizManagerSearch from '../QuizManager/Search/QuizManagerSearch.js';
import LeaderboardSearch from '../Leaderboards/Search/LeaderboardSearch.js';

function App() {

  const [tokenAuthorised, SetAuthState] = useState(false);
  const [dropdown, SetDropDown] = useState(false);
  const { token, setToken } = useToken();


  useEffect(() => {

    async function tokenAuthoriser() {

      const response = await AuthFetch('/auth', {}, 'GET');
      if (response.error) {

        SetAuthState(false);

      }

      else if (response.message) {

        SetAuthState(true);

      }

    }

    tokenAuthoriser();

  })


  // If token is not authorised, redirect to login page as this is parent it will take precedent over the other components

  if (!tokenAuthorised) {

    return <Login setToken={setToken} />
  }

  //console.log(tokenAuthorised)


  function DropdownToggle() {

    //refactor into xor?

    if (!dropdown) {

      SetDropDown(true);

    }

    else {

      SetDropDown(false);

    }

  }


  function Dropdown() {

    if (dropdown) {

      return <div className="origin-top-right absolute right-0 mt-2 w-48  rounded-sm shadow-lg  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none " role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
        <Link to="/quizmanager" className="block px-4 py-2 text-sm text-gray-700  hover:border-black border " role="menuitem" tabIndex={-1} id="user-menu-item-0">Manage your quizzes</Link>
        <Link to="/logout" className="block px-4 py-2 text-sm   text-gray-700 hover:border-black border" role="menuitem" tabIndex={-1} id="user-menu-item-0">Log out</Link>
      </div>

    }

    else return null

  }

  //define our routes
  return (

    <div className='h-screen' >
      <BrowserRouter>
        <nav className="bg-purple-600">

          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>



                </button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img className="block lg:hidden h-10 w-auto" src="https://ronaldmottram.co.nz/wp-content/uploads/2019/01/default-user-icon-8-300x300.jpg" alt="Workflow" />
                  <img className="hidden lg:block h-10 w-auto" src="https://ronaldmottram.co.nz/wp-content/uploads/2019/01/default-user-icon-8-300x300.jpg" alt="Workflow" />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">

                    <Link to="/leaderboard" className="text-white hover:bg-white hover:text-purple-600 px-3 py-2 rounded-md text-m font-medium">Leaderboard</Link>
                    <Link to="/dashboard" className="text-white hover:bg-white hover:text-purple-600 px-3 py-2 rounded-md text-m font-medium">Dashboard</Link>
                    <Link to="/quizcreator" className="text-white hover:bg-white hover:text-purple-600 px-3 py-2 rounded-md text-m font-medium">Create a quiz</Link>

                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <div>
                    <button onClick={e => DropdownToggle()} type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src="https://ronaldmottram.co.nz/wp-content/uploads/2019/01/default-user-icon-8-300x300.jpg" alt="" />
                    </button>
                  </div>
                  <Dropdown />

                </div>
              </div>
            </div>

          </div>
        </nav>


        <Routes>
          <Route exact path="/"
          element={<Navigate to="/dashboard" />}>
          </Route>

          <Route path="leaderboard/leaderboardsearch=:searchquery" element={ <LeaderboardSearch token={token} />}/>
          <Route path="leaderboard" element={<Leaderboard token={token} />}/>
          <Route path="quiz/quizid=:quizid" element={<Quiz token={token} />}/>
          <Route path="dashboard/dashboardsearch=:searchquery" element={<DashboardSearch token={token} />}/>
          <Route path="dashboard"  element={<Dashboard token={token} />}/>
          <Route path="logout" element={<Logout />}/>
          <Route path="quizcreator" element={<QuizCreator token={token} />}/>
          <Route path="quizmanager/userquizsearch=:searchquery" element={<QuizManagerSearch token={token} />}/>
          <Route path="quizmanager" element={<QuizManager token={token} />}/>
          <Route path="*" element={<NotFound/>}>
          </Route>

        </Routes>

      </BrowserRouter>

    </div>

  );


}



export default App;



