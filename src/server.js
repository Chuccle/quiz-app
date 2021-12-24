const connection = require('./databaseCfg.js')
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();


require('dotenv').config({
  path: '../src/.env'
})

app.use(cors());

app.use(bodyParser.json())


app.post('/auth', (req, res) => {

  // asynchronously check if our tokeb is valid and return the user id in data property of result
  jwt.verify(req.body.token, process.env.JWT_SECRET, function (err, result) {


    if (result) {


      res.send({
        message: result
      })

    } else {

      res.send({
        error: err
      });

    };

  });

});


app.post('/retrievequizzes', (req, res) => {

  // error 400 bad request
  //jwt must be provided

  // asynchronously check if our tokeb is valid and return the user id in data property of result

  jwt.verify(req.body.token, process.env.JWT_SECRET, function (tokenErr, tokenResult) {

    // offset is how many results the page is designed to display
    const offset = req.body.currentpage * 6;


    if (tokenResult) {


      connection.query('SELECT username FROM accounts Where id = ?',
        [tokenResult.data],
        function (selectUsernameError, selectUsernameResult) {

          if (selectUsernameError) throw res.send({
            error: selectUsernameError
          });


          connection.query('SELECT Quizzes.id, Quizzes.quizname, Quizzes.difficulty, quiz_user_answers.score FROM Quizzes LEFT JOIN quiz_user_answers ON quiz_user_answers.quizid = Quizzes.id AND quiz_user_answers.userid = ? LIMIT ? , 6',
            [tokenResult.data, offset],
            function (selectQuizzesError, selectQuizzesResult) {

              if (selectQuizzesError) throw res.send({
                error: selectQuizzesError
              });

              connection.query('SELECT COUNT(*) As count from quizzes;', function (selectQuizCountError, selectQuizCountResult) {
                if (selectQuizCountError) throw res.send({
                  error: selectQuizCountError
                });


                res.send({
                  results: selectQuizzesResult,
                  name: selectUsernameResult,
                  quizcount: selectQuizCountResult
                });

              });

            });

        });

    } else {

      res.send({
        error: tokenErr
      });


    };

  });

});


app.post('/login', (req, res) => {

  // ? characters in query represent escaped placeholders for our username and password 

  connection.query('SELECT * FROM accounts WHERE username = ?', [req.body.username], function (selectUserRecordError, selectUserRecordResults) {

    if (selectUserRecordError) throw res.send({
      error: selectUserRecordError
    });

    // Getting the 'response' from the database and sending it to our route. This is were the data is.

    if (selectUserRecordResults.length > 0) {

      bcrypt.compare(req.body.password, selectUserRecordResults[0].password, function (passwordCompareErr, passwordCompareResult) {

        if (passwordCompareResult) {

          //signing our token to send to client
          //we use primary key of our record as it guaranatees a unique identifier of the record

          jwt.sign({
            data: selectUserRecordResults[0].id
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

            };

          });

        } else {

          res.send({
            error: passwordCompareErr
          });

        };

      });

    };

  });

});


app.post('/register', (req, res) => {

  // ? characters in query represent escaped placeholders for our username and password 

  // first we look for any duplicate usernames with the table

  connection.query('SELECT * FROM accounts WHERE username = ?', [req.body.username], function (selectUserRecordError, selectUserRecordResults) {
    if (selectUserRecordError) throw res.send({
      error: selectUserRecordError
    });

    // If usernames aren't conflicting, hash password and create new record with supplied data

    if (selectUserRecordResults.length === 0) {

      bcrypt.hash(req.body.password, 10, function (hasherr, hash) {

        if (hash) {


          connection.query('INSERT INTO accounts (username, password) VALUES (?, ?);', [req.body.username, hash], function (InsertUserError, InsertUserResults) {

            // Getting the 'response' from the database and sending it to our route. This is were the data is.

            if (InsertUserError) throw res.send({
              error: InsertUserError
            });

            jwt.sign({
              data: InsertUserResults.insertId
            }, process.env.JWT_SECRET, {
              expiresIn: process.env.ACCESS_TOKEN_LIFE
            }, function (tokenCreationErr, tokenCreationSuccess) {

              if (tokenCreationSuccess) {


                res.send({
                  token: tokenCreationSuccess
                });

              } else {

                res.send({
                  error: tokenCreationErr
                });

              };

            });

          });

        } else {

          res.send({
            error: hasherr
          });

        }

      })

    } else {

      res.send({
        error: "username already exists"
      });

    };

  });

});


