const connection = require('./components/Database/Database.js')
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-pbkdf');
const app = express();



require('dotenv').config({ path: '../src/.env' })
//TODO add JSON WEB TOKEN module to handle token verification? done

// add a password hashing algo like bcrypt or argon2id, module would be easiest

// new user registration? 



app.use(cors());
app.use(bodyParser.json())

app.use('/auth', (req, res) => {

  // error 400 bad request
  //jwt must be provided
    token = req.body.token
  try {
  var decoded = jwt.verify(token, process.env.JWT_SECRET);
  res.send({message: decoded})

} catch(err) {
  res.send({error: err })
  
}
 

})

app.use('/login', (req, res) => {

  var username = req.body.username;

  var password = req.body.password;

  const saltRounds = 10;

  bcrypt.hash(password, saltRounds)
  .then(hash => {
     console.log(hash);
  })
  
    //Output: $2b$10$uuIKmW3Pvme9tH8qOn/H7u
    //A 29 characters long random string.


// ? characters in query represent escaped placeholders for our username and password 
  connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, bcrypt.hash(password)], function (error, results, fields) {
    if (error) throw res.send({
      Error: error});

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    if (results.length > 0) {
      
      //signing our token to send to client
      var jwtToken = jwt.sign({
        data: username
      },process.env.JWT_SECRET , { expiresIn: process.env.ACCESS_TOKEN_LIFE });
     
      //sending our token response back to the client
     
      res.send({
        token: jwtToken
      });
    }
  })
})


app.use('/register', (req, res) => {

  var username = req.body.username;

  var password = req.body.password;



// ? characters in query represent escaped placeholders for our username and password 
  
connection.query('SELECT * FROM accounts WHERE username = ?', [username], function (error, results, fields) {
  if (error) throw res.send({
    Error: error});


  else if (!results.length > 0) {  
connection.query('INSERT INTO accounts (username, password) VALUES (?, ?);', [username, bcrypt.hash(password)], function (error, results, fields) {
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    if (error) throw res.send({
      Error: error});
     
      //signing our token to send to client
      var jwtToken = jwt.sign({
        data: username
      },process.env.JWT_SECRET , { expiresIn: process.env.ACCESS_TOKEN_LIFE });
     
      //sending our token response back to the client
     
      res.send({
        token: jwtToken
      });
    }
)} 
 

})

})

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'))





