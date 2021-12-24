import React, { useState, useEffect, useReducer } from 'react';
import lodashSet from 'lodash.set';
import Fetch from '../res/FetchFunc.js';
import useToken from '../App/useToken';
import QuizOperations from './res/QuizOperations.js';
import QuestionManager from './QuestionManager/QuestionManager.js';
import { Link } from 'react-router-dom';

export default function QuizManager() {

    const [currentpage, SetCurrentPage] = useState(0);
    const [quizcount, SetQuizCount] = useState();
    const [searchquery, SetSearchQuery] = useState();
    const [questionmanagerpage, SetQuestionManagerPage] = useState(false);
    const [newquizname, SetNewQuizName] = useState({key: '', value: ''});
    const [test, dispatch] = useReducer((state, action) => {
        
        switch (action.type) {
        
            case 'SET_DATA':
            
            return [

                    ...state,

                    {
                        quizid: action.quizid,
                        quizname: action.quizname,
                        difficulty: action.difficulty,

                    }
                ];
            
            case 'RESET_DATA':
            
            return [];
            
            
            case 'UPDATE_QUIZ_NAME':

                // not fun needs a slice method because it pushes a duplicate element to state array

                return state.slice(0, state.length, lodashSet(state[action.key], 'quizname', action.quizname))

            case 'UPDATE_QUIZ_DIFFICULTY':

                // not fun needs a slice method because it pushes a duplicate element to state array

                return state.slice(0, state.length, lodashSet(state[action.key], 'difficulty', action.difficulty))

            case 'REMOVE_QUIZ':
                // Will return every element except the one referenced by action.key {redundant} is needed to access second argumanet of .filter method
               
                return state.filter((redundant, index) => { return (index !== action.index) })

            default:
               
            return state;
        }
    
    }, []);

    const { token } = useToken();


    //TODO update component when quiz is updated/modified


    useEffect(() => {

        async function SetStatsfunc() {

            const QuizArray = [];

            try {

                const userStats = await Fetch('http://localhost:8080/retrieveuserquizzes', { token, currentpage });

                if (userStats.error) {

                    alert("A server communication error has occurred");

                }

                else if (userStats.results) {

                    //We destructure our array of objects into an 2d arraylist of values to be acceptable for a usestate hook

                    const objectArray = (userStats.results);

                    objectArray.forEach(value => {

                        QuizArray.push(Object.values(value));

                    });
                   

                    SetQuizCount(userStats.quizsearchcount[0].quizcount);


                    for (let i = 0; i < QuizArray.length; i++) {
                    
                        dispatch(

                            {

                                type: 'SET_DATA',
                                quizid: QuizArray[i][0],
                                quizname: QuizArray[i][1],
                                difficulty: QuizArray[i][2],

                            }


                        );

                    };

                };



            } catch {

                alert("A server error occurred");

            }

        }

        SetStatsfunc()

    }, [token, currentpage]);


    function CurrentPageHandler(increment) {

        if (increment) {

            SetCurrentPage(currentpage + 1);
            dispatch(


                {

                    type: 'RESET_DATA',


                }
            )

        } else {

            SetCurrentPage(currentpage - 1);

            dispatch(


                {

                    type: 'RESET_DATA',


                }
            )

        }
    }


    function ConditionalButtons() {

        let pages;

        //base case 

        if (quizcount <= 6) {

            return null;

        }

        else if (quizcount % 6 === 0) {

            pages = (quizcount / 6) - 1;

        } else {

            pages = Math.trunc(quizcount / 6);
        }

        if (currentpage === 0) {

            return <button onClick={e => CurrentPageHandler(true)}>Page + page:{currentpage + 1} </button>;

        }

        else if (currentpage < pages) {

            return <><button onClick={e => CurrentPageHandler(true)}>Page + page:{currentpage + 1} </button><div />
                <button onClick={e => CurrentPageHandler(false)}>Page - page:{currentpage - 1} </button></>

        } else if (currentpage === pages) {


            return <button onClick={e => CurrentPageHandler(false)}>Page - page:{currentpage - 1} </button>;

        }

    }

    async function QuizUpdateHandler(address, token, key, optionalData,  actionType, index, extra) {

        await QuizOperations(address, token, key, optionalData);

        switch (actionType) {

            case "quiznameupdate":
            
            // Condition needed because newquizname is shared by all quiz elements
           
            if (extra === index){ 
                
                dispatch({
                  
                    type: 'UPDATE_QUIZ_NAME',
                    key: index,
                    quizname: optionalData
                
                });
            }
                break;

            case "quizdifficultyupdate":

                dispatch({
                  
                    type: 'UPDATE_QUIZ_DIFFICULTY',
                    key: index,
                    difficulty: optionalData,
                
                });

                break;

            case "quizremove":
                
            dispatch({
                
                type: 'REMOVE_QUIZ',
                index: index
                
            });
                
                break;

            default:
                
            console.log("error");

        }
  
    }

    if (questionmanagerpage) {

        return <QuestionManager quizid={questionmanagerpage[1]}></QuestionManager>

    }


    //This as a buffer check to ensure that data is defined????

    if (test) {

        return (

            <div className='flex flex-col'>

                <h1 className="m-10 text-4xl font-bold  flex justify-center align-middle">Welcome to your Quiz Manager</h1>

                <h5 className=' m-5 text-2xl flex justify-center'>Please select a quiz to edit</h5>

                <div className=' justify-center  border-2 border-black  flex  ' >
                   
                    <label className=' m-5 text-xl  box-content justify-center flex'>
                        <p className='m-2'>Search for a quiz:</p>
                        <input id="newquiznameinput" className='border-2 border-black rounded-md' type="text" onChange={e => SetSearchQuery(e.target.value)} />
                        <div className='m-1' />
                        <Link className='rounded-xl px-2 py-1  bg-purple-600 text-white ' to={`/quizmanager/userquizsearch=${searchquery}`}>Search</Link>
                    </label>
               
                </div>

                <table className="text-center">
                    <thead className="border-b bg-purple-600">

                        <tr>
                            <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col">Change Quiz Name</th>

                            <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col">Change Difficulty</th>

                            <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col">Edit Questions</th>

                            <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col"></th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            // scalable

                            test.map(function (rowdata, index) {

                                return <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-purple-200" key={rowdata.quizid}>

                                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900">

                                        <label>{rowdata.quizname}</label>

                                        <div />

                                        <input onChange={e => SetNewQuizName({key:index,  value:e.target.value})}></input>

                                        <div />

                                        <button onClick={e => QuizUpdateHandler('http://localhost:8080/updateuserquizname', token, rowdata.quizid, newquizname.value, "quiznameupdate", index, newquizname.key)}>Rename</button>

                                    </td  >

                                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900" >

                                        <label>{rowdata.difficulty}</label>

                                        <div />

                                        <select onChange={e => QuizUpdateHandler('http://localhost:8080/updateuserquizdifficulty', token, rowdata.quizid, e.target.value, "quizdifficultyupdate", index)}>

                                            <option value={rowdata.difficulty}>...</option>

                                            <option value="Easy">Easy</option>

                                            <option value="Medium">Medium</option>

                                            <option value="Hard">Hard</option>

                                        </select>

                                    </td>

                                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900">

                                        <button onClick={e => SetQuestionManagerPage([true, rowdata.quizid])}>View</button>

                                    </td>

                                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900" >

                                        <button onClick={e => QuizUpdateHandler('http://localhost:8080/removeuserquiz', token, rowdata.quizid, null, "quizremove", index)}>Remove</button>

                                    </td>

                                </tr>

                            })

                        }

                    </tbody>

                </table>

                <ConditionalButtons />

            </div>

        );

    }

    else {

        return (<div> <h2>loading...</h2> </div>)

    };

};
