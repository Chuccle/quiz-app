import React, { useEffect } from 'react';
//import Fetch from '../res/FetchFunc';


export default function Logout() {


    useEffect(() => {

        async function LogoutRequest() {
           
            try {
                await fetch(`https://chuccle-quizapp-backend.herokuapp.com/logout`, {
                  credentials: 'include',
                  mode: 'no-cors',
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                });

                window.sessionStorage.clear()
                window.location.replace('/')

              } catch (err) {
                return console.log(err);
              }

        }

        LogoutRequest()

    })




    // remove token form local storage and redirect to default path
  
    
    //window.location.replace('/')



    return (<>

        <div>
            <h1>successful logout</h1>
        </div>

    </>)

}