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
// TODO add JSON WEB TOKEN module to handle token verification? done

// add a password hashing algo like bcrypt or argon2id, module would be easiest

// new user registration? 

app.use(cors());
app.use(bodyParser.json())

app.post('/auth', (req, res) => {

  // error 400 bad request
  //jwt must be provided

  jwt.verify(req.body.token, process.env.JWT_SECRET, function (err, result) {


    if (result) {


      console.log(result.data)


      res.send({
        message: result
      })

    } else {

      res.send({
        error: err
      })

    }

  })

})







app.post('/retrieveStats', (req, res) => {

  // error 400 bad request
  //jwt must be provided

  jwt.verify(req.body.token, process.env.JWT_SECRET, function (tokenErr, tokenResult) {

    if (tokenResult) {
      try {


        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(tokenResult.data)

        connection.query('SELECT username FROM accounts Where id = ?',
          [tokenResult.data],
          function (error, resultsname, fields) {

            if (error) throw res.send({
              error: error

            });
            //We use primary key as the parameter because it guarantees a unique record without any conflicts

            connection.query('SELECT Quizzes.id, Quizzes.quizname, Quizzes.difficulty, quiz_user_answers.score FROM Quizzes LEFT JOIN quiz_user_answers ON quiz_user_answers.quizid = Quizzes.id AND quiz_user_answers.userid = ?',
              [tokenResult.data],
              function (error, resultsquizzes, fields) {

                if (error) throw res.send({
                  error: error

                });


                console.log(resultsname)
                res.send({
                  results: resultsquizzes,
                  name: resultsname
                })


              })
          })

      } catch (err) {
        res.send({
          error: err
        })
        console.log(err)

      }
    } else {

      res.send({
        error: tokenErr
      })
      console.log(tokenErr)
    }


  })
})


app.post('/login', (req, res) => {

  try {

    // ? characters in query represent escaped placeholders for our username and password 
    connection.query('SELECT * FROM accounts WHERE username = ?', [req.body.username], function (error, results, fields) {

      if (error) throw res.send({
        Error: error
      });

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      if (results.length > 0) {



        bcrypt.compare(req.body.password, results[0].password, function (err, result) {

          if (result) {

            console.log(results[0].id)

            //signing our token to send to client
            //we use primary key of our record as it guaranatees a unique identifier of the record


            jwt.sign({
              data: results[0].id
            }, process.env.JWT_SECRET, {
              expiresIn: process.env.ACCESS_TOKEN_LIFE
            }, function (tokenErr, tokenSuccess) {


              if (tokenSuccess) {
                //sending our token response back to the client

                res.send({
                  token: tokenSuccess
                });
              } else {
                res.send({
                  error: tokenErr
                });


              }


            })

          } else {

            res.send({
              error: "wrong password"
            });
          }


        })



      }

    })
  } catch (err) {


    res.send({
      error: err
    })
    console.log(err)

  }

})


app.post('/register', (req, res) => {

  try {

    // ? characters in query represent escaped placeholders for our username and password 

    // first we look for any duplicate usernames with the table
    connection.query('SELECT * FROM accounts WHERE username = ?', [req.body.username], function (error, results, fields) {
      if (error) throw res.send({
        Error: error
      });

      // If usernames aren't conflicting, hash password and create new record with supplied data
      if (results.length === 0) {

        bcrypt.hash(req.body.password, 10, function (hasherr, hash) {

          if (hash) {

            console.log(hash)

            connection.query('INSERT INTO accounts (username, password) VALUES (?, ?);', [req.body.username, hash], function (error, results, fields) {
              // Getting the 'response' from the database and sending it to our route. This is were the data is.
              if (error) throw res.send({
                Error: error
              });

            })
          } else {

            res.send({
              error: hasherr
            })
          }


          // Query again to find record ID of usuing the username

          connection.query('SELECT * FROM accounts WHERE username = ?', [req.body.username], function (error, results, fields) {
            if (error) throw res.send({
              Error: error
            });

            // Signing our token to send to client using record ID as payload 

            jwt.sign({
              data: results[0].id
            }, process.env.JWT_SECRET, {
              expiresIn: process.env.ACCESS_TOKEN_LIFE
            }, function (tokenCreationErr, tokenCreationSuccess) {
              ;


              // Sending our token response back to the client

              if (tokenCreationSuccess) {


                console.log(tokenCreationSuccess.data)
                res.send({
                  token: tokenCreationSuccess
                });
              } else {

                res.send({
                  error: tokenCreationErr
                })
              }

            })

          })
        })
      } else {


        res.send({
          error: "username already exists"
        })


      }


    })
  } catch (err) {


    res.send({
      error: err
    })
    console.log(err)

  }


})



