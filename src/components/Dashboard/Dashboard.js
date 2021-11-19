import React, { useState, useEffect } from 'react';
import useToken from '../App/useToken';
import '../assets/bootstrap.min.css';
import './Dashboard.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from 'react-router-dom';
import Fetch from '../res/FetchFunc';
import { Button } from 'react-bootstrap';
import DashboardResults from '../Search/DashboardSearch';
//import ConditionalButtons from '../res/ConditionalButtons';



export default function Dashboard() {

  const [data, SetData] = useState();
  const [name, SetName] = useState();
  const [currentpage, SetCurrentPage] = useState(0);
  const [quizcount, SetQuizCount] = useState();
  const [nextpage, SetNextPage] = useState(false);
  const [searchquery, SetSearchQuery] = useState(false);

  const { token } = useToken();


  useEffect(() => {

    async function SetStatsfunc() {

      const StatsArray = []

      try {

        const userStats = await Fetch('http://localhost:8080/retrievequizzes', { token, currentpage });

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
          SetName(userStats.name[0].username);
          SetQuizCount(userStats.quizcount[0].count);

        }

      } catch {

        alert("A server error occurred");

      }
    }

    SetStatsfunc()

  }, [token, currentpage])


  function ConditionalButtons() {

    let pages

    //base case 

    if (quizcount < 6) {

      return null

    }

    else if (quizcount % 6 === 0) {

      pages = (quizcount / 6) - 1

    } else {

      pages = Math.trunc(quizcount / 6)
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


  if (nextpage) {

    console.log("lol")

    return <DashboardResults searchquery={searchquery}></DashboardResults>

  }


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

          <h1 className="header">Welcome to your dashboard: {name}</h1>
          <h5>Please select a quiz</h5>
          <label>
              <p>Search for a quiz</p>
              <input type="text" onChange={e => SetSearchQuery(e.target.value)} />
              <Button onClick={e => SetNextPage(true)}>Submit</Button>
            </label>



        </Jumbotron>




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
