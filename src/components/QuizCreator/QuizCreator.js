import React, { useState } from 'react';
import useToken from '../App/useToken';


async function insertquizfunction(credentials) {

    return fetch('http://localhost:8080/insertquiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
  
      },
  
      body: JSON.stringify(credentials)
  
    })
  
      .then(data => data.json())
  
  }

 // async function insertquestionset(credentials) {

  //  return fetch('http://localhost:8080/insertquestionset', {
  //    method: 'POST',
 //     headers: {
    //    'Content-Type': 'application/json'
  //
  ////    },
  //
//      body: JSON.stringify(credentials)
//  
 //   })
  
 //     .then(data => data.json())
  
 // }



  export function QuizCreator() {
      
    const {token} = useToken();
    
    var quizname="boomer"

    
    return (
    <div className="insertQuizdatabutton" >
    <button onClick={e => insertquizfunction({token, quizname})}>Register Instead</button>
  </div>
    
    
    )





  }

