import React, { useState } from 'react';
import useToken from '../App/useToken';
import '../assets/bootstrap.min.css';
import './Dashboard.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { Link } from 'react-router-dom'
import { Array } from 'core-js';
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

            //We destructure our array of objects into an 2d arraylist of values

            const objectArray = (userStats.results)

            objectArray.forEach(value => {

              StatsArray.push(Object.values(value))

            });

            //on our 2d arraylist we cleanup the data on score
            StatsArray.forEach(value => {

              if (value[2] == null) {

                value[2] = 0
              }

              

              SetData(StatsArray)

            



            });





          }

        } catch {

          alert("A server error occurred")


        }
      }


      SetStatsfunc()

    }
  })

  

  // console.log(quizname)
  // console.log(score)
  // console.log(id)


  return (
    <div>

      <Jumbotron fluid>

        <h1 className="header">Welcome to your dashboard: {data}</h1>
        <h5>Please select a quiz</h5>

      </Jumbotron>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Quiz</th>
            <th scope="col" class="col_spacer"> Difficulty</th>
            <th scope="col">Best score</th>
            <th scope="col"> Begin quiz </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data}</td>
            <td class="col_spacer" > Easy <Container><TiStarFullOutline /> < TiStarOutline /> < TiStarOutline /></Container> </td>
            <td>{data}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>
          <tr>
            <td>{data}</td>
            <td class="col_spacer">Hard <Container><TiStarFullOutline /> <TiStarFullOutline />   <TiStarFullOutline /> </Container> </td>
            <td>{data}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>
          <tr>
            <td>{data}</td>
            <td class="col_spacer">Intermediate <Container> <TiStarFullOutline /> <TiStarFullOutline /> < TiStarOutline /> </Container> </td>
            <td>{data}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>
        </tbody>
      </table>



    </div>
  );


}
