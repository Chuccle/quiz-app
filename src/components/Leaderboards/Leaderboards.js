import React, { useState, useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Fetch from '../res/FetchFunc';
import useToken from '../App/useToken';
import { Button } from 'react-bootstrap';


export default function Leaderboards() {
  
  
  const [data, SetData] = useState();
  const [currentpage, SetCurrentPage] = useState(0);
  const [leaderboardcount, SetLeaderboardCount] = useState();

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

    if (leaderboardcount % 3 === 0) {

      pages = (leaderboardcount / 3) - 1;

    } else {

      pages = Math.trunc(leaderboardcount / 3);
    }

    if (currentpage === 0) {

      return <Button onClick={e => SetCurrentPage(currentpage + 1)}>Page +   page:{currentpage + 1} </Button>;
    }

    else if (currentpage < pages) {

      return <><Button onClick={e => SetCurrentPage(currentpage + 1)}>Page + page:{currentpage + 1} </Button><div /><Button onClick={e => SetCurrentPage(currentpage - 1)}>Page - page:{currentpage - 1} </Button></>;

    } else if (currentpage === pages) {

      return <Button onClick={e => SetCurrentPage(currentpage - 1)}>Page - page:{currentpage - 1} </Button>;

    }


  }




  
  if (data) {

  
  return (
    <div>

      <Jumbotron fluid>

        <h1 className="header">Top users</h1>

      </Jumbotron>

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