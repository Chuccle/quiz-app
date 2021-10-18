const mysql = require('mysql');

//Connection pooling for large scale implementation?

//const connection = mysql.createPool({
//	host     : 'localhost',
//	user     : 'root',
//	password : '',
//	database : 'nodelogin'
//});


const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'nodelogin'
});

module.exports = connection;