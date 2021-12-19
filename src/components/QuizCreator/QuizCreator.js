
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

  return <><button className='mx-5 bg-white rounded-md py-1 px-5 text-purple-600 font-bold border border-black' id='easy' onClick={e => setQuizDifficulty('Easy')}>Easy</button><button className='bg-purple-500 rounded-md py-1 px-2 text-white font-bold' id='medium' onClick={e => setQuizDifficulty('Medium')}>Medium</button><button className='mx-5 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' id='hard' onClick={e => setQuizDifficulty('Hard')}>Hard</button></>
}

else if (quizdifficulty === 'Medium') {     


  return <><button className='mx-5 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' id='easy' onClick={e => setQuizDifficulty('Easy')}>Easy</button><button className='bg-white rounded-md py-1 px-2 text-purple-600 font-bold border border-black' id='medium' onClick={e => setQuizDifficulty('Medium')}>Medium</button><button className='mx-5 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' id='hard' onClick={e => setQuizDifficulty('Hard')}>Hard</button></>
}

else if (quizdifficulty === 'Hard') {

  return <><button className=' mx-5 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' id='easy' onClick={e => setQuizDifficulty('Easy')}>Easy</button><button className='bg-purple-500 rounded-md py-1 px-2 text-white font-bold' id='medium' onClick={e => setQuizDifficulty('Medium')}>Medium</button><button className='mx-5 bg-white rounded-md py-1 px-5 text-purple-600 font-bold border border-black' id='hard' onClick={e => setQuizDifficulty('Hard')}>Hard</button></>
}

 
 return  <><button required className='mx-5 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' id='easy' onClick={e => setQuizDifficulty('Easy')}>Easy</button><button required className='bg-purple-500 rounded-md py-1 px-2 text-white font-bold' id='medium' onClick={e => setQuizDifficulty('Medium')}>Medium</button><button required className='mx-5 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' id='hard' onClick={e => setQuizDifficulty('Hard')}>Hard</button></>
  
}




function LengthHighlightButtons() {


  if (quizlength === 5) {

    return <> 
     <button required className='mx-5 bg-white rounded-md py-1 px-6 text-purple-500 font-bold border border-black' onClick={e => setQuizLength(5)}>5</button>
     <button className='bg-purple-500 rounded-md py-1 px-5 text-white font-bold' onClick={e => setQuizLength(10)}>10</button>
     <button className='mx-5 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' onClick={e => setQuizLength(15)}>15</button></>
  }
  
  else if (quizlength === 10) {     
  
  
    return <> 
     <button className=' mx-5 bg-purple-500 rounded-md py-1 px-6 text-white font-bold' onClick={e => setQuizLength(5)}>5</button>
     <button className='bg-white rounded-md py-1 px-5 text-purple-500 font-bold border border-black' onClick={e => setQuizLength(10)}>10</button>
     <button className='mx-5 bg-purple-500 rounded-md py-1 px-5 text-white font-bold' onClick={e => setQuizLength(15)}>15</button></>
  }
  
 else if (quizlength === 15) {
   
    return <> 
       <button className='mx-5 bg-purple-500 rounded-md py-1 px-6 text-white font-bold' onClick={e => setQuizLength(5)}>5</button>
       <button className='bg-purple-500 rounded-md py-1 px-5 text-white font-bold' onClick={e => setQuizLength(10)}>10</button>
       <button  className='mx-5 bg-white rounded-md py-1 px-5 text-purple-600 font-bold border border-black' onClick={e => setQuizLength(15)}>15</button>
       </>
  }
  
  return  <> 
       <button  className='  mx-5 bg-purple-500 rounded-md py-1 px-6 text-white font-bold' onClick={e => setQuizLength(5)}>5</button>
       <button  className=' bg-purple-500 rounded-md py-1 px-5 text-white font-bold' onClick={e => setQuizLength(10)}>10</button>
       <button  className=' mx-5  bg-purple-500 rounded-md py-1 px-5 text-white font-bold' onClick={e => setQuizLength(15)}>15</button></>
            
  
}



      return (

        <>
          <div className='flex my-32'>
            <h1 className='text-6xl flex w-1/2  i justify-around items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>Create your Quiz</h1>

            <div class=" flex w-1/2 justify-center items-center">
<form className='flex-nowrap border-black border-2 p-4 rounded-xl' onSubmit={e => SetNextPage(true)}>
              <div className='flex my-10' >
                 <p className='text-2xl '>Quiz name?</p>
                <input  className='mx-10 border rounded-md border-black  ' type="text" onChange={e => setQuizName(e.target.value)} required />
              </div>
              <div className='flex my-40' >
                <p className='flex text-2xl  justify-center '>Quiz difficulty?</p>

 <DificultyHighlightButtons />
              </div>
              <div className='my-10 flex'>
                <p className='text-2xl  justify-center '>Quiz length?</p>
                <LengthHighlightButtons/>
             
              </div>
             
              <button type="submit" className='my-12 mx-52 bg-purple-500 rounded-md py-1 px-5 text-white font-bold'>To questions</button>
              </form>
            </div>
          </div>
        </>

      )





  }


