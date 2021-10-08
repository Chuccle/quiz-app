import React, { useState } from 'react';
import useToken from '../App/useToken';



async function insertquizfunction(quizdata) {

  return fetch('http://localhost:8080/insertquiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'

    },

    body: JSON.stringify(quizdata)

  })

    .then(data => data.json())

}




export function QuizCreator() {

  const { token } = useToken();
  const [quizid, SetQuizId] = useState();
  const [quizname, setQuizName] = useState();



  async function getQuizID() {
    var response = await insertquizfunction({ token, quizname });

    try {

      if (response.error) {


        alert("there was an error inserting your quiz")


      }
      else if (response.id) {

        SetQuizId(response.id)


      }
    } catch {

      alert("A server communication error occurred")


    }
  }

  console.log(quizid)



  return (
    <><div>
      <p>What will be the name of your quiz</p>
      <input type="text" onChange={e => setQuizName(e.target.value)} />
    </div>
      <div className="insertQuizdatabutton">
        <button onClick={e => getQuizID()}>slub</button>
      </div></>


  )





}

