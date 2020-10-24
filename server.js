const express = require('express');
const logger = require('morgan');
const ejs = require('ejs');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const db = require('./db'); //database connection for queries
const model = require('./models/User');
const passportSetup = require('./services/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');

//create instance of express app
const app = express();

app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys:[keys.cookieKey]
	})
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI,()=>{
	console.log('connected to mongodb');
})

var port = process.env.PORT || 3000;

var indexRouter = require('./routes/index'); //routes defined in other files
var studentRouter=require('./routes/student');
var secyRouter = require('./routes/secy');
var adminRouter = require('./routes/admin');
var authRouter = require('./routes/auth');


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

app.use('/student',studentRouter); // route for studentpage

app.use('/secy',secyRouter); // route for secypage

app.use('/admin',adminRouter); // route for adminpage

app.use('/auth',authRouter); // route for authentication


module.exports = app;