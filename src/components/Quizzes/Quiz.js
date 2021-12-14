import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import './Quiz.css'
import useToken from '../App/useToken.js';
import Fetch from '../res/FetchFunc'


export default function Quiz() {


	let { quizid } = useParams();

	console.log(quizid);
	
	const { token } = useToken()
		

		const [currentQuestion, setCurrentQuestion] = useState(0);
		const [showScore, setShowScore] = useState(false);
		const [score, setScore] = useState(0);
		const [questiondata, setQuestionData] = useState()

		// We need to declare results here in the outermost scope so we can reference it in the inner and outer scopes later on
		let results


		useEffect(() => {

			async function getquestiondata() {


				const question = await Fetch('http://localhost:8080/retrievequestions', { token, quizid })



				setQuestionData(question)


			}

			getquestiondata()

		}, [token, quizid])



		if (questiondata) {


			const questions =
			{
				questionText: questiondata.questions[currentQuestion].Questiontext,
				answerOptions: [
					{ answerText: questiondata.questions[currentQuestion].Options.Correct, isCorrect: true },
					{ answerText: questiondata.questions[currentQuestion].Options.Incorrect1, isCorrect: false },
					{ answerText: questiondata.questions[currentQuestion].Options.Incorrect2, isCorrect: false },
					{ answerText: questiondata.questions[currentQuestion].Options.Incorrect3, isCorrect: false },
				],
			}

			//shuffle answeroptions array to randomise correct answer position
			questions.answerOptions.sort(() => Math.random() - 0.5);


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



			// assign results after quiz is finished and send it off to our backend 
			if (showScore) {

				results = (score / questiondata.questions.length) * 100
				Fetch('http://localhost:8080/sendresults', { token, results, quizid })

			}


			return (
				<div className='app'>
					{showScore ?
						(

							<div className='score-section'>
								You scored {results}% ({(score)}/{questiondata.questions.length})
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

