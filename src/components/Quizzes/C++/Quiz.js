import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import '../Quiz.css'
import useToken from '../../App/useToken';

async function fetchQuestions(data) {

	return fetch('http://localhost:8080/retrievequestions', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
  
	  },
  
	  body: JSON.stringify(data)
  
	})
  
	  .then(data => data.json())
  
  }
  




export default function Quiz() {


const {token} = useToken()
	const quizdata = useLocation()
	const quizid = quizdata.state.quizid
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [questiondata, setQuestionData] = useState()
	
	
	
	
async function getquestiondata () {

		if (!questiondata) {
		const question = await fetchQuestions({token, quizid}) 

   

 setQuestionData(question)


 console.log (question)
}
	}



	getquestiondata()
		



const questions = [
	{
		questionText: 'What is type of programming language is C++?',
		answerOptions: [
			{ answerText: 'Procedural-oriented', isCorrect: false },
			{ answerText: 'Functional', isCorrect: false },
			{ answerText: 'Object-oriented', isCorrect: true },
			{ answerText: 'Scripting', isCorrect: false },
		],
	},
	
];


	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);

		} else {
			setShowScore(true);
		}
	};
	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button className='quizbutton' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}


