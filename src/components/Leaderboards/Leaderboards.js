import React, { useState, useEffect } from 'react';
import Fetch from '../res/FetchFunc';
import { ConditionalButtons } from '../res/ConditionalButtons';
import { Link } from 'react-router-dom';


export default function Leaderboards({ token }) {


  const [data, SetData] = useState();
  const [currentpage, SetCurrentPage] = useState(0);
  const [leaderboardcount, SetLeaderboardCount] = useState();
  const [searchquery, SetSearchQuery] = useState(false);


  useEffect(() => {


    async function SetStatsfunc() {


      const StatsArray = [];

      const response = await Fetch(`/retrieveleaderboard/page=${currentpage}`, {}, 'GET');

      if (response.results) {

        //We destructure our array of objects into an 2d arraylist of values to be acceptable for a usestate hook

        const objectArray = (response.results);

        objectArray.forEach(value => {

          StatsArray.push(Object.values(value));

        });

        SetData(StatsArray);

        SetLeaderboardCount(response.leaderboardcount[0].count)

      } else {

        alert("A server communication error has occurred");
      }
    }


    SetStatsfunc();


  }, [token, currentpage]);


  if (data) {

    return (
      <>
        <div className='flex flex-col'>

          <h1 className="m-10 text-4xl font-bold  flex justify-center align-middle">Top users</h1>
          <div className=' justify-center  border-2 border-black  flex  ' >
            <label className=' m-5 text-xl  box-content class justify-center flex'>
              <p className='m-2'>Search for a user:</p>
              <input className='border-2 border-black rounded-md' type="text" onChange={e => SetSearchQuery(e.target.value)} />
              <div className='m-1' />
              <Link className='rounded-xl px-2 py-1  bg-purple-600 text-white ' to={`/leaderboard/leaderboardsearch=${searchquery}`}>Search</Link>
            </label>
          </div>
          <table className="min-w-full text-center table-auto">
            <thead className="border-b bg-purple-600">
              <tr >
                <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col">Rank</th>
                <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col">Username</th>
                <th className="px-10 py-6 whitespace-nowrap text-2xl font-bold text-white" scope="col">Quizzes completed</th>

              </tr>

            </thead>
            <tbody>
              {
                // much better and scales to the amount of rows sent
                data.map(function (rowdata) {
                  return <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-purple-200" key={rowdata[0]}>
                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900" > {rowdata[0]}</td>
                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900" >{rowdata[2]}</td>
                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900">{rowdata[3]}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
          <ConditionalButtons maxRows={6} totalCount={leaderboardcount} currentPage={currentpage} SetCurrentPage={SetCurrentPage} />
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