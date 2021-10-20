import React, { useState } from 'react';
import useToken from '../App/useToken';
import '../assets/bootstrap.min.css';
import './Dashboard.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';








//TODO 
// USE ID TOKEN DATA IN RETRIEVING USER'S RECORD FROM SQL TABLE (JWTVERIFY-->DATA)
// FOR NOW JUST CREATE SYSTEM WHICH IMPORTS THE DATA AND DISPLAYS IT ON THIS PAGE


async function getUserData(credentials) {

  return fetch('http://localhost:8080/retrieveStats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'

    },

    body: JSON.stringify(credentials)

  })

    .then(data => data.json())

}



export default function Dashboard() {
  // I could neaten this up to one usestate hook call but this is more readable

  const [data, SetData] = useState()
  const [name, SetName] = useState()



  const { token } = useToken();




  useEffect(() => {
    if (!data) {




      async function SetStatsfunc() {
        const StatsArray = []


        try {
          const userStats = await getUserData({ token })


          if (userStats.error) {

            alert("The server was unable verify your identity")




          }
          else if (userStats.results) {

            //We destructure our array of objects into an 2d arraylist of values to be acceptable for a usestate hook

            const objectArray = (userStats.results)

            objectArray.forEach(value => {

              StatsArray.push(Object.values(value))

            });


            SetData(StatsArray)
            SetName(userStats.name[0].username)

          }

        } catch {

          alert("A server error occurred")


        }
      }


      SetStatsfunc()


    }
  })





  //This as a buffer check to ensure that data is defined????
  if (data) {

    //array cleanup has to be done here for some reason and not in async function else bugs
    data.forEach(element => {
      if (element[2] == null) {
        element[2] = 0
      }
    });


    console.log(data)
    return (
      <div>

        <Jumbotron fluid>

          <h1 className="header">Welcome to your dashboard: {name}</h1>
          <h5>Please select a quiz</h5>

        </Jumbotron>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Quiz</th>
              <th scope="col">Best score</th>
              <th scope="col"> Begin quiz </th>
            </tr>
          </thead>
          <tbody>
            {
            // much better and scales to the amount of rows sent
            data.map(function (rowdata) {
            return <tr>
                <td>{rowdata[1]}</td>
                <td>{rowdata[2]}%</td>
                <td><Link to={{ pathname: '/quizzes/c++', state: { quizid: rowdata[0] } }}>Start </Link>   </td>
              </tr>
            })
            
            }
          </tbody>
        </table>
      </div>
    );

  }

  else {
    return (<div>

      <h2>loading...</h2>

    </div>)
  }

}
