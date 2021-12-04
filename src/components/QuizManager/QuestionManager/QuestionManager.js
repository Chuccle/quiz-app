import React, { useState, useEffect, Link } from 'react';
import Fetch from '../../res/FetchFunc.js';
import useToken from '../../App/useToken';
import { Card} from 'react-bootstrap'




export default function QuestionManager({quizid}) {


const { token } = useToken()
		

const [currentQuestion, SetCurrentQuestion] = useState(0);
const [questiondata, SetQuestionData] = useState()
const [endofquiz, SetEndOfQuiz] = useState(false);

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


    function handleClick() {


        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questiondata.questions.length) {
            SetCurrentQuestion(nextQuestion);

        } else {

    SetEndOfQuiz(true);


        }

    };

console.log(quizid)

    // assign results after quiz is finished and send it off to our backend 
    

    return (
        <div className='app'>
            {endofquiz ?
                (

        
                       <div>
                            <Link to="/dashboard">Back to dashboard</Link>
                        </div>   

                ) : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question{currentQuestion + 1}</span>/{questiondata.questions.length}
                            </div>
                            <div className='question-text'>
                                <Card>{questions.questionText}</Card></div>
                        </div>
                        <div className='answer-section'>
                        {questions.answerOptions.map((answerOption) => (
                                <Card>{answerOption.answerText}</Card>
                                ))}
                        </div>
                        <button onClick={e => handleClick() }>Next Question</button>
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