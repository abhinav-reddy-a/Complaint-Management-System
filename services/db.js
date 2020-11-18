const sql = require('mysql');
const keys = require('../config/keys');

const db = sql.createConnection({
    host: keys.sqlHost, //host where mysql database hosted
    user: keys.sqlUser, //username for accessing database
    password: keys.sqlPassword,
    database:keys.sqlDatabase //port: default to 3306 canbe changed
})

//connecting to database
db.connect((err) => {
    if(err){
        console.log("Make sure the database server is running and credentials given are correct in db.js");
        console.log(err);
    }
    else{
        console.log('connected to mysql database !!!');

    }
})

module.exports = db;