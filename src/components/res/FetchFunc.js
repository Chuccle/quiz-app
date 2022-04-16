

//Send a post request to server.js with an address and data and have the return value be parsed into a JSON object.

export default async function Fetch(address, Data) {

  return fetch('https://chuccle-quizapp-backend.herokuapp.com'+address, {
    method: 'POST',

    headers: {

      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Data)
  })
    .then(data => data.json())
}