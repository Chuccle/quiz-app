import { useState } from "react";
import useToken from '../App/useToken';
import Fetch from '../res/FetchFunc'
import { Link } from 'react-router-dom';


export function QuestionsetCreator({ quizname, quizdifficulty, quizlength }) {

    const { token } = useToken();
    const [questionname, setQuestionName] = useState();
    const [incorrect1, setIncorrect1] = useState();
    const [incorrect2, setIncorrect2] = useState();
    const [incorrect3, setIncorrect3] = useState();
    const [correct, setCorrect] = useState();
    const [questionset, SetQuestionSet] = useState([])
    const [questionnumber, setQuestionNumber] = useState(0);


    async function postQuestionset() {

        const response = await Fetch('/insertquiz', { questionset, token });

        if (response.error) {
           
            alert("there was an error inserting your quiz")
        
        }

    }


    function handleSubmit(event) {
        //needed else the form triggers component rerender
        event.preventDefault();


        setQuestionNumber(prevQuestionNumber => prevQuestionNumber + 1)


        const quizdata = {
            Quizname: quizname,
            Difficulty: quizdifficulty,
            Questionset: {
                Questionname: questionname,
                Options: {
                    Incorrect1: incorrect1,
                    Incorrect2: incorrect2,
                    Incorrect3: incorrect3,
                    Correct: correct
                }
            }
        }

        SetQuestionSet(questionset => [...questionset, quizdata]);

        document.getElementById("QuestionForm").reset();

    }


    if (quizlength > questionnumber) {

        return (
            <div>

                <form id="QuestionForm" className='flex flex-col' onSubmit={e => handleSubmit(e)} >
                    <h1 className=' m-10 text-5xl flex  i justify-around items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>Question {questionnumber + 1} </h1>

                    <input required className=' text-xl text-gray-base w-6/12  h-8   mx-auto 
                               p-5 px-4  border-2 border-purple-400 rounded-lg bg-transparent outline-none
                                mb-2 ' type="text" onChange={e => setQuestionName(e.target.value)} />

                    <div className="justify-items-center  my-16 grid grid-cols-2 ">
                        <div className=" bg-gradient-to-br from-purple-700 to-purple-400 w-11/12 h-64  shadow-lg    rounded-lg  justify-center flex flex-col">
                            <p className="text-white text-center p-10 text-3xl font-bold">Incorrect option 1:</p>
                            <input required className="text-black  w-6/12 mx-auto rounded-lg" type="text" onChange={e => setIncorrect1(e.target.value)} />
                        </div>

                        <div className=" bg-gradient-to-br from-purple-700 to-purple-400 w-11/12 h-64    shadow-lg  rounded-lg justify-center flex flex-col " >
                            <p className="text-white text-center p-10 text-3xl font-bold">Incorrect option 2:</p>
                            <input required className="text-black   w-6/12 mx-auto rounded-lg" type="text" onChange={e => setIncorrect2(e.target.value)} />
                        </div>

                        <div className=" bg-gradient-to-br from-purple-400 to-purple-700 w-11/12 h-64 mt-5  shadow-lg    rounded-lg justify-center flex flex-col ">
                            <p className="text-white text-center p-10 text-3xl font-bold">Incorrect option 3:</p>
                            <input required className="text-black   w-6/12 mx-auto rounded-lg" type="text" onChange={e => setIncorrect3(e.target.value)} />
                        </div>

                        <div className=" bg-gradient-to-br from-purple-400 to-purple-700 w-11/12 h-64  mt-5 rounded-lg shadow-lg justify-center flex flex-col ">
                            <p className="text-white text-center p-10 text-3xl font-bold">Correct option:</p>
                            <input required className="text-black   w-6/12 mx-auto rounded-lg" type="text" onChange={e => setCorrect(e.target.value)} />
                        </div>

                    </div>
                    <button type="submit" className='mx-auto bg-purple-500 rounded-md py-1 px-5 w-60 h-24 text-2xl text-white font-bold'>Next Question</button>
                </form>

            </div>


        )
    }

    else {

        return (<div className='flex flex-col'>

            <h2 className=' m-10 text-5xl flex  i justify-around items-center text-transparent bg-clip-text font-bold  bg-gradient-to-br from-purple-700 to-purple-400 '>Quiz created</h2>
            <Link onClick={() => postQuestionset()} className='rounded-xl px-2 py-1  bg-purple-600 text-white mx-auto  ' to={`/quizmanager/userquizsearch=${quizname}`}>View and save your quiz here</Link>
        </div>
        )
    }
}



