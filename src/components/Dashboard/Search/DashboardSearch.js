import React, { useState, useEffect } from 'react';
import useToken from '../../App/useToken';
import Dashboard from '../../Dashboard/Dashboard.js';
import Fetch from '../../res/FetchFunc.js';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function DashboardResults({ searchquery }) {

    const [data, SetData] = useState();
    const [currentpage, SetCurrentPage] = useState(0);
    const [quizcount, SetQuizCount] = useState();
    const [goback, setGoBack] = useState(false);
    const [currentsearchquery, SetCurrentSearchQuery] = useState(searchquery);
    const [newsearch, SetNewSearch] = useState(false);
    const [newsearchquery, SetNewSearchQuery] = useState();

    const { token } = useToken();


    useEffect(() => {

        async function SetStatsfunc() {

            const StatsArray = [];

            try {

                const userStats = await Fetch('http://localhost:8080/findquiz', { token, currentpage, currentsearchquery });


                if (userStats.error) {

                    alert("A server communication error has occurred");

                }
                else if (userStats.results) {

                    //We destructure our array of objects into an 2d arraylist of values to be acceptable for a usestate hook

                    const objectArray = (userStats.results);

                    objectArray.forEach(value => {

                        StatsArray.push(Object.values(value));

                    });


                    console.log(StatsArray);

                    SetData(StatsArray);
                    SetQuizCount(userStats.quizsearchcount[0].quizsearchcount);


                }

            } catch {

                alert("A server error occurred");

            }
        }


        SetStatsfunc();

       
    }, [token, currentpage, currentsearchquery])

    console.log(quizcount)
   
    if (newsearch) {

        SetCurrentSearchQuery(newsearchquery);
       
        SetNewSearch(false);


    }


    if (goback) {

        return <Dashboard />

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

    return <Button onClick={e => (SetCurrentPage(currentpage + 1))}>Page +   page:{currentpage + 1} </Button> + currentpage
  }

  //middle pages
  
  else if (currentpage < pages) {

    return <><Button onClick={e => (SetCurrentPage(currentpage + 1))}>Page + page:{currentpage + 1} </Button><div />
      <Button onClick={e => (SetCurrentPage(currentpage - 1))}>Page - page:{currentpage - 1} </Button></> + currentpage


//last page

} else if (currentpage === pages) {

    return <Button onClick={e => (SetCurrentPage(currentpage - 1))}>Page - page:{currentpage - 1} </Button> + currentpage;

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

       
       return (
<>

            <div className='flex flex-col'>

            <h1 className="m-10 text-4xl font-bold  flex justify-center align-middle">Results for: {currentsearchquery} </h1>
            <button  className='rounded-xl px-2 py-1 w-20 align self-center my-5  bg-purple-600 text-white' onClick={e => setGoBack(true)}> Go Back</button>
            <div className=' justify-center  border-2 border-black  flex  ' >
            <label  className=' m-5 text-xl  box-content class justify-center flex'>
              <p className='m-2'>Search for another quiz:</p>
              <input className='border-2 border-black rounded-md'  type="text" onChange={e => SetNewSearchQuery(e.target.value)} />
              <div className='m-1'/>
              <button className='rounded-xl px-2 py-1  bg-purple-600 text-white' onClick={e => SetNewSearch(true)}>Submit</button>
            </label>
            </div>
            <table className="min-w-full text-center">
              <thead className="border-b bg-purple-600">
                <tr >
                  <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col">Quiz Name</th>
                  <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col">Difficulty</th>
                  <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col">Best score</th>
                  <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col">Begin quiz</th>
                </tr>
  
              </thead>
              <tbody>
                {
                  // much better and scales to the amount of rows sent
                  data.map(function (rowdata) {
                    return <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-purple-200" key={rowdata[0]}>
                      <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900" >{rowdata[1]}</td>
                      <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900" >{rowdata[2]}</td>
                      <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900">{rowdata[3]}%</td>
                      <td className="px-10 py-6 whitespace-nowrap text-xl font-bold font-helvetica-neue text-white" >
  
                        <Link className='rounded-md px-2 py-1  bg-purple-600 hover:bg-white  transition duration-300 hover:text-purple-600 ' to={`quiz/quizid=${rowdata[0]}`}>Start</Link>
  
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
            <ConditionalButtons />
          </div>
        </>

        );

    }

    else {

        return (<div>

            <h2>loading...</h2>

        </div>)
    }



}
