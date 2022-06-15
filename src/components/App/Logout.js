import React, { useEffect } from 'react';
import Fetch from '../res/FetchFunc';


export default function Logout() {


  useEffect(() => {

    async function LogoutRequest() {

      await Fetch('/logout', {}, 'DELETE')

      window.sessionStorage.clear()
      window.location.replace('/')

    }

    LogoutRequest()

  }, [])


  return (<>

    <div>
      <h1>successful logout</h1>
    </div>

  </>)

}