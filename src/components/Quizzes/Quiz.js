import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import useToken from '../App/useToken.js';
import Fetch from '../res/FetchFunc'


export default function Quiz() {


	let { quizid } = useParams();
	
	const { token } = useToken();
		

		const [currentQuestion, setCurrentQuestion] = useState(0);
		const [showScore, setShowScore] = useState(false);
		const [score, setScore] = useState(0);
		const [questiondata, setQuestionData] = useState();

		// We need to declare results here in the outermost scope so we can reference it in the inner and outer scopes later on
		let results;


		useEffect(() => {

			async function getquestiondata() {


				const question = await Fetch('http://localhost:8080/retrievequestions', { token, quizid });



				setQuestionData(question);


			}

			getquestiondata();

		}, [token, quizid]);



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
			};

			//shuffle answeroptions array to randomise correct answer position
			questions.answerOptions.sort(() => Math.random() - 0.5);


			const handleAnswerOptionClick = (isCorrect) => {

				if (isCorrect) {
					setScore(score + 1);
				};

				const nextQuestion = currentQuestion + 1;

				if (nextQuestion < questiondata.questions.length) {
					setCurrentQuestion(nextQuestion);

				} else {


					setShowScore(true);


				};

			};



			// assign results after quiz is finished and send it off to our backend 
			if (showScore) {

				results = (score / questiondata.questions.length) * 100
				Fetch('http://localhost:8080/sendresults', { token, results, quizid })

			};


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
								<div className='flex flex-col'>
									
										<h1 className=' m-10 text-5xl flex  i justify-around items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '> Question {currentQuestion + 1}/{questiondata.questions.length}</h1>
									
									<h1 className=' text-3xl flex  i justify-center items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>{questions.questionText}</h1>
								
								<div className="justify-items-center  my-16 grid grid-cols-2 ">
									
									{questions.answerOptions.map((answerOption) => (
									<div className=" bg-gradient-to-br from-purple-700 to-purple-400 w-11/12 h-64  shadow-lg    rounded-lg  justify-center flex flex-col text-white text-3xl font-bold mt-5">
									<button className='h-full' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
									</div>
									))}
									</div>
								</div>
							</>
						)}
				</div>
			);
		} else {

			return (
				<div>Loading..</div>
			);

		

	};
};

