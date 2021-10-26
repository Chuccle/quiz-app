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
	console.log(quizdata.state.quizid)
	const quizid = quizdata.state.quizid
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [questiondata, setQuestionData] = useState()
	
	
	
	
	
	
	
	
	useEffect(() => {
		if (!questiondata) {
	async function getquestiondata () {


   const question = await fetchQuestions({token, quizid}) 

 

 setQuestionData(question)


}

getquestiondata()
		}
		})

		
	


		


if (questiondata) {
	console.log (questiondata.questions.length)
		
const questions = 
	{
		questionText: questiondata.questions[currentQuestion].Questiontext,
		answerOptions: [
			{ answerText: questiondata.questions[currentQuestion].Options.Correct, isCorrect: true},
			{ answerText: questiondata.questions[currentQuestion].Options.Incorrect1, isCorrect: false },
			{ answerText: questiondata.questions[currentQuestion].Options.Incorrect2, isCorrect: false },
			{ answerText: questiondata.questions[currentQuestion].Options.Incorrect3, isCorrect: false },
		],
	}
	


	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questiondata.questions.length) {
			setCurrentQuestion(nextQuestion);

		} else {
			setShowScore(true);
		}
	};



	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questiondata.questions.length}
				</div>
			) : (
				<>
				<div className='question-section'>					
					<div className='question-count'>
							<span>Question{currentQuestion + 1}</span>/{questiondata.questions.length}
						</div>
						<div className='question-text'>{questions.questionText}</div>
					</div>
					<div className='answer-section'>
						{questions.answerOptions.map((answerOption) => (
							<button className='quizbutton' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
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

