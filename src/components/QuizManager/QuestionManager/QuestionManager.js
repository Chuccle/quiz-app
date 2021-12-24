import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fetch from '../../res/FetchFunc.js';
import useToken from '../../App/useToken';
import QuizOperations from '../res/QuizOperations.js';



export default function QuestionManager({ quizid }) {


    const { token } = useToken()


    const [currentQuestion, SetCurrentQuestion] = useState(0);
    const [questiondata, SetQuestionData] = useState()
    const [endofquiz, SetEndOfQuiz] = useState(false);
    //  const [newquestionoptionarray, SetNewQuestionOptionArray] = useState([false, false, false, false]);
    const [newquestion, SetNewQuestion] = useState();
    const [newquestionoption1, SetNewQuestionOption1] = useState();
    const [newquestionoption2, SetNewQuestionOption2] = useState();
    const [newquestionoption3, SetNewQuestionOption3] = useState();
    const [newquestionoption4, SetNewQuestionOption4] = useState();



    // We need to declare results here in the outermost scope so we can reference it in the inner and outer scopes later on


    useEffect(() => {

        async function getquestiondata() {


            const question = await Fetch('http://localhost:8080/retrievequestions', { token, quizid })


            SetQuestionData(question)


        }

        getquestiondata()

    }, [token, quizid])



    if (questiondata) {



        const questions = {
            
            questionText: questiondata.questions[currentQuestion].Questiontext,
            answerOptions: [
                { answerText: questiondata.questions[currentQuestion].Options.Correct, isCorrect: true },
                { answerText: questiondata.questions[currentQuestion].Options.Incorrect1, isCorrect: false },
                { answerText: questiondata.questions[currentQuestion].Options.Incorrect2, isCorrect: false },
                { answerText: questiondata.questions[currentQuestion].Options.Incorrect3, isCorrect: false },
            ],
        }


        function handleNextClick() {

            if (newquestion) {


                QuizOperations('http://localhost:8080/updateuserquestion', token, questiondata.questions[currentQuestion].Questionid, newquestion, quizid)

            }

            if (newquestionoption1) {

                QuizOperations('http://localhost:8080/updateuserquestionoption', token, questiondata.questions[currentQuestion].Options.Correctid, newquestionoption1, questiondata.questions[currentQuestion].Questionid)

            }

            if (newquestionoption2) {

                QuizOperations('http://localhost:8080/updateuserquestionoption', token, questiondata.questions[currentQuestion].Options.Incorrect1id, newquestionoption2, questiondata.questions[currentQuestion].Questionid)

            }

            if (newquestionoption3) {

                QuizOperations('http://localhost:8080/updateuserquestionoption', token, questiondata.questions[currentQuestion].Options.Incorrect2id, newquestionoption3, questiondata.questions[currentQuestion].Questionid)

            }

            if (newquestionoption4) {

                QuizOperations('http://localhost:8080/updateuserquestionoption', token, questiondata.questions[currentQuestion].Options.Incorrect3id, newquestionoption4, questiondata.questions[currentQuestion].Questionid)

            }


            document.getElementById("changeAnswer").reset();


            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questiondata.questions.length) {

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

            // TODO use lodash here later to make this work because it pains me hard coding a usestate for each option 
            
            // switch (index) {

            //     case 0: SetNewQuestionOptionArray(newquestionoptionarray[0] = newquestionoption);
            //         break;
            //     case 1: SetNewQuestionOptionArray(newquestionoptionarray[1] = newquestionoption);
            //         break;
            //     case 2: SetNewQuestionOptionArray(newquestionoption);
            //         break;
            //     case 3: SetNewQuestionOptionArray(newquestionoption);
            //         break;
            //     default:
            //         console.log("default")

            // }

        }

        return (
            <div className='app'>
                {endofquiz ?
                    (
                        <div className='flex flex-col'>
                            <h2 className=' m-5 text-5xl flex justify-around items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>Quiz has been updated</h2>
                            
                                <Link className='mx-auto bg-purple-500 rounded-md py-1 px-5 my-8 w-60 h-24 text-2xl text-white font-bold text-center   '  to="/dashboard">Back to dashboard</Link>
                        
                        </div>

                    ) : (
                        <div className='flex flex-col'>
                            <form id='changeAnswer'>
                                <div className='flex flex-col'>
                                    <h1 className=' m-5 text-5xl flex justify-around items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '> Question {currentQuestion + 1}/{questiondata.questions.length}</h1>
                                
                                    <h1 className=' text-3xl flex justify-center items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>{questions.questionText}</h1>

                                    <input className=' text-xl text-gray-base w-6/12  h-8 mt-5  mx-auto 
                               p-5 px-4  border-2 border-purple-400 rounded-lg bg-transparent outline-none
                                mb-2 ' type="text" onChange={e => SetNewQuestion(e.target.value)} />
                                </div>
                                <div className="border border-black mx-auto w-1/4 rounded-md flex flex-auto" >
                                <h1 className=' mx-auto text-2xl   text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>Input your changes to the question. <br/> The first option is the correct answer   </h1> 
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