
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

function DificultyHighlightButtons() {


if (quizdifficulty === 'Easy') {

  return <><button className='mx-16 bg-white rounded-md py-1 px-5 text-purple-600 font-bold border border-black' id='easy' onClick={e => setQuizDifficulty('Easy')}>Easy</button><button className='bg-purple-500 rounded-md py-1 px-2 text-white font-bold' id='medium' onClick={e => setQuizDifficulty('Medium')}>Medium</button><button className='mx-16 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' id='hard' onClick={e => setQuizDifficulty('Hard')}>Hard</button></>
}

if (quizdifficulty === 'Medium') {     


  return <><button className='mx-16 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' id='easy' onClick={e => setQuizDifficulty('Easy')}>Easy</button><button className='bg-white rounded-md py-1 px-2 text-purple-600 font-bold border border-black' id='medium' onClick={e => setQuizDifficulty('Medium')}>Medium</button><button className='mx-16 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' id='hard' onClick={e => setQuizDifficulty('Hard')}>Hard</button></>
}

if (quizdifficulty === 'Hard') {

  return <><button className=' mx-16 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' id='easy' onClick={e => setQuizDifficulty('Easy')}>Easy</button><button className='bg-purple-500 rounded-md py-1 px-2 text-white font-bold' id='medium' onClick={e => setQuizDifficulty('Medium')}>Medium</button><button className='mx-16 bg-white rounded-md py-1 px-5 text-purple-600 font-bold border border-black' id='hard' onClick={e => setQuizDifficulty('Hard')}>Hard</button></>
}

     return  <><button className='mx-16 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' id='easy' onClick={e => setQuizDifficulty('Easy')}>Easy</button><button className='bg-purple-500 rounded-md py-1 px-2 text-white font-bold' id='medium' onClick={e => setQuizDifficulty('Medium')}>Medium</button><button className='mx-16 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' id='hard' onClick={e => setQuizDifficulty('Hard')}>Hard</button></>
          
}




function LengthHighlightButtons() {


  if (quizlength === 5) {

    return <> 
    <button className='mx-20 bg-white rounded-md py-1 px-6 text-purple-500 font-bold border border-black' onClick={e => setQuizLength(5)}>5</button>
     <button className='bg-purple-500 rounded-md py-1 px-5 text-white font-bold' onClick={e => setQuizLength(10)}>10</button>
     <button className='mx-20 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' onClick={e => setQuizLength(15)}>15</button></>
  }
  
  if (quizlength === 10) {     
  
  
    return <> 
    <button className='mx-20 bg-purple-500 rounded-md py-1 px-6 text-white font-bold' onClick={e => setQuizLength(5)}>5</button>
     <button className='bg-white rounded-md py-1 px-5 text-purple-500 font-bold border border-black' onClick={e => setQuizLength(10)}>10</button>
     <button className='mx-20 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' onClick={e => setQuizLength(15)}>15</button></>
  }
  
  if (quizlength === 15) {
   
    return <> 
      <button className='mx-20 bg-purple-500 rounded-md py-1 px-6 text-white font-bold' onClick={e => setQuizLength(5)}>5</button>
       <button className='bg-purple-500 rounded-md py-1 px-5 text-white font-bold' onClick={e => setQuizLength(10)}>10</button>
       <button className='mx-20 bg-white rounded-md py-1 px-5 text-purple-600 font-bold border border-black' onClick={e => setQuizLength(15)}>15</button>
       </>
  }
  
       return  <> 
      <button className='mx-20 bg-purple-500 rounded-md py-1 px-6 text-white font-bold' onClick={e => setQuizLength(5)}>5</button>
       <button className='bg-purple-500 rounded-md py-1 px-5 text-white font-bold' onClick={e => setQuizLength(10)}>10</button>
       <button className='mx-20 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' onClick={e => setQuizLength(15)}>15</button></>
            
  }



      return (

        <>
          <div className='flex'>
            <h1 className='mx-56 my-80 text-6xl  text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>Create your Quiz</h1>

            <div class=" mx-40  my-16  box-border flex-nowrap  p-20 
                border-2 bg-white rounded-lg">

              <div>
                <p className='text-2xl mx-44 '>Quiz name?</p>

                <input className='border mx-36 my-10 border-black' type="text" onChange={e => setQuizName(e.target.value)} required />
              </div>
              <div>
                <p className='text-2xl my-10 mx-40'>Quiz difficulty?</p>

 <DificultyHighlightButtons />
              </div>
              <div className='my-10'>
                <p className='text-2xl my-10 mx-44'>Quiz length?</p>
                <LengthHighlightButtons/>
              </div>
              <button className='my-12 mx-52 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' onClick={e => SetNextPage(true)}>Submit</button>

            </div>
          </div>
        </>

      )





  }


