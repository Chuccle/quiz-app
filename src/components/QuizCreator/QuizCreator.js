import { get } from 'core-js/core/dict';
import React, { useState } from 'react';
import useToken from '../App/useToken';
import { QuestionsetCreator } from './QuestionsetCreator';



//async function insertquizfunction(quizdata) {

  //return fetch('http://localhost:8080/insertquiz', {
    //method: 'POST',
    //headers: {
      //'Content-Type': 'application/json'

   // },
//
  //  body: JSON.stringify(quizdata)

  //})
//
 ///   .then(data => data.json())

//}





export function QuizCreator() {

  const [quizname, setQuizName] = useState();
  const [quizdifficulty, setQuizDifficulty] = useState();
  const [quizlength, setQuizLength] = useState();
  const [nextpage, SetNextPage ] = useState(false);




    //after quizid is assigned we pass the data onto the questionset functional component
if (nextpage) {

    return <QuestionsetCreator quizdata={quizname, quizdifficulty, quizlength } />
}

  




  return (
    <><div>
      <p>What will be the name of your quiz</p>
      <input type="text" onChange={e => setQuizName(e.target.value)} />
    </div>
    <div>
    <p>How difficult is your quiz?</p>
      <input type="text" onChange={e => setQuizDifficulty(e.target.value)} />
    </div>    
    <div>
    <p>What is the length of your quiz?</p>
      <input type="text" onChange={e => setQuizLength(e.target.value)} />
    </div>
      <div className="insertQuizdatabutton">
        <button onClick={e => SetNextPage(true)}>slub</button>
      </div></>



  )





}


