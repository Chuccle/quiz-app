import React, { useState } from 'react';
import useToken from '../App/useToken';
import { QuestionsetCreator } from './QuestionsetCreator';



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

  const [quizid, setQuizid] = useState()

  const [quizname, setQuizName] = useState();

  if (quizid) {

    //after quizid is assigned we pass the data onto the questionset functional component


    return <QuestionsetCreator quizid={quizid} />


  }



  async function getQuizID() {
    
    try {
    
      var response = await insertquizfunction({ token, quizname });

    

      if (response.error) {

      //if server returns an error with the data i.e: because of referential integrity conflict
      
        alert("there was an error inserting your quiz")


      }
      else if (response.id) {
        //if server fetch returns expected response we assign the object daya to quizid

        setQuizid(response.id)







      }
    } catch {

      //if fetch request error occurs
      alert("A server communication error occurred")


    }
  }





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


