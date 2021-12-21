import React, { useState, useEffect } from 'react';
import useToken from '../../App/useToken';
import { useParams} from 'react-router';
import { Link } from 'react-router-dom';
//import ConditionalButtons from '../res/ConditionalButtons';
import Fetch from '../../res/FetchFunc';
import QuizOperations from '../res/QuizOperations';
import QuizManager from '../QuizManager';
import QuestionManager from '../QuestionManager/QuestionManager.js';

export default function DashboardResults() {

    let { searchquery } = useParams();
   
    
    const [data, SetData] = useState();
    const [currentpage, SetCurrentPage] = useState(0);
    const [quizcount, SetQuizCount] = useState();
    const [goback, setGoBack] = useState(false);
    const [newquizname, SetNewQuizName] = useState(); 
    const [newsearchquery, SetNewSearchQuery] = useState();
    const [questionmanagerpage, SetQuestionManagerPage] = useState(false);
    const { token } = useToken();

    
//TODO update component when quiz is updated/modified

    useEffect(() => {

        async function SetStatsfunc() {

            const QuizArray = [];

            try {

                const userStats = await Fetch('http://localhost:8080/finduserquizzes', { token, currentpage, searchquery });


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


        SetStatsfunc();

       
    }, [token, currentpage, searchquery])


    if (questionmanagerpage) {

        return <QuestionManager quizid={questionmanagerpage[1]}></QuestionManager>
 
     }



    if (goback) {

        return <QuizManager />

    }



    function ConditionalButtons() {

        let pages

        //base case
        if (quizcount <= 6) {

            return null

        }

       //if there is no remainder 

  else if (quizcount % 6 === 0) {

        //-1 because we need to offset the fact that arrays start at 0
    
    pages = (quizcount / 6) - 1

} else {

    //if there is a remainder treat it as a whole number
    
    pages = Math.trunc(quizcount / 6)
  }


 //first page 
  
 if (currentpage === 0) {

    return <button onClick={e => (SetCurrentPage(currentpage + 1))}>Page +   page:{currentpage + 1} </button> + currentpage
  }

  //middle pages
  
  else if (currentpage < pages) {

    return <><button onClick={e => (SetCurrentPage(currentpage + 1))}>Page + page:{currentpage + 1} </button><div />
      <button onClick={e => (SetCurrentPage(currentpage - 1))}>Page - page:{currentpage - 1} </button></> + currentpage


//last page

} else if (currentpage === pages) {

    return <button onClick={e => (SetCurrentPage(currentpage - 1))}>Page - page:{currentpage - 1} </button> + currentpage;

  }


    }


    //This as a buffer check to ensure that data is defined.
    if (data) {

        //array cleanup has to be done here for some reason and not in async function else bugs
        data.forEach(element => {

            if (element[3] == null) {

                element[3] = 0;

            }

        });

      async function QuizUpdateHandler(address, token, key, optionalData) {

       await QuizOperations(address, token, key, optionalData) 
        
        
        
        window.location.reload()


       }

        return (

            <div className='flex flex-col'>


                    <h1 className="m-10 text-4xl font-bold  flex justify-center align-middle">Results for: {searchquery}</h1>

                    <h5 className=' m-5 text-2xl flex justify-center'>Please select a quiz to edit</h5>

                    <div className=' justify-center  border-2 border-black  flex  ' >
          <label  className=' m-5 text-xl  box-content class justify-center flex'>
            <p className='m-2'>Search for a quiz:</p>
            <input className='border-2 border-black rounded-md'  type="text" onChange={e => SetNewSearchQuery(e.target.value)} />
            <Link className='rounded-xl px-2 py-1  bg-purple-600 text-white ' to={`/quizmanager/userquizsearch=${newsearchquery}`}>Search</Link>
            <div className='m-1'/>
          </label>
          </div>
               

                <table className="text-center">
                    <thead className="border-b bg-purple-600">

                        <tr>
                            <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col">Change Quiz Name</th>

                            <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white"scope="col">Change Difficulty</th>

                            <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col">Edit Questions</th>

                            <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col"></th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            // scalable

                            data.map(function (rowdata) {

                                return <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-purple-200" key={rowdata[0]}>

                                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900">

                                        <label>{rowdata[1]}</label>

                                        <div />

                                        <input onChange={e => SetNewQuizName(e.target.value)}></input>

                                        <div />

                                        <button onClick={e => QuizUpdateHandler('http://localhost:8080/updateuserquizname', token, rowdata[0], newquizname)}>Rename</button>

                                    </td  >

                                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900" >

                                        <label>{rowdata[2]}</label>

                                        <div />

                                        <select onChange={e => QuizUpdateHandler('http://localhost:8080/updateuserquizdifficulty', token, rowdata[0], e.target.value)}>

                                            <option value="none">...</option>

                                            <option value="Easy">Easy</option>

                                            <option value="Medium">Medium</option>

                                            <option value="Hard">Hard</option>

                                        </select>

                                    </td>

                                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900">

                                        <button onClick={e => SetQuestionManagerPage([true, rowdata[0]])}>View</button>

                                    </td>

                                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900" >

                                        <button onClick={e => QuizUpdateHandler('http://localhost:8080/removeuserquiz', token, rowdata[0])}>Remove</button>

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



}
