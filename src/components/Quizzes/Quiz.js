import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import useToken from '../App/useToken.js';
import Fetch from '../res/FetchFunc'


export default function Quiz() {


	async function postResults() {


		try {

			let response = await Fetch('/sendresults', { token, results, quizid })

			if (response.error) {

				alert("there was an error inserting your quiz")

			} else if (response.status === "ok") {

			}

		} catch {

			alert("A server communication error occurred")

		}

	}




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


			const question = await Fetch('/retrievequestions', { token, quizid });

			


			setQuestionData(question);


		}

		getquestiondata();

	}, [token, quizid]);


	if (questiondata) {


		const questions =
		{
			questionText: questiondata.Questions[currentQuestion].Questiontext,
			answerOptions: [
				{ answerText: questiondata.Questions[currentQuestion].Options.Correct, isCorrect: true },
				{ answerText: questiondata.Questions[currentQuestion].Options.Incorrect1, isCorrect: false },
				{ answerText: questiondata.Questions[currentQuestion].Options.Incorrect2, isCorrect: false },
				{ answerText: questiondata.Questions[currentQuestion].Options.Incorrect3, isCorrect: false },
			],
		};

		//shuffle answeroptions array to randomise correct answer position
		questions.answerOptions.sort(() => Math.random() - 0.5);


		const handleAnswerOptionClick = (isCorrect) => {

			if (isCorrect) {
				setScore(score + 1);
			};

			const nextQuestion = currentQuestion + 1;

			if (nextQuestion < questiondata.Questions.length) {

				setCurrentQuestion(nextQuestion);

			} else {


				setShowScore(true);


			};

		};


		results = (score / questiondata.Questions.length) * 100
		// assign results after quiz is finished and send it off to our backend 

		return (
			<div className='app'>
				{showScore ?
					(

						<div className='flex flex-col'>

							<h2 className=' m-10 text-5xl flex  i justify-around items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>You scored {results}% ({(score)}/{questiondata.Questions.length})</h2>
							<Link onClick={() => postResults()} className='rounded-xl px-2 py-1  bg-purple-600 text-white mx-auto  ' to="/dashboard">To Dashboard</Link>
						</div>

					) : (

						<>
							<div className='flex flex-col'>

								<h1 className=' m-10 text-5xl flex  i justify-around items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '> Question {currentQuestion + 1}/{questiondata.Questions.length}</h1>

								<h1 className=' text-3xl flex  i justify-center items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>{questions.questionText}</h1>

								<div className="justify-items-center  my-16 grid grid-cols-2 ">

									{questions.answerOptions.map((answerOption, index) => (
										<div key={index} className=" bg-gradient-to-br from-purple-700 to-purple-400 w-11/12 h-64  shadow-lg    rounded-lg  justify-center flex flex-col text-white text-3xl font-bold mt-5">
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

