import React, { useState, useEffect } from 'react';
import useToken from '../..//App/useToken.js';
import Leaderboards from '../../Leaderboards/Leaderboards.js';
//import ConditionalButtons from '../res/ConditionalButtons';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Fetch from '../../res/FetchFunc.js';
import { Button } from 'react-bootstrap';



export default function LeaderboardSearch({ searchquery }) {

    const [data, SetData] = useState();
    const [currentpage, SetCurrentPage] = useState(0);
    const [leaderboardcount, SetLeaderboardCount] = useState();
    const [goback, setGoBack] = useState(false);
    const [currentsearchquery, SetCurrentSearchQuery] = useState(searchquery);
    const [newsearch, SetNewSearch] = useState(false);
    const [newsearchquery, SetNewSearchQuery] = useState();

    const { token } = useToken();


    useEffect(() => {

        async function SetStatsfunc() {

            const StatsArray = [];

            try {

                const userStats = await Fetch('http://localhost:8080/finduserrank', { token, currentpage, currentsearchquery });

                if (userStats.error) {

                    alert("A server error has occurred");

                }

                else if (userStats.results) {

                    //We destructure our array of objects into an 2d arraylist of values to be acceptable for a usestate hook

                    const objectArray = (userStats.results);

                    objectArray.forEach(value => {

                        StatsArray.push(Object.values(value));

                    });

                    SetData(StatsArray);

                    SetLeaderboardCount(userStats.leaderboardcount[0].usersearchcount);

                }

            } catch {

                alert("A server communication error occurred");

            }

        }

        SetStatsfunc();

    }, [token, currentpage, currentsearchquery])

    console.log(leaderboardcount)

    if (newsearch) {

        SetCurrentSearchQuery(newsearchquery);

        SetNewSearch(false);

    }


    if (goback) {

        return <Leaderboards />

    }

  
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

    // ConditionalButtons(3, leaderboardcount, currentpage, SetCurrentPage());

    //This as a buffer check to ensure that data is defined????
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

