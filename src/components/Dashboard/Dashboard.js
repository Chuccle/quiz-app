import React, { useState } from 'react';
import './Dashboard.css';
import useToken from '../App/useToken';


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
  const [email, SetEmail] = useState()
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
        SetEmail(userStats.results[0].email)
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
<p>your data is: {email}, {username}, {id}  </p>

  </div>
  );


}