app.post('/insertquiz', (req, res) => {

  try {

    console.log(req.body.questionset[0])
    jwt.verify(req.body.token, process.env.JWT_SECRET, function (tokenErr, tokenSuccess) {
      ;
      console.log(req.body.questionset[0].Quizname, tokenSuccess.data, req.body.questionset[0].Difficulty)


      connection.query('INSERT INTO quizzes (quizname, created_by_userid, difficulty) VALUES (?, ?,?);', [req.body.questionset[0].Quizname, tokenSuccess.data, req.body.questionset[0].Difficulty], function (error, results, fields) {
        if (error) throw res.send({
          Error: error
        });



        req.body.questionset.forEach(questiondata => {

          connection.query('INSERT INTO questions (QuizID, Question) VALUES (?, ?);', [results.insertId, questiondata.Questionset.Questionname], function (error, results1, fields) {
            if (error) throw res.send({
              Error: error
            });


            let sql = "INSERT INTO question_options(questionID, questionText, isCorrect) VALUES ?"
            let values = [
              [results1.insertId, questiondata.Questionset.Options.Incorrect1, 0],
              [results1.insertId, questiondata.Questionset.Options.Incorrect2, 0],
              [results1.insertId, questiondata.Questionset.Options.Incorrect3, 0],
              [results1.insertId, questiondata.Questionset.Options.Correct, 1]
            ]

            // find a way of bulk inserting the entire set of options with 2d arraylist? done!

            connection.query(sql, [values], function (error, results2, fields) {
              if (error) throw res.send({
                Error: error
              });
            })
          })

        })

        res.send({
          QuizStatus: "Inserted"
        })

      })

      if (tokenErr) {

        res.send({
          error: tokenErr
        })

      }

    })
  } catch (err) {


    res.send({
      error: err
    })
    console.log(err)

  }


})




app.post('/retrievequestions', (req, res) => {


  try {

    jwt.verify(req.body.token, process.env.JWT_SECRET);
    const questionqueue = []


    connection.query('Select * from questions where Quizid = ?', [req.body.quizid], function (error, questionresults, fields) {
      if (error) throw res.send({
        Error: error
      });



      for (let i = 0; questionresults.length > i; i++) {


        connection.query('Select * from question_options where questionID = ? AND isCorrect = 1', [questionresults[i].id], function (error, CorrectOptionResults, fields) {
          if (error) throw res.send({
            Error: error
          });

          connection.query('Select * from question_options where questionID = ? AND isCorrect = 0', [questionresults[i].id], function (error, IncorrectOptionResults, fields) {
            if (error) throw res.send({
              Error: error
            });



            const questiondata = {

              Questionid: questionresults[i].id,
              Questiontext: questionresults[i].Question,
              Options: {
                Correct: CorrectOptionResults[0].questionText,
                Incorrect1: IncorrectOptionResults[0].questionText,
                Incorrect2: IncorrectOptionResults[1].questionText,
                Incorrect3: IncorrectOptionResults[2].questionText,
              }

            }

            questionqueue.push(questiondata)

            // inefficient, runs every iteration

            if (i === (questionresults.length-1)) {

              res.send({
                questions: questionqueue
              })



            }


          })


        })

      }


      // why does this return an empty array?
      //console.log(questionqueue?)



    })

  } catch (err) {


    res.send({
      error: err
    })
    console.log(err)

  }

})

app.post('/sendresults', (req, res) => {



  jwt.verify(req.body.token, process.env.JWT_SECRET, function (verifyError, verifySuccess)

    {

      if (verifySuccess) {

        try {


          connection.query('Select * from quiz_user_answers where userid = ? And quizid = ?', [verifySuccess.data, req.body.quizid], function (error, results, fields) {
            if (error) throw res.send({
              Error: error
            });

            if (results.length === 0) {
              connection.query('insert into quiz_user_answers(userid, quizid, score) values (?,?,?)', [verifySuccess.data, req.body.quizid, req.body.results], function (error, results, fields) {
                if (error) throw res.send({
                  Error: error
                });
              })

            } else {


              if (results[0].score < req.body.results) {
                //by using update we can reduce the amount of records overall, the alternative is multiple records with different scores
                connection.query('UPDATE quiz_user_answers SET score = ? WHERE id = ?', [req.body.results, results[0].id], function (error, results, fields) {
                  if (error) throw res.send({
                    Error: error
                  });
                })

              }
            }

          })

          res.send({
            status: "ok"
          })
        } catch (err) {


          res.send({
            error: err
          })
          console.log(err)

        }
      } else {

        res.send({
          error: verifyError
        })
      }


    })


})

app.post('/retrieveleaderboard', (req, res) => {


  try {


    jwt.verify(req.body.token, process.env.JWT_SECRET);


    connection.query('SELECT ROW_NUMBER() OVER ( ORDER BY successfulQuizzes DESC ) AS rank, accounts.id, accounts.username, COUNT(quiz_user_answers.quizID) AS successfulQuizzes FROM accounts INNER JOIN quiz_user_answers ON quiz_user_answers.userid = accounts.id WHERE quiz_user_answers.score>=80 GROUP BY accounts.id order by successfulQuizzes DESC ;', function (error, results, fields) {
      if (error) throw res.send({
        Error: error
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




app.listen(8080, () => console.log('API is running on http://localhost:8080/login'))