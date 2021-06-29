const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tech123',
    database: 'employees2021'
});

connection.connect();

module.exports = connection;