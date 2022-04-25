
import React, { useState } from 'react';
import { QuestionsetCreator } from './QuestionsetCreator';


export function QuizCreator() {

  const [quizname, setQuizName] = useState();
  const [quizdifficulty, setQuizDifficulty] = useState();
  const [quizlength, setQuizLength] = useState();
  const [nextpage, setNextPage] = useState(false);


  // After values are assigned we pass the data onto the questionset functional component

  // TODO ensure we havee CSS that reflects the state of the form buttons i.e: which button is selected

  function handleSubmit(event) {

    //needed else the form triggers component rerender
    event.preventDefault();


    if (quizdifficulty && quizlength) {

      setNextPage(true);
    }

    else {

      alert("Please select a difficulty and length")

    }

  }

  if (nextpage) {

    return <QuestionsetCreator quizname={quizname} quizdifficulty={quizdifficulty} quizlength={quizlength} />

  }

  function DificultyHighlightButtons() {

    return <>

      <button type="button"

        className={`${quizdifficulty === "Easy" && "border-black bg-opacity-0 text-purple-600 font-bold border"

          } mx-5  bg-purple-500 rounded-md py-1 px-5 text-white font-bold`}

        onClick={() => {

          setQuizDifficulty("Easy");

        }}>Easy

      </button>


      <button

        type="button"

        className={`${quizdifficulty === "Medium" && "border-black bg-opacity-0 text-purple-600 font-bold border"

          } mx-5  bg-purple-500 rounded-md py-1 px-5 text-white font-bold`}
        onClick={() => {

          setQuizDifficulty("Medium");

        }}>Medium

      </button>


      <button type="button"

        className={`${quizdifficulty === "Hard" && "border-black bg-opacity-0 text-purple-600 font-bold border"

          } mx-5  bg-purple-500 rounded-md py-1 px-5 text-white font-bold`}

        onClick={() => {

          setQuizDifficulty("Hard");

        }}>Hard

      </button>


    </>

  }


  function LengthHighlightButtons() {

    return <>

      <button type="button"

        className={`${quizlength === 5 && "border-black bg-opacity-0 text-purple-600 font-bold border"

          } mx-5  bg-purple-500 rounded-md py-1 px-5 text-white font-bold`}

        onClick={() => {

          setQuizLength(5);

        }}>5

      </button>


      <button type="button"

        className={`${quizlength === 10 && "border-black bg-opacity-0 text-purple-600 font-bold border"

          } mx-5  bg-purple-500 rounded-md py-1 px-5 text-white font-bold`}

        onClick={() => {

          setQuizLength(10);

        }}>10

      </button>


      <button

        type="button"

        className={`${quizlength === 15 && "border-black bg-opacity-0 text-purple-600 font-bold border"

          } mx-5  bg-purple-500 rounded-md py-1 px-5 text-white font-bold`}

        onClick={() => {

          setQuizLength(15);

        }}>

        15

      </button>

    </>


  }

  return (

    <>
      <div className='flex my-32'>
        <h1 className='text-6xl flex w-1/2  i justify-around items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>Create your Quiz</h1>

        <div className=" flex w-1/2 justify-center items-center">
          <form className='flex-nowrap border-black border-2 p-4 rounded-xl' onSubmit={e => handleSubmit(e)}>
            <div className='flex my-10' >
              <p className='text-2xl '>Quiz name?</p>
              <input className='mx-10 border rounded-md border-black  ' type="text" onChange={e => setQuizName(e.target.value)} required />
            </div>
            <div className='flex my-40' >
              <p className='flex text-2xl  justify-center '>Quiz difficulty?</p>

              <DificultyHighlightButtons />



            </div>
            <div className='my-10 flex'>
              <p className='text-2xl  justify-center '>Quiz length?</p>
              <LengthHighlightButtons />

            </div>

            <button type="submit" className='my-12 mx-52 bg-purple-500 rounded-md py-1 px-5 text-white font-bold'>To questions</button>
          </form>
        </div>
      </div>
    </>

  )

}


