const connection = require('./components/Database/Database.js')
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();




require('dotenv').config({
  path: '../src/.env'
})
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
    console.log(decoded.data)


    res.send({
      message: decoded
    })

  } catch (err) {


    res.send({
      error: err
    })
    console.log(err)

  }


})




app.use('/retrieveStats', (req, res) => {

  // error 400 bad request
  //jwt must be provided

  const token = req.body.token

  try {


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.data)

    //We use primary key as the parameter because it guarantees a unique record without any conflicts

    connection.query('SELECT Quizzes.id, Quizzes.quizname, quiz_user_answers.score FROM Quizzes LEFT JOIN quiz_user_answers ON quiz_user_answers.quizid = Quizzes.id AND quiz_user_answers.userid = ?',
      [decoded.data],
      function (error, results, fields) {

        if (error) throw res.send({
          error: error

        });


        console.log(results)
        res.send({
          results: results
        })


      })


  } catch (err) {
    res.send({
      error: err
    })
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

      const passMatch = bcrypt.compare(password, results[0].password)


      console.log(results[0].id)


      if (passMatch) {

        //signing our token to send to client
        //we use primary key of our record as it guaranatees a unique identifier of the record

        const jwtToken = jwt.sign({
          data: results[0].id
        }, process.env.JWT_SECRET, {
          expiresIn: process.env.ACCESS_TOKEN_LIFE
        });

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

  // first we look for any duplicate usernames with the table
  connection.query('SELECT * FROM accounts WHERE username = ?', [username], function (error, results, fields) {
    if (error) throw res.send({
      Error: error
    });

    // if usernames aren't conflicting, hash password and create new record with supplied data
    if (results.length === 0) {

      bcrypt.hash(password, 10, function (err, hash) {

        console.log(hash)

        connection.query('INSERT INTO accounts (username, password) VALUES (?, ?);', [username, hash], function (error, results, fields) {
          // Getting the 'response' from the database and sending it to our route. This is were the data is.
          if (error) throw res.send({
            Error: error
          });

        })

        //Query again to find record ID of usuing the username

        connection.query('SELECT * FROM accounts WHERE username = ?', [username], function (error, results, fields) {
          if (error) throw res.send({
            Error: error
          });

          //signing our token to send to client using record ID as payload 

          const jwtToken = jwt.sign({
            data: results[0].id
          }, process.env.JWT_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_LIFE
          });


          //sending our token response back to the client

          console.log(jwtToken.data)
          res.send({
            token: jwtToken
          });


        })


      })


    } else {


      res.send({
        error: "username already exists"
      })


    }


  })


})



app.use('/insertquiz', (req, res) => {


  var quizname = req.body.quizname;


  const decodedtoken = jwt.verify(req.body.token, process.env.JWT_SECRET);
  console.log(decodedtoken.data)

  connection.query('INSERT INTO quizzes (quizname, created_by_userid) VALUES (?, ?);', [quizname, decodedtoken.data], function (error, results, fields) {
    if (error) throw res.send({
      Error: error
    });

    console.log(results.insertId)

    res.send({
      id: results.insertId
    })
    //probably not best way to return last insert but ultimately will achieve same effect

    //connection.query('SELECT MAX(id) FROM quizzes WHERE userid = ?', [decodedtoken], function (error, results, fields) {
    //if (error) throw res.send({ Error: error });
    //console.log(results[0].id)
    //})

    //find a way of saving this variable as a state? then calling it per each questionset entry for fk
    //alternatively send back the id to client and have it returned for each questionset http request

  })


  app.use('/insertquestionset', (req, res) => {


    const quizdata = {
      Quizid: req.body.quizid,
      Questionset: {
        Questionname: req.body.questionname,
        Options: {
          Incorrect1: req.body.incorrect1,
          Incorrect2: req.body.incorrect2,
          Incorrect3: req.body.incorrect3,
          Correct: req.body.correct
        }
      }
    }





    connection.query('INSERT INTO questions (QuizID, Question) VALUES (?, ?);', [quizdata.Quizid, quizdata.Questionset.Questionname], function (error, results1, fields) {
      if (error) throw res.send({
        Error: error
      });


      let sql = "INSERT INTO question_options(questionID, questionText, isCorrect) VALUES ?"
      let values = [
        [results1.insertId, quizdata.Questionset.Options.Incorrect1, 0],
        [results1.insertId, quizdata.Questionset.Options.Incorrect2, 0],
        [results1.insertId, quizdata.Questionset.Options.Incorrect3, 0],
        [results1.insertId, quizdata.Questionset.Options.Correct, 1]
      ]

      // find a way of bulk inserting the entire set of options with 2d arraylist? done!

      connection.query(sql, [values], function (error, results2, fields) {
        if (error) throw res.send({
          Error: error
        });

        res.send({
          results: results2.insertId
        })




      })

    })


  })
})


app.listen(8080, () => console.log('API is running on http://localhost:8080/login'))