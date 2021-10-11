import React, { useState } from 'react';
import PropTypes from 'prop-types';
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





export function QuizCreator({setQuizid}) {

  const { token } = useToken();

  const [quizname, setQuizName] = useState();
  


  async function getQuizID() {
    var response = await insertquizfunction({ token, quizname });

    try {

      if (response.error) {


        alert("there was an error inserting your quiz")


      }
      else if (response.id) {

        setQuizid(response.id)
        
    

       return <QuestionsetCreator  />
   

       


      }
    } catch {

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

QuizCreator.propTypes = {
  setQuizid: PropTypes.func.isRequired
};
