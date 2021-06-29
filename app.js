console.log("Hello World");

const logo = require("asciiart-logo");

const connection = require("./config/connection");

connection.query("select * from employee", (err, data) =>{
    if(err) throw err;
    console.log(data)
});