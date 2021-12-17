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

            <div>

                <Jumbotron fluid>

                    <h1 className="header">Results for: {currentsearchquery}</h1>
                    <Button onClick={e => setGoBack(true)}> Go Back</Button>
                </Jumbotron>

                <label>
                    <p>Search for a user</p>
                    <input type="text" onChange={e => SetNewSearchQuery(e.target.value)} />

                </label>
                <Button onClick={e => SetNewSearch(true)}>Submit</Button>

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Username</th>
                            <th scope="col">Quizzes completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            // // much better and scales to the amount of rows sent
                            data.map(function (rowdata) {
                                return <tr key={rowdata[0]}>
                                    <td>{rowdata[0]}</td>
                                    <td >{rowdata[2]}</td>
                                    <td >{rowdata[3]}</td>
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

        return (<div>

            <h2>loading...</h2>

        </div>)

    }

}

