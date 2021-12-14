
import React, { useState } from 'react';
import { QuestionsetCreator } from './QuestionsetCreator';


export function QuizCreator() {

  const [quizname, setQuizName] = useState();
  const [quizdifficulty, setQuizDifficulty] = useState();
  const [quizlength, setQuizLength] = useState();
  const [nextpage, SetNextPage] = useState(false);



  // After values are assigned we pass the data onto the questionset functional component

  // TODO ensure we havee CSS that reflects the state of the form buttons i.e: which button is selected

  if (nextpage) {

    return <QuestionsetCreator quizname={quizname} quizdifficulty={quizdifficulty} quizlength={quizlength} />
  }
    return (
    <><div>
      <p>What will be the name of your quiz</p>
      <input type="text" onChange={e => setQuizName(e.target.value)} required />
    </div>
      <div>
        <p>How difficult is your quiz?</p>
        <div className="DifficultyButtons" />
        <button onClick={e => setQuizDifficulty('Easy')}>Easy</button>
        <button onClick={e => setQuizDifficulty('Medium')}>Medium</button>
        <button onClick={e => setQuizDifficulty('Hard')}>Hard</button>
      </div>
      <div>
        <p>What is the length of your quiz?</p>
        <div className="LengthButtons" />
        <button onClick={e => setQuizLength(5)}>5</button>
        <button onClick={e => setQuizLength(10)}>10</button>
        <button onClick={e => setQuizLength(15)}>15</button>
      </div>
      <div className="insertQuizdatabutton">
        <button onClick={e => SetNextPage(true)}>Nextpage</button>
      </div></>



  )





}


