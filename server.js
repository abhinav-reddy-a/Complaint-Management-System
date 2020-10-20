const express = require('express');
const logger = require('morgan');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const db = require('./db'); //database connection for queries


var indexRouter = require('./routes/index'); //routes defined in other files
var studentRouter=require('./routes/student');

// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

// passport.use(
// new GoogleStrategy({

// }),()=>{

// }
// )

var port = process.env.PORT || 3000;

//create instance of express app
var app = express();

//to serve html and js in ejs
app.set('view engine', 'ejs');

//we want to send css, images, and other static files from folder views
app.use(express.static('views'));
app.set('views',__dirname + '/views')

// give server access to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//logging in development mode
app.use(logger('dev'));

app.listen(port, () => console.log(`listening to PORT ${port}...`));

app.use('/',indexRouter); //router for home page before login

app.get('/login',(req,res)=>{
res.render('login.ejs');
})

app.use('/student',studentRouter); // route for studentpage


module.exports = app;
