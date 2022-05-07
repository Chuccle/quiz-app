import React, { useEffect } from 'react';
import Fetch from '../res/FetchFunc';


export default function Logout() {


    useEffect(() => {

        async function LogoutRequest() {

            const response = await Fetch('/logout');

            if (response.error) {

                alert("A server error has occurred");

            }

        }

        LogoutRequest()

    })




    // remove token form local storage and redirect to default path
    window.sessionStorage.clear()
    
    window.location.replace('/')



    return (<>

        <div>
            <h1>successful logout</h1>
        </div>

    </>)

}