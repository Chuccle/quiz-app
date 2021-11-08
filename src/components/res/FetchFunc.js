
  export default async function Fetch(address, Data) {

    return fetch(address, {
      method: 'POST',
      
      headers: {
        
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Data)
    })
      .then(data => data.json())
  }