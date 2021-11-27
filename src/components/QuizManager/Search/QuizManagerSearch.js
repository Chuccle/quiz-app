import React, { useState, useEffect } from 'react';
import useToken from '../../App/useToken';
import Dashboard from '../../Dashboard/Dashboard';
//import ConditionalButtons from '../res/ConditionalButtons';
import Fetch from '../../res/FetchFunc';
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
        if (quizcount < 6) {

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

            <div>
                <div className="DashboardResults" >
                    <h1>Results for: {currentsearchquery}  </h1>
                    <div />
                    <Button onClick={e => setGoBack(true)}> Go Back</Button>

                </div>
                <label>
                    <p>Search for a quiz</p>
                    <input type="text" onChange={e => SetNewSearchQuery(e.target.value)} />

                </label>
                <Button onClick={e => SetNewSearch(true)}>Submit</Button>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Quiz Name</th>
                            <th scope="col">Difficulty</th>
                            <th scope="col">Best score</th>
                            <th scope="col">Begin quiz</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // much better and scales to the amount of rows sent
                            data.map(function (rowdata) {
                                return <tr key={rowdata[0]}>
                                    <td>{rowdata[1]}</td>
                                    <td >{rowdata[2]}</td>
                                    <td >{rowdata[3]}%</td>
                                    <td ><Link to={{ pathname: '/quiz', state: { quizid: rowdata[0] } }}>Start</Link></td>
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
