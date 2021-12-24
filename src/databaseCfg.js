const mysql = require('mysql');

require('dotenv').config({
	path: '../src/.env'
  })


  //Connection pooling 

const connection = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});


// session pooling

//const connection = mysql.createConnection({
	// host: process.env.HOST,
	// user: process.env.USER,
	// password: process.env.PASSWORD,
	// database: process.env.DATABASE,
//});

module.exports = connection;