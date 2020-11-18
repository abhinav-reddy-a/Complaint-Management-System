const sql = require('mysql')

const db = sql.createConnection({
    host: "sql12.freemysqlhosting.net", //host where mysql database hosted
    user: "sql12377239", //username for accessing database
    password: "CayLNTSrfB",
    database:"sql12377239" //port: default to 3306 canbe changed
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