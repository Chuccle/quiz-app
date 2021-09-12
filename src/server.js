const connection = require('./components/Database/Database.js')
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

  const token = req.body.token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.send({ message: decoded })

  } catch (err) {
    res.send({ error: err })
    console.log(err)

  }


})


app.use('/login', (req, res) => {

  let username = req.body.username;

  let password = req.body.password;


  // ? characters in query represent escaped placeholders for our username and password 
  connection.query('SELECT * FROM accounts WHERE username = ?', [username], function (error, results, fields) {
    if (error) throw res.send({
      Error: error
    });

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    if (results.length > 0) {

      const match = bcrypt.compare(password, results[0].password)

      console.log(results[0].password)

      if (match) {

        //signing our token to send to client


        const jwtToken = jwt.sign({
          data: username
        }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFE });

        //sending our token response back to the client

        res.send({
          token: jwtToken
        });
      }
    }
  })
})


app.use('/register', (req, res) => {


  let username = req.body.username;
  let password = req.body.password;




  // ? characters in query represent escaped placeholders for our username and password 

  connection.query('SELECT * FROM accounts WHERE username = ?', [username], function (error, results, fields) {
    if (error) throw res.send({
      Error: error
    });


    else if (!results.length > 0) {

      bcrypt.hash(password, 10, function (err, hash) {

        console.log(hash)

        if (err)
          res.sendStatus(400)

        else {

          connection.query('INSERT INTO accounts (username, password) VALUES (?, ?);', [username, hash], function (error, results, fields) {
            // Getting the 'response' from the database and sending it to our route. This is were the data is.
            if (error) throw res.send({
              Error: error
            });
          })

          //signing our token to send to client
          const jwtToken = jwt.sign({
            data: username
          }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFE });

          //sending our token response back to the client

          res.send({
            token: jwtToken
          });
        }
      })
    }


  })

})

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'))





