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
// 	new GoogleStrategy({

// 	}),()=>{

// 	}
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
=======
app.get('/complaint',(req,res)=>{
	var id = req.query.id;
	var query = 'SELECT complaint_list.complaint_id,complaint_subject,complaint_text,complaint_list.date,dept_name,reply_text,reply_list.date,from_to FROM ((complaint_list INNER JOIN department_list ON complaint_list.dept_id = department_list.dept_id) INNER JOIN reply_list ON reply_list.complaint_id = complaint_list.complaint_id and complaint_list.complaint_id = '+id+');' ;
	db.query(query, function (err, result, fields) {
	if (err) throw err;
	    console.log(result);
	    res.render('complaint.ejs',{result:result});
	});
})

app.get('/student_home',(req,res)=>{
	var studentId = 2;
	var query = "SELECT complaint_id,complaint_subject,date,dept_name FROM complaint_list INNER JOIN department_list ON department_list.dept_id = complaint_list.dept_id and student_id = "+studentId+" and resolved = 0;"
	db.query(query, function (err, result, fields) {
	if (err) throw err;
	    console.log(result);
	    res.render('student_home.ejs',{result:result});
	});
})

app.get('/student_history',(req,res)=>{
	var studentId = 2;
	var query = "SELECT complaint_id,complaint_subject,date,dept_name FROM complaint_list INNER JOIN department_list ON department_list.dept_id = complaint_list.dept_id and student_id = "+studentId+" and resolved = 1;"
	db.query(query, function (err, result, fields) {
	if (err) throw err;
	    console.log(result);
	    res.render('student_history.ejs',{result:result});
	});
})

app.get('/new_complaint',(req,res)=>{
	res.render('new_complaint.ejs');
})

app.post('/new_complaint',(req,res)=>{
	var dept_id = req.body.dept_id;
	var complaint_subject = req.body.complaint_subject;
	var complaint_text = req.body.complaint_text;
	var studentId = 2;
	var query = "Insert into complaint_list values(";
})