app.post('/insertquiz', (req, res) => {


  jwt.verify(req.body.token, process.env.JWT_SECRET, function (tokenErr, tokenSuccess) {


    connection.query('INSERT INTO quizzes (quizname, created_by_userid, difficulty) VALUES (?, ?, ?);', [req.body.questionset[0].Quizname, tokenSuccess.data, req.body.questionset[0].Difficulty], function (insertQuizError, insertQuizResults) {

      if (insertQuizError) throw res.send({
        error: insertQuizError
      });

      req.body.questionset.forEach(questiondata => {

        connection.query('INSERT INTO questions (QuizID, Question) VALUES (?, ?);', [insertQuizResults.insertId, questiondata.Questionset.Questionname], function (insertQuestionsError, insertQuestionsResults) {

          if (insertQuestionsError) throw res.send({
            error: insertQuestionsError
          });

          let sql = "INSERT INTO question_options(questionID, questionText, isCorrect) VALUES ?";

          let values = [
            [insertQuestionsResults.insertId, questiondata.Questionset.Options.Incorrect1, 0],
            [insertQuestionsResults.insertId, questiondata.Questionset.Options.Incorrect2, 0],
            [insertQuestionsResults.insertId, questiondata.Questionset.Options.Incorrect3, 0],
            [insertQuestionsResults.insertId, questiondata.Questionset.Options.Correct, 1]
          ];

          // find a way of bulk inserting the entire set of options with 2d arraylist? done!

          connection.query(sql, [values], function (insertQuestionsetError) {

            if (insertQuestionsetError) throw res.send({
              error: insertQuestionsetError

            });

          });

        });

      });

      res.send({
        QuizStatus: "Inserted"
      });

    });

    if (tokenErr) {

      res.send({
        error: tokenErr
      });

    };

  });

});


app.post('/retrievequestions', (req, res) => {

  jwt.verify(req.body.token, process.env.JWT_SECRET);

  const questionqueue = [];

  connection.query('Select * from questions where Quizid = ?', [req.body.quizid], function (selectQuestionRecordsError, selectQuestionRecordsResults) {

    if (selectQuestionRecordsError) throw res.send({
      error: selectQuestionRecordsError
    });

    for (let i = 0; selectQuestionRecordsResults.length > i; i++) {

      connection.query('Select * from question_options where questionID = ? AND isCorrect = 1', [selectQuestionRecordsResults[i].id], function (selectCorrectOptionRecordError, CorrectOptionRecordResults) {

        if (selectCorrectOptionRecordError) throw res.send({
          error: selectCorrectOptionRecordError
        });

        connection.query('Select * from question_options where questionID = ? AND isCorrect = 0', [selectQuestionRecordsResults[i].id], function (selectIncorrectOptionsRecordError, IncorrectOptionRecordResults) {

          if (selectCorrectOptionRecordError) throw res.send({
            error: selectIncorrectOptionsRecordError
          });

          const questiondata = {

            Questionid: selectQuestionRecordsResults[i].id,
            Questiontext: selectQuestionRecordsResults[i].Question,
            Options: {
              Correctid: CorrectOptionRecordResults[0].id,
              Correct: CorrectOptionRecordResults[0].questionText,
              Incorrect1id: IncorrectOptionRecordResults[0].id,
              Incorrect1: IncorrectOptionRecordResults[0].questionText,
              Incorrect2id: IncorrectOptionRecordResults[1].id,
              Incorrect2: IncorrectOptionRecordResults[1].questionText,
              Incorrect3id: IncorrectOptionRecordResults[2].id,
              Incorrect3: IncorrectOptionRecordResults[2].questionText,
            }

          }

          questionqueue.push(questiondata);

          // inefficient, runs every iteration

          if (i === (selectQuestionRecordsResults.length - 1)) {

            res.send({
              questions: questionqueue
            });

          };

        });

      });

    };

    // why does this return an empty array?
   

  });

});

