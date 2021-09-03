
const connection = require('./components/Database/Database.js')
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

//TODO add JSON WEB TOKEN module to handle token verification? Refresh tokens?

// add a password hashing algo like bcrypt or argon2id, module would be easiest

// new user registration? 



app.use(cors());
app.use(bodyParser.json())


app.use('/login', (req, res) => {

  var username = req.body.username;

  var password = req.body.password;
// ? characters in query represent escaped placeholders for our username and password 
  connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
    if (error) throw res.send({
      Error: error});

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    if (results.length > 0) {
      //sending our token response back to the client
      res.send({
        token: 'test123'
      });
    }
  })
})



app.listen(8080, () => console.log('API is running on http://localhost:8080/login'))