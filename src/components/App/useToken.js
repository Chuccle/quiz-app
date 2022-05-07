import { useState } from 'react';

export default function useToken() {

  // get token from local storage and return if it exists
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  // usestate hook token using return value of getToken as default value
  const [token, setToken] = useState(getToken());

  // set token in local storage with usertoken value and token value set as stringified usertoken value
  const saveToken = userToken => {

    sessionStorage.setItem('token', JSON.stringify(userToken));

    setToken(userToken.token);
  };


  return {
    setToken: saveToken,
    token
  }
}