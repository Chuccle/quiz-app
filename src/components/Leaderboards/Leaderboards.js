import React, { useState, useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Fetch from '../res/FetchFunc';
import useToken from '../App/useToken';
import { Button } from 'react-bootstrap';
//import ConditionalButtons from '../res/ConditionalButtons.js'
import LeaderboardSearch from './Search/LeaderboardSearch.js';


export default function Leaderboards() {


  const [data, SetData] = useState();
  const [currentpage, SetCurrentPage] = useState(0);
  const [leaderboardcount, SetLeaderboardCount] = useState();
  const [nextpage, SetNextPage] = useState(false);
  const [searchquery, SetSearchQuery] = useState(false);

  const { token } = useToken();


  useEffect(() => {


    async function SetStatsfunc() {
      const StatsArray = [];


      try {
        const userStats = await Fetch('http://localhost:8080/retrieveleaderboard', { token, currentpage });


        if (userStats.error) {

          alert("A server communication error has occurred");




        }
        else if (userStats.results) {

          //We destructure our array of objects into an 2d arraylist of values to be acceptable for a usestate hook

          const objectArray = (userStats.results);

          objectArray.forEach(value => {

            StatsArray.push(Object.values(value));

          });


          SetData(StatsArray);
        
          SetLeaderboardCount(userStats.leaderboardcount[0].count)


        }

      } catch {

        alert("A server error occurred");


      }
    }


    SetStatsfunc();


  }, [token, currentpage]);

  
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

        return <Button onClick={e => SetCurrentPage(currentpage + 1)}>Page +   page:{currentpage + 1} </Button>;
    }

    else if (currentpage < pages) {

        return <><Button onClick={e => SetCurrentPage(currentpage + 1)}>Page + page:{currentpage + 1} </Button><div />
            <Button onClick={e => SetCurrentPage(currentpage - 1)}>Page - page:{currentpage - 1} </Button></>

    } else if (currentpage === pages) {

        return <Button onClick={e => SetCurrentPage(currentpage - 1)}>Page - page:{currentpage - 1} </Button>;

    }


}


 // ConditionalButtons(3, leaderboardcount, currentpage)

 //if Nextpage is true, then pass setToken prop to Leaderboardsearch component
 if (nextpage) {

    return <LeaderboardSearch searchquery={searchquery}></LeaderboardSearch>

  }



if (data) {

    return (
      <>
 <div className='flex flex-col'>

<h1 className="m-10 text-4xl font-bold  flex justify-center align-middle">Top users</h1>
<div className=' justify-center  border-2 border-black  flex  ' >
<label  className=' m-5 text-xl  box-content class justify-center flex'>
  <p className='m-2'>Search for a user:</p>
  <input className='border-2 border-black rounded-md'  type="text" onChange={e => SetSearchQuery(e.target.value)} />
  <div className='m-1'/>
  <button className='rounded-xl px-2 py-1  bg-purple-600 text-white' onClick={e => SetNextPage(true)}>Submit</button>
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