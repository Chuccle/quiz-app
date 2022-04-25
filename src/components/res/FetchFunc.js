


async function SilentRefresh() {


  const tokenString = sessionStorage.getItem('token');

  if (tokenString) {

    const userToken = JSON.parse(tokenString);

    const data = await fetch(`https://chuccle-quizapp-backend.herokuapp.com/auth`, {
      credentials: 'include',

      method: 'POST',

      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userToken)
    })
      .then(data => data.json())
      .catch(err => console.log(err))

    if (data.token) {

      sessionStorage.setItem('token', JSON.stringify(data))

      console.log(data)
    

      return data.token

    }

  } else return

}




//Send a post request to server.js with an address and data and have the return value be parsed into a JSON object.

export default async function AuthFetch(address, Data) {


  await SilentRefresh()

  if (sessionStorage.getItem('token')) {

    Data.token = (JSON.parse(sessionStorage.getItem('token')).token);

  }

  try {
    const data = await fetch(`https://chuccle-quizapp-backend.herokuapp.com${address}`, {
      credentials: 'include',

      method: 'POST',

      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Vary': 'Origin',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Data)
    });
    return await data.json();
  } catch (err) {
    return console.log(err);
  }



}