import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fetch from '../../res/FetchFunc.js';
import useToken from '../../App/useToken';




export default function QuestionManager({ quizid }) {


    const { token } = useToken()


    const [currentQuestion, SetCurrentQuestion] = useState(0);
    const [questiondata, SetQuestionData] = useState()
    const [endofquiz, SetEndOfQuiz] = useState(false);
    const [newquestion, SetNewQuestion] = useState();
    const [newquestionoption1, SetNewQuestionOption1] = useState();
    const [newquestionoption2, SetNewQuestionOption2] = useState();
    const [newquestionoption3, SetNewQuestionOption3] = useState();
    const [newquestionoption4, SetNewQuestionOption4] = useState();



    // We need to declare results here in the outermost scope so we can reference it in the inner and outer scopes later on

    useEffect(() => {

        async function getquestiondata() {


            const response = await Fetch(`/retrievequestions/quiz=${quizid}`, {}, 'GET')


            if (response.Questions) {

                SetQuestionData(response)

            } else {

                alert("A server error has occurred");

            }
        }

        getquestiondata()

    }, [token, quizid])



    if (questiondata) {

        const questions = {

            questionText: questiondata.Questions[currentQuestion].Questiontext,
            answerOptions: [
                { answerText: questiondata.Questions[currentQuestion].Options.Correct, isCorrect: true },
                { answerText: questiondata.Questions[currentQuestion].Options.Incorrect1, isCorrect: false },
                { answerText: questiondata.Questions[currentQuestion].Options.Incorrect2, isCorrect: false },
                { answerText: questiondata.Questions[currentQuestion].Options.Incorrect3, isCorrect: false },
            ],
        }

        function handleNextClick() {

            if (newquestion) {

                Fetch('/updateuserquestion',
                    {
                        id: questiondata.Questions[currentQuestion].Questionid,
                        question: newquestion, quizid
                    }, 'PUT')
            }

            if (newquestionoption1) {

                Fetch('/updateuserquestionoption', {
                    questiontext: newquestionoption1,
                    id: questiondata.Questions[currentQuestion].Options.Correctid,
                    questionid: questiondata.Questions[currentQuestion].Questionid
                }, 'PUT')

            }

            if (newquestionoption2) {

                Fetch('/updateuserquestionoption', {
                    questiontext: newquestionoption2,
                    id: questiondata.Questions[currentQuestion].Options.Incorrect1id,
                    questionid: questiondata.Questions[currentQuestion].Questionid
                }, 'PUT')

            }

            if (newquestionoption3) {

                Fetch('/updateuserquestionoption', {
                    questiontext: newquestionoption3,
                    id: questiondata.Questions[currentQuestion].Options.Incorrect2id,
                    questionid: questiondata.Questions[currentQuestion].Questionid
                }, 'PUT')

            }

            if (newquestionoption4) {

                Fetch('/updateuserquestionoption', {
                    questiontext: newquestionoption4,
                    id: questiondata.Questions[currentQuestion].Options.Incorrect3id,
                    questionid: questiondata.Questions[currentQuestion].Questionid
                }, 'PUT')

            }


            document.getElementById("changeAnswer").reset();


            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questiondata.Questions.length) {

                SetCurrentQuestion(nextQuestion);

            } else {

                SetEndOfQuiz(true);

            }

        };


        function QuestionOptionChangeHandler(index, newquestionoption) {



            switch (index) {

                case 0: SetNewQuestionOption1(newquestionoption);
                    break;
                case 1: SetNewQuestionOption2(newquestionoption);
                    break;
                case 2: SetNewQuestionOption3(newquestionoption);
                    break;
                case 3: SetNewQuestionOption4(newquestionoption);
                    break;
                default:
                    console.log("default")

            }
        }

        return (
            <div className='app'>
                {endofquiz ?
                    (
                        <div className='flex flex-col'>
                            <h2 className=' m-5 text-5xl flex justify-around items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>Quiz has been updated</h2>

                            <Link className='mx-auto bg-purple-500 rounded-md py-1 px-5 my-8 w-60 h-24 text-2xl text-white font-bold text-center   ' to="/dashboard">Back to dashboard</Link>

                        </div>

                    ) : (
                        <div className='flex flex-col'>
                            <form id='changeAnswer'>
                                <div className='flex flex-col'>
                                    <h1 className=' m-5 text-5xl flex justify-around items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '> Question {currentQuestion + 1}/{questiondata.Questions.length}</h1>

                                    <h1 className=' text-3xl flex justify-center items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>{questions.questionText}</h1>

                                    <input className=' text-xl text-gray-base w-6/12  h-8 mt-5  mx-auto 
                               p-5 px-4  border-2 border-purple-400 rounded-lg bg-transparent outline-none
                                mb-2 ' type="text" onChange={e => SetNewQuestion(e.target.value)} />
                                </div>
                                <div className="border border-black mx-auto w-1/4 rounded-md flex flex-auto" >
                                    <h1 className=' mx-auto text-2xl   text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>Input your changes to the response. <br /> The first option is the correct answer   </h1>
                                </div>
                                <div className="justify-items-center mt-4  grid grid-cols-2 " >
                                    {questions.answerOptions.map((answerOption, index) => (

                                        <div className=" bg-gradient-to-br from-purple-700 to-purple-400 w-11/12 h-64 mt-5   shadow-lg  rounded-lg justify-center flex flex-col" >
                                            <label className="text-white text-center p-10 text-3xl font-bold" key={index}>{answerOption.answerText} </label>

                                            <input className="text-black   w-6/12 mx-auto rounded-lg" onChange={e => QuestionOptionChangeHandler(index, e.target.value)} />

                                        </div>
                                    ))}

                                </div>

                            </form>
                            <button className='mx-auto bg-purple-500 rounded-md py-1 px-5 my-8 w-60 h-24 text-2xl text-white font-bold ' onClick={e => handleNextClick()}>Next Question</button>

                        </div>
                    )}
            </div>
        );
    } else {

        return (
            <div>Loading..</div>
        )
    }
}