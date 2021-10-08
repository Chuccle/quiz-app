import React, { useState } from 'react';
import useToken from '../App/useToken';
import '../assets/bootstrap.min.css';
import './Dashboard.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { Link } from 'react-router-dom'







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
 // const [email, SetEmail] = useState()
  const [id, SetId] = useState()
  const [username, setUserName] = useState()



  const { token } = useToken();

  async function SetStatsfunc() {


    //  console.log(token)
    const userStats = await getUserData({ token })


    try {

      if (userStats.error) {

        alert("The server was unable to verify your session")



      }
      else if (userStats.results) {

        //change this to quiz score stats and display it on dashboard
        //  console.log(userStats.results)
       // SetEmail(userStats.results[0].email)
        SetId(userStats.results[0].id)
        setUserName(userStats.results[0].username)



      }

    } catch {

      alert("A server error occurred")


    }

  }

  SetStatsfunc()


  //console.log(username)
  // console.log(email)
  // console.log(id)


  return (
    <div>

      <Jumbotron fluid>

        <h1 className="header">Welcome to your dashboard: {username}</h1>
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
            <td>C++</td>
            <td class="col_spacer" > Easy <Container><TiStarFullOutline /> < TiStarOutline /> < TiStarOutline /></Container> </td>
            <td>{id}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>
          <tr>
            <td>Java</td>
            <td class="col_spacer">Hard <Container><TiStarFullOutline /> <TiStarFullOutline />   <TiStarFullOutline /> </Container> </td>
            <td>{id}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>
          <tr>
            <td>PHP</td>
            <td class="col_spacer">Intermediate <Container> <TiStarFullOutline /> <TiStarFullOutline /> < TiStarOutline /> </Container> </td>
            <td>{id}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>
        </tbody>
      </table>



    </div>
  );


}