app.post('/sendresults', (req, res) => {

  jwt.verify(req.body.token, process.env.JWT_SECRET, function (verifyError, verifySuccess) {

    if (verifySuccess) {

      connection.query('Select * from quiz_user_answers where userid = ? And quizid = ?', [verifySuccess.data, req.body.quizid], function (selectUserQuizDataError, selectUserQuizDataResults) {

        if (selectUserQuizDataError) throw res.send({
          error: selectUserQuizDataError
        });

        if (selectUserQuizDataResults.length === 0) {

          connection.query('insert into quiz_user_answers(userid, quizid, score) values (?,?,?)', [verifySuccess.data, req.body.quizid, req.body.results], function (insertUserQuizDataError) {

            if (insertUserQuizDataError) throw res.send({
              error: insertUserQuizDataError
            });

          });

        } else {

          if (selectUserQuizDataResults[0].score < req.body.results) {
            //by using update we can reduce the amount of records overall, the alternative is multiple records with different scores
            connection.query('UPDATE quiz_user_answers SET score = ? WHERE id = ?', [req.body.results, selectUserQuizDataResults[0].id], function (updateUserQuizDataError) {

              if (updateUserQuizDataError) throw res.send({
                error: updateUserQuizDataError

              });

            });

          };

        };

      });

      res.send({
        status: "ok"
      });

    } else {

      res.send({
        error: verifyError

      });

    };

  });

});

app.post('/retrieveleaderboard', (req, res) => {


  // TODO also add a algorithm which uses the score of each quiz a user has attempted and weights them based on that score

  // i.e: input =   6(80) 2(100) =>  680 points    

  jwt.verify(req.body.token, process.env.JWT_SECRET);

  const offset = req.body.currentpage * 3;

  connection.query('SELECT ROW_NUMBER() OVER ( ORDER BY successfulQuizzes DESC ) AS rank, accounts.id, accounts.username, COUNT(quiz_user_answers.quizID) AS successfulQuizzes FROM accounts INNER JOIN quiz_user_answers ON quiz_user_answers.userid = accounts.id WHERE quiz_user_answers.score>=80 GROUP BY accounts.id order by successfulQuizzes DESC  LIMIT ? , 3;', [offset], function (selectQuizScoresError, selectQuizScoresResults) {

    if (selectQuizScoresError) throw res.send({
      error: selectQuizScoresError
    });

    connection.query('SELECT COUNT(*) as count from (SELECT ROW_NUMBER() OVER ( ORDER BY successfulQuizzes DESC ) AS rank, accounts.id, accounts.username, COUNT(quiz_user_answers.quizID) AS successfulQuizzes FROM accounts INNER JOIN quiz_user_answers ON quiz_user_answers.userid = accounts.id WHERE quiz_user_answers.score>=80 GROUP BY accounts.id order by successfulQuizzes DESC) x;', function (selectTotalLeaderboardCountError, selectTotalLeaderboardCountResult) {

      if (selectTotalLeaderboardCountError) throw res.send({
        error: selectTotalLeaderboardCountError
      });

      res.send({
        results: selectQuizScoresResults,
        leaderboardcount: selectTotalLeaderboardCountResult
      });

    });

  });

});



app.post('/finduserrank', (req, res) => {

  jwt.verify(req.body.token, process.env.JWT_SECRET, function (tokenErr, tokenResult) {

    if (tokenResult) {

      const offset = req.body.currentpage * 3;

      connection.query('SELECT * from (SELECT ROW_NUMBER() OVER ( ORDER BY successfulQuizzes DESC ) AS rank, accounts.id, accounts.username, COUNT(quiz_user_answers.quizID) AS successfulQuizzes FROM accounts INNER JOIN quiz_user_answers ON quiz_user_answers.userid = accounts.id WHERE quiz_user_answers.score>=80 GROUP BY accounts.id order by successfulQuizzes DESC) x WHERE username = ? LIMIT ?, 3', [req.body.currentsearchquery, offset], function (selectUserPositionError, selectUserPositionResults) {

        if (selectUserPositionError) throw res.send({
          error: selectUserPositionError
        });

        connection.query('SELECT COUNT(*) AS usersearchcount FROM (SELECT * from (SELECT ROW_NUMBER() OVER ( ORDER BY successfulQuizzes DESC ) AS rank, accounts.id, accounts.username, COUNT(quiz_user_answers.quizID) AS successfulQuizzes FROM accounts INNER JOIN quiz_user_answers ON quiz_user_answers.userid = accounts.id WHERE quiz_user_answers.score>=80 GROUP BY accounts.id order by successfulQuizzes DESC) x WHERE username = ?) x;', [req.body.currentsearchquery], function (selectUserPositionCountError, selectUserPositionCountResults) {

          if (selectUserPositionCountError) throw res.send({
            error: selectUserPositionCountError
          });

          res.send({
            results: selectUserPositionResults,
            leaderboardcount: selectUserPositionCountResults
          });

        });

      });

    } else {

      res.send({
        error: tokenErr
      });

    };

  });

});


