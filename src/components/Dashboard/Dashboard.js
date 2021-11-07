import React, { useState, useEffect } from 'react';
import useToken from '../App/useToken';
import '../assets/bootstrap.min.css';
import './Dashboard.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from 'react-router-dom'
import Fetch from '../FetchData/FetchFunc';
import { Button } from 'react-bootstrap';



export default function Dashboard() {
  // I could neaten this up to one usestate hook call but this is more readable

  const [data, SetData] = useState()
  const [name, SetName] = useState()
  const [resultset, SetResultSet] = useState(0)



  const { token } = useToken();




  useEffect(() => {

      async function SetStatsfunc() {
        const StatsArray = []


        try {
          const userStats = await Fetch('http://localhost:8080/retrieveStats', { token, resultset }  )
 

          if (userStats.error) {

            alert("The server was unable verify your identity")




          }
          else if (userStats.results) {

                      //We destructure our array of objects into an 2d arraylist of values to be acceptable for a usestate hook

            const objectArray = (userStats.results)
            console.log(objectArray.length)   
            objectArray.forEach(value => {

              StatsArray.push(Object.values(value))

            });
              

            SetData(StatsArray)
            SetName(userStats.name[0].username)
            return

          }

        } catch {

          alert("A server error occurred")


        }
      }


      SetStatsfunc()

  
  }, [token, resultset])



  function ConditionalButtons() {
    
   if (resultset === 0){
return <Button onClick={e => SetResultSet(resultset+1)}>Page {resultset}</Button>;
   }
else if (resultset>=1) {

return <><Button onClick={e => SetResultSet(resultset + 1)}>Page {resultset}</Button><div /><Button onClick={e => SetResultSet(resultset - 1)}>Page -</Button></>


}
  }
  

  //This as a buffer check to ensure that data is defined????
  if (data) {

    //array cleanup has to be done here for some reason and not in async function else bugs
    data.forEach(element => {
      if (element[3] == null) {
        element[3] = 0
      }
    });


    
    return (
      <div>

        <Jumbotron fluid>

          <h1 className="header">Welcome to your dashboard: {name}</h1>
          <h5>Please select a quiz</h5>

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
           <ConditionalButtons/>
      </div>
    );

  }

  else {
    return (<div>

      <h2>loading...</h2>

    </div>)
  }

}
