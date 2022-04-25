import React, { useState, useEffect } from 'react';
import Fetch from '../../res/FetchFunc.js';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


export default function LeaderboardSearch({ token }) {

  let { searchquery } = useParams();

  const [data, SetData] = useState();
  const [currentpage, SetCurrentPage] = useState(0);
  const [leaderboardcount, SetLeaderboardCount] = useState();

  const [newsearchquery, SetNewSearchQuery] = useState();




  console.log(searchquery);

  useEffect(() => {

    async function SetStatsfunc() {

      const StatsArray = [];

      try {

        const userStats = await Fetch('/finduserrank', { token, currentpage, searchquery });

        if (userStats.error) {

          alert("A server error has occurred");

        }

        else if (userStats.results) {

          //We destructure our array of objects into an 2d arraylist of values to be acceptable for a usestate hook

          const objectArray = (userStats.results);

          objectArray.forEach(value => {

            StatsArray.push(Object.values(value));

            console.log(userStats.results)

          });

          SetData(StatsArray);

          SetLeaderboardCount(userStats.leaderboardcount[0].usersearchcount);

        }

      } catch {

        alert("A server communication error occurred");

      }

    }

    SetStatsfunc();

  }, [token, currentpage, searchquery])



  function ConditionalButtons() {

    let pages;

    if (leaderboardcount <= 3) {

      return null;

    }

    else if (leaderboardcount % 3 === 0) {

      pages = (leaderboardcount / 3) - 1;

    } else {

      pages = Math.trunc(leaderboardcount / 3);
    }



    if (currentpage === 0) {

      return <button onClick={e => SetCurrentPage(currentpage + 1)}>Page +   page:{currentpage + 1} </button>;
    }

    else if (currentpage < pages) {

      return <><button onClick={e => SetCurrentPage(currentpage + 1)}>Page + page:{currentpage + 1} </button><div />
        <button onClick={e => SetCurrentPage(currentpage - 1)}>Page - page:{currentpage - 1} </button></>

    } else if (currentpage === pages) {

      return <button onClick={e => SetCurrentPage(currentpage - 1)}>Page - page:{currentpage - 1} </button>;

    }


  }



  // ConditionalButtons(3, leaderboardcount, currentpage, SetCurrentPage());

  //This as a buffer check to ensure that data is defined????
  if (data) {

    console.log(data)

    return (
      <>

        <div className='flex flex-col'>

          <h1 className="m-10 text-4xl font-bold  flex justify-center align-middle">Results for: {searchquery} </h1>
          <label className=' m-5 text-xl  box-content  text-center flex-col'>
            <Link className='rounded-xl px-2 py-1  bg-purple-600 text-white  ' to={`/leaderboard`}>Go Back</Link>
          </label>

          <div className=' justify-center  border-2 border-black  flex  ' >
            <label className=' m-5 text-xl  box-content class justify-center flex'>
              <p className='m-2'>Search for another quiz:</p>
              <input className='border-2 border-black rounded-md' type="text" onChange={e => SetNewSearchQuery(e.target.value)} />
              <div className='m-1' />

              <Link className='rounded-xl px-2 py-1  bg-purple-600 text-white ' to={`/leaderboard/leaderboardsearch=${newsearchquery}`}>Search</Link>
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
                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900" >{rowdata[0]}</td>
                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900" >{rowdata[2]}</td>
                    <td className="px-10 py-6 whitespace-nowrap text-xl font-medium text-gray-900">{rowdata[3]}</td>
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

