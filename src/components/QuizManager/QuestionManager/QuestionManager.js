import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Fetch from '../../res/FetchFunc.js';
import useToken from '../../App/useToken';
import { Card } from 'react-bootstrap';
import './QuestionManager.css';
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

              console.log(questiondata.questions[currentQuestion].Questionid) 

               QuizOperations('http://localhost:8080/updateuserquestion', token, questiondata.questions[currentQuestion].Questionid, newquestion, quizid)

            }

            if (newquestionoption1) {

                QuizOperations('http://localhost:8080/updateuserquestionoption', token, questiondata.questions[currentQuestion].Options.Correctid , newquestionoption1, questiondata.questions[currentQuestion].Questionid)

            }

            if (newquestionoption2) {

                QuizOperations('http://localhost:8080/updateuserquestionoption', token, questiondata.questions[currentQuestion].Options.Incorrect1id , newquestionoption2, questiondata.questions[currentQuestion].Questionid)

            }

            if (newquestionoption3) {

                QuizOperations('http://localhost:8080/updateuserquestionoption', token, questiondata.questions[currentQuestion].Options.Incorrect2id , newquestionoption3, questiondata.questions[currentQuestion].Questionid)

            }

            if (newquestionoption4) {

                QuizOperations('http://localhost:8080/updateuserquestionoption', token, questiondata.questions[currentQuestion].Options.Incorrect3id , newquestionoption1, questiondata.questions[currentQuestion].Questionid)

            }

            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questiondata.questions.length) {
                
                SetCurrentQuestion(nextQuestion);

            } else {

                SetEndOfQuiz(true);

            }

        };

        // console.log(quizid)


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
                        <div className='score-section'>
                        <h2>Quiz has been updated</h2>
                        <div>
                            <Link to="/dashboard">Back to dashboard</Link>
                        </div>
</div>                    
                    
                    ) : (
                        <>
                            <div className='question-section'>
                                <div className='question-count'>
                                    <span>Question{currentQuestion + 1}</span>/{questiondata.questions.length}
                                </div>
                                <div className='question-text'>
                                    <Card>{questions.questionText}</Card></div>
                                    <input onChange={e => SetNewQuestion(e.target.value)} />
                            </div>
                            <div className='answer-section'>
                                {questions.answerOptions.map((answerOption, index) => (
                                    <label key={index}>{answerOption.answerText}
                                        <div />
                                        <input onChange={e => QuestionOptionChangeHandler(index, e.target.value)} />
                                    </label>

                                ))}

                            </div>
                            <button onClick={e => handleNextClick()}>Next Question</button>
                        </>
                    )}
            </div>
        );
    } else {

        return (
            <div>Loading..</div>
        )



    }
}