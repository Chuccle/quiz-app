import React, { useState, useEffect} from 'react';
import Fetch from '../res/FetchFunc.js';
import QuizManagerSearch from './Search/QuizManagerSearch';
import { Button } from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron';
import useToken from '../App/useToken';
import QuizOperations from './res/QuizOperations.js';
import QuestionManager from './QuestionManager/QuestionManager.js';


export default function QuizManager() {

    const [data, SetData] = useState();
    const [currentpage, SetCurrentPage] = useState(0);
    const [quizcount, SetQuizCount] = useState();
    const [searchquery, SetSearchQuery] = useState(false);
    const [searchpage, SetSearchPage] = useState(false);
    const [questionmanagerpage, SetQuestionManagerPage] = useState(false);
    const [newquizname, SetNewQuizName] = useState();

    

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

                    SetData(QuizArray);
                    SetQuizCount(userStats.quizsearchcount[0].quizcount);

                }

            } catch {

                alert("A server error occurred");

            }

        }

        SetStatsfunc()

    }, [token, currentpage])


    function ConditionalButtons() {

        let pages;

        //base case 

        if (quizcount < 6) {

            return null;

        }

        else if (quizcount % 6 === 0) {

            pages = (quizcount / 6) - 1;

        } else {

            pages = Math.trunc(quizcount / 6);
        }

        if (currentpage === 0) {

            return <Button onClick={e => SetCurrentPage(currentpage + 1)}>Page + page:{currentpage + 1} </Button>;

        }

        else if (currentpage < pages) {

            return <><Button onClick={e => SetCurrentPage(currentpage + 1)}>Page + page:{currentpage + 1} </Button><div />
                <Button onClick={e => SetCurrentPage(currentpage - 1)}>Page - page:{currentpage - 1} </Button></>

        } else if (currentpage === pages) {

            return <Button onClick={e => SetCurrentPage(currentpage - 1)}>Page - page:{currentpage - 1} </Button>;

        }

    }


    function QuizUpdateHandler(address, token, key, optionalData) {

        QuizOperations(address, token, key, optionalData)
        
        window.location.reload()


       }




    if (searchpage) {

        return <QuizManagerSearch searchquery={searchquery}></QuizManagerSearch>

    }


    
    if (questionmanagerpage) {

       return <QuestionManager quizid={questionmanagerpage[1]}></QuestionManager>

    }


    //This as a buffer check to ensure that data is defined????

    if (data) {

        return (

            <div>

                <Jumbotron fluid>

                    <h1 className="header">Welcome to your Quiz Manager</h1>

                    <h5>Please select a quiz to edit</h5>

                    <label>

                        <p>Search for a quiz</p>

                        <input type="text" onChange={e => SetSearchQuery(e.target.value)} />

                        <Button onClick={e => SetSearchPage(true)}>Submit</Button>

                    </label>

                </Jumbotron>

                <table className="table">
                    <thead>

                        <tr>
                            <th scope="col">Change Quiz Name</th>

                            <th scope="col">Change Difficulty</th>

                            <th scope="col">Edit Questions</th>

                            <th scope="col"></th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            // scalable

                            data.map(function (rowdata) {

                                return <tr key={rowdata[0]}>

                                    <td>

                                        <label>{rowdata[1]}</label>

                                        <div />

                                        <input onChange={e => SetNewQuizName(e.target.value)}></input>

                                        <div />

                                        <Button onClick={e => QuizUpdateHandler('http://localhost:8080/updateuserquizname', token, rowdata[0], newquizname)}>Rename</Button>

                                    </td>

                                    <td >

                                        <label>{rowdata[2]}</label>

                                        <div />

                                        <select onChange={e => QuizUpdateHandler('http://localhost:8080/updateuserquizdifficulty', token, rowdata[0], e.target.value)}>

                                            <option value="none">Options</option>

                                            <option value="Easy">Easy</option>

                                            <option value="Medium">Medium</option>

                                            <option value="Hard">Hard</option>

                                        </select>

                                    </td>

                                    <td>

                                        <Button onClick={e => SetQuestionManagerPage([true, rowdata[0]])}>View</Button>

                                    </td>

                                    <td >

                                        <Button onClick={e => QuizUpdateHandler('http://localhost:8080/removeuserquiz', rowdata[0])}>Remove</Button>

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
