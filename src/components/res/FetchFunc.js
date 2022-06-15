


async function SilentRefresh() {


  const tokenString = sessionStorage.getItem('token');

  if (tokenString) {

    const userToken = JSON.parse(tokenString);

    const data = await fetch(`http://localhost:8080/silentrefresh`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (userToken.token)
      },
    })
      .then(data => data.json())
      .catch(err => console.log(err))


    if (data.token) {

      sessionStorage.setItem('token', JSON.stringify(data))

      return data.token

    }

  } else return

}




//Send a post request to server.js with an address and data and have the return value be parsed into a JSON object.

export default async function AuthFetch(address, p_data, operation) {

  if (!sessionStorage.getItem('token')) {
    sessionStorage.setItem('token', JSON.stringify({ token: '' }))
  }

  await SilentRefresh()

  switch (operation) {

    case 'GET':

      try {
        const data = await fetch(`http://localhost:8080${address}`, {
          credentials: 'include',

          method: operation,

          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (JSON.parse(sessionStorage.getItem('token')).token)
          },
        });
        return await data.json();
      } catch (err) {
        return console.log(err);
      }

    case 'POST':

      try {
        const data = await fetch(`http://localhost:8080${address}`, {
          credentials: 'include',

          method: operation,

          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (JSON.parse(sessionStorage.getItem('token')).token)
          },
          body: JSON.stringify(p_data)
        });
        return await data.json();
      } catch (err) {
        return console.log(err);
      }

    case 'PUT':
      try {
        const data = await fetch(`http://localhost:8080${address}`, {
          credentials: 'include',

          method: operation,

          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (JSON.parse(sessionStorage.getItem('token')).token)
          },
          body: JSON.stringify(p_data)
        });
        return await data.json();
      } catch (err) {
        return console.log(err);
      }

    case 'DELETE':

      try {
        const data = await fetch(`http://localhost:8080${address}`, {
          credentials: 'include',

          method: operation,

          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (JSON.parse(sessionStorage.getItem('token')).token)
          },
        });
        return await data.json();
      } catch (err) {
        return console.log(err);
      }

    default:
      return console.log('operation not supported')
  }

}