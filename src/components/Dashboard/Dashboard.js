import React, { useState } from 'react';
import useToken from '../App/useToken';
import '../assets/bootstrap.min.css';
import './Dashboard.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
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

  const [score, SetScore1] = useState()
  const [score2, SetScore2] = useState()
  const [score3, SetScore3] = useState()
  const [score4, SetScore4] = useState()
  const [quizname, SetQuizname1] = useState()
  const [quizname2, SetQuizname2] = useState()
  const [quizname3, SetQuizname3] = useState()
  const [quizname4, SetQuizname4] = useState()



  const { token } = useToken();




  useEffect(() => {
    if (!score) {

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

            });

            //lord forgive me for my trespasses
            SetScore1(StatsArray[0][2])
            SetScore2(StatsArray[1][2])
            SetScore3(StatsArray[2][2])
            SetScore4(StatsArray[3][2])

            SetQuizname1(StatsArray[0][1])
            SetQuizname2(StatsArray[1][1])
            SetQuizname3(StatsArray[2][1])
            SetQuizname4(StatsArray[3][1])






          }

        } catch {

          alert("A server error occurred")


        }
      }


      SetStatsfunc()

    }
  })

  console.log(quizname)


  // console.log(quizname)
  // console.log(score)
  // console.log(id)


  return (
    <div>

      <Jumbotron fluid>

        <h1 className="header">Welcome to your dashboard: user</h1>
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
          <tr>
            <td>{quizname}</td>

            <td>{score}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>
          <tr>
            <td>{quizname2}</td>

            <td>{score2}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>
          <tr>
            <td>{quizname3}</td>

            <td>{score3}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>

          <tr>
            <td>{quizname4}</td>

            <td>{score4}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>
        </tbody>
      </table>



    </div>
  );


}
