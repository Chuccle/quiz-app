import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default function Leaderboards() {
  
  
  let userrank = 1
  
  return (
    <div>

      <Jumbotron fluid>

        <h1 className="header">Top users</h1>
        <h5>Your rank: {userrank}</h5>

      </Jumbotron>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Username</th>
            <th scope="col">Quizzes completed</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          {
            // much better and scales to the amount of rows sent
           // data.map(function (rowdata) {
             // return 
             <tr >
                <td>1</td>
                <td >noob</td>
                <td >123</td>
                <td >150</td>
              </tr>
           // })

          }
        </tbody>
      </table>
    </div>
  );

}
