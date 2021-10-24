
import React, { useState } from 'react';
import { QuestionsetCreator } from './QuestionsetCreator';


export function QuizCreator() {

  const [quizname, setQuizName] = useState();
  const [quizdifficulty, setQuizDifficulty] = useState();
  const [quizlength, setQuizLength] = useState();
  const [nextpage, SetNextPage] = useState(false);




  // After values are assigned we pass the data onto the questionset functional component

  // TODO validation {field presence check, dropdown for difficulty and length?}
  
  if (nextpage) {

    return <QuestionsetCreator quizname={quizname} quizdifficulty={quizdifficulty} quizlength={quizlength} />
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