app.post('/findquiz', (req, res) => {

  jwt.verify(req.body.token, process.env.JWT_SECRET, function (tokenErr, tokenResult) {

    if (tokenResult) {

    

      const offset = req.body.currentpage * 6;

    

      connection.query('SELECT Quizzes.id, Quizzes.quizname, Quizzes.difficulty, quiz_user_answers.score FROM Quizzes LEFT JOIN quiz_user_answers ON quiz_user_answers.quizid = Quizzes.id AND quiz_user_answers.userid = ? Where Quizzes.quizname = ? LIMIT ?, 6',
        [tokenResult.data, req.body.currentsearchquery, offset],
        function (selectQuiznameError, selectQuiznameResult) {

          if (selectQuiznameError) throw res.send({
            error: selectQuiznameError

          });

          connection.query('SELECT COUNT(*) AS quizsearchcount FROM (SELECT Quizzes.id, Quizzes.quizname, Quizzes.difficulty, quiz_user_answers.score FROM Quizzes LEFT JOIN quiz_user_answers ON quiz_user_answers.quizid = Quizzes.id AND quiz_user_answers.userid = ? WHERE Quizzes.quizname = ?) x',
            [tokenResult.data, req.body.currentsearchquery],
            function (selectQuiznameCountError, selectQuiznameCountResult) {

              if (selectQuiznameCountError) throw res.send({
                error: selectQuiznameError

              });

              res.send({
                results: selectQuiznameResult,
                quizsearchcount: selectQuiznameCountResult
             
              });

            });

        });

    } else {

      res.send({
        error: tokenErr
      });


    };

  });

});

app.post('/retrieveuserquizzes', (req, res) => {

  jwt.verify(req.body.token, process.env.JWT_SECRET, function (tokenErr, tokenResult) {

    if (tokenResult) {  

      const offset = req.body.currentpage * 6;

      connection.query('SELECT * from Quizzes Where created_by_userid = ? LIMIT ?, 6',
        [tokenResult.data, offset],
        function (selectUserQuizzesError, selectUserQuizzesResult) {

          if (selectUserQuizzesError) throw res.send({
            error: selectUserQuizzesError

          });

          connection.query('SELECT COUNT(*) AS quizcount FROM (SELECT quizname and difficulty from Quizzes Where created_by_userid = ?) x',
            [tokenResult.data],
            function (selectUserQuizCountError, selectUserQuizCountResult) {

              if (selectUserQuizCountError) throw res.send({
                error: selectUserQuizCountError

              });

      
              res.send({
                results: selectUserQuizzesResult,
                quizsearchcount: selectUserQuizCountResult
              });

            });

        });

    } else {

      res.send({
        error: tokenErr
      });

    

    };

  });

});


app.post('/removeuserquiz', (req, res) => {

  jwt.verify(req.body.token, process.env.JWT_SECRET, function (tokenErr, tokenResult) {

    if (tokenResult) {

      connection.query('DELETE FROM Quizzes Where id = ?',
        [req.body.primaryKeyId],

        function (dropUserQuizzesError, dropUserQuizzesResult) {

          if (dropUserQuizzesError) throw res.send({
            error: dropUserQuizzesError

          });

          res.send({
            results: dropUserQuizzesResult
          });

        });

    } else {

      res.send({
        error: tokenErr
      });

    };

  });

});

