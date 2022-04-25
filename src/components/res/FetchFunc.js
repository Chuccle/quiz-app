


async function SilentRefresh() {


  const tokenString = sessionStorage.getItem('token');

  if (tokenString) {

    const userToken = JSON.parse(tokenString);

    const data = await fetch(`https://chuccle-quizapp-backend.herokuapp.com/silentrefresh`, {
      credentials: 'include',

      method: 'POST',

      headers: {
        'Access-Control-Allow-Origin': 'https://quiz-app-git-refreshtokentest-chuccle.vercel.app',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userToken)
    })
      .then(data => data.json())
      .catch(err => console.log(err))


      console.log(data)
    
    
      if (data.token) {

      sessionStorage.setItem('token', JSON.stringify(data))

      
    

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
        'Access-Control-Allow-Origin': 'https://quiz-app-git-refreshtokentest-chuccle.vercel.app',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Data)
    });
    return await data.json();
  } catch (err) {
    return console.log(err);
  }



}