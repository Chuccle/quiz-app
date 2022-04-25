import React, { useEffect } from 'react';
import Fetch from '../res/FetchFunc';


export default function Logout() {


    useEffect(() => {

        async function LogoutRequest() {
    
                const userStats = await Fetch('/logout');
    
    
                if (userStats.error) {
    
                    alert("A server error has occurred");
    
                }

        }
    
    LogoutRequest()
           
    } )




// remove token form local storage and redirect to default path
    sessionStorage.clear()
    window.location.replace('/')


    
    return (<>
       
        <div>
            <h1>successful logout</h1>
        </div>

    </>)

}