const sql = require('mysql')

const db = sql.createConnection({
    host: "localhost", //host where mysql database hosted
    user: "kushaan", //username for accessing database
    password: "abc@123",
    database:"complaint_management" //port: default to 3306 canbe changed
})

//connecting to database
db.connect((err) => {
    if(err){
        console.log("Make sure the database server is running and credentials in db.js");
        console.log(err);
    }
    else{
        console.log('connected to mysql database !!!');

    }
})

module.exports = db;