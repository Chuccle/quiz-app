import React, { useState, useEffect } from 'react';
import Fetch from '../../res/FetchFunc.js';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { ConditionalButtons } from '../../res/ConditionalButtons';

export default function DashboardResults({ token }) {

  let { searchquery } = useParams();

  const [data, SetData] = useState();
  const [currentpage, SetCurrentPage] = useState(0);
  const [quizcount, SetQuizCount] = useState();

  const [newsearchquery, SetNewSearchQuery] = useState();


  useEffect(() => {

    async function SetStatsfunc() {

      const StatsArray = [];

      const response = await Fetch(`/findquiz/search=${searchquery}&page=${currentpage}`, {token}, 'GET');
      
      if (response.results) {

        //We destructure our array of objects into an 2d arraylist of values to be acceptable for a usestate hook

        const objectArray = (response.results);

        objectArray.forEach(value => {

          StatsArray.push(Object.values(value));

        });

        SetData(StatsArray);
        SetQuizCount(response.quizsearchcount[0].quizsearchcount);
      
    } else {

        alert("A server error has occurred");

      }

    }

    SetStatsfunc();

  }, [token, currentpage, searchquery])


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

          <h1 className="m-10 text-4xl font-bold  flex justify-center align-middle">Results for: {searchquery} </h1>
          <label className=' m-5 text-xl  box-content  text-center flex-col'>
            <Link className='rounded-xl px-2 py-1  bg-purple-600 text-white  ' to={`/dashboard`}>Go Back</Link>
          </label>
          <div className=' justify-center  border-2 border-black  flex  ' >
            <label className=' m-5 text-xl  box-content class justify-center flex'>
              <p className='m-2'>Search for another quiz:</p>
              <input className='border-2 border-black rounded-md' type="text" onChange={e => SetNewSearchQuery(e.target.value)} />
              <div className='m-1' />
              <Link className='rounded-xl px-2 py-1  bg-purple-600 text-white ' to={`/dashboard/dashboardsearch=${newsearchquery}`}>Search</Link>
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

                      <Link className='rounded-md px-2 py-1  bg-purple-600 hover:bg-white  transition duration-300 hover:text-purple-600 ' to={`/quiz/quizid=${rowdata[0]}`}>Start</Link>

                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
          <ConditionalButtons maxRows={6} totalCount={quizcount} currentPage={currentpage} SetCurrentPage={SetCurrentPage} />
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