app.post('/updateuserquizdifficulty', (req, res) => {

  jwt.verify(req.body.token, process.env.JWT_SECRET, function (tokenErr, tokenResult) {

    if (tokenResult) {

      connection.query('UPDATE quizzes SET difficulty = ? WHERE id = ?;',
        [req.body.optionalValue1, req.body.primaryKeyId],

        function (updateUserQuizDifficultyError, updateUserQuizDifficultyResult) {

          if (updateUserQuizDifficultyError) throw res.send({
            error: updateUserQuizDifficultyError

          });

          res.send({
            results: updateUserQuizDifficultyResult
          });

        });

    } else {

      res.send({
        error: tokenErr
      });

    };

  });

});


app.post('/updateuserquizname', (req, res) => {

  jwt.verify(req.body.token, process.env.JWT_SECRET, function (tokenErr, tokenResult) {

    if (tokenResult) {

      connection.query('UPDATE quizzes SET quizname = ? WHERE id = ?;',
        [req.body.optionalValue1, req.body.primaryKeyId],

        function (updateUserQuizNameError, updateUserQuizNameResult) {

          if (updateUserQuizNameError) throw res.send({
            error: updateUserQuizNameError

          });

          res.send({
            results: updateUserQuizNameResult
          });

        });

    } else {

      res.send({
        error: tokenErr
      });

    };

  });

});





app.post('/updateuserquestion', (req, res) => {

  jwt.verify(req.body.token, process.env.JWT_SECRET, function (tokenErr, tokenResult) {

    if (tokenResult) {


      // realistically the Quizid reference is overkill but it further ensures that the right question is only updated if the question belongs to the corresponding quiz 

      connection.query('UPDATE questions SET Question = ? WHERE id = ? AND Quizid = ?;',
        [req.body.optionalValue1, req.body.primaryKeyId, req.body.optionalValue2],

        function (updateUserQuestionNameError, updateUserQuestionNameResult) {

          if (updateUserQuestionNameError) throw res.send({
            error: updateUserQuestionNameError

          });

          res.send({
            results: updateUserQuestionNameResult
          });

        });

    } else {

      res.send({
        error: tokenErr
      });

    };

  });

});


app.post('/updateuserquestionoption', (req, res) => {

  jwt.verify(req.body.token, process.env.JWT_SECRET, function (tokenErr, tokenResult) {

    if (tokenResult) {


      // realistically the Quizid reference is overkill but it further ensures that the right question is only updated if the question belongs to the corresponding quiz 

      connection.query('UPDATE question_options SET questionText = ? WHERE id = ? AND questionID = ?;',
        [req.body.optionalValue1, req.body.primaryKeyId, req.body.optionalValue2],

        function (updateUserQuestionOptionError, updateUserQuestionOptionResult) {

          if (updateUserQuestionOptionError) throw res.send({
            error: updateUserQuestionOptionError

          });

          res.send({
            results: updateUserQuestionOptionResult
          });

        });

    } else {

      res.send({
        error: tokenErr
      });

    };

  });

});


app.post('/finduserquizzes', (req, res) => {

  jwt.verify(req.body.token, process.env.JWT_SECRET, function (tokenErr, tokenResult) {

    if (tokenResult) {


      const offset = req.body.currentpage * 6;


      connection.query('SELECT * from Quizzes Where created_by_userid = ? AND quizname = ?  LIMIT ?, 6',
        [tokenResult.data, req.body.searchquery, offset],
        function (selectUserQuizzesError, selectUserQuizzesResult) {

          if (selectUserQuizzesError) throw res.send({
            error: selectUserQuizzesError

          });

          connection.query('SELECT COUNT(*) AS quizcount FROM (SELECT quizname and difficulty from Quizzes Where created_by_userid = ? AND quizname = ?) x',
            [tokenResult.data, req.body.searchquery],
            function (selectUserQuizCountError, selectUserQuizCountResult) {

              if (selectUserQuizCountError) throw res.send({
                error: selectUserQuizCountError

              });

              res.send({
                results: selectUserQuizzesResult,
                quizsearchcount: selectUserQuizCountResult
              });

            });

        });

    } else {

      res.send({
        error: tokenErr
      });

    };

  });

});



app.listen(8080);