import React, { useState } from 'react';
import useToken from '../App/useToken';
import '../assets/bootstrap.min.css';
import './Dashboard.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useRef } from 'react';







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
  
  const bruh = useRef()


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

          
       SetData(StatsArray)
           



          }

        } catch {

          alert("A server error occurred")


        }
      }


      SetStatsfunc()

      
    }
    })

  
console.log(data)


//This as a buffer check to ensure that data is defined????
if (data) {
bruh.current = data

//array cleanup has to be done here for some reason 
bruh.current.forEach(element => {
  if (element[2] == null){
  element[2] = 0
  }
});


console.log(bruh.current)

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
            <td>{bruh.current[0][1]}</td>

            <td>{bruh.current[0][2]}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>
          <tr>
            <td>{bruh.current[1][1]}</td>

            <td>{bruh.current[1][2]}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>
          <tr>
            <td>{bruh.current[2][1]}</td>

            <td>{bruh.current[2][2]}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>

          <tr>
            <td>{bruh.current[3][1]}</td>

            <td>{bruh.current[3][2]}%</td>
            <td><Link to='/quizzes/c++'>Start</Link>   </td>

          </tr>
        </tbody>
      </table>



    </div>
  );

  }
  
  else { 
    return ( <div>
    
    <h2>loading...</h2>
    
    </div>)
  }
  
}
