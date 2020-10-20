const express = require('express');
var router = express.Router();
const db = require('../db'); 

router.get('/home',(req,res)=>{
	var studentId = 2;
	var query = "SELECT complaint_id,complaint_subject,date,dept_name \
				FROM complaint_list INNER JOIN department_list \
				ON department_list.dept_id = complaint_list.dept_id and student_id = "+studentId+" and resolved = 0;"
	db.query(query, function (err, result, fields) {
		if (err) throw err;
		console.log(result);
		res.render('student_home.ejs',{result:result});
	});
})

router.get('/history',(req,res)=>{
	var studentId = 2;
	var query = "SELECT complaint_id,complaint_subject,date,dept_name \
				FROM complaint_list INNER JOIN department_list \
				ON department_list.dept_id = complaint_list.dept_id and student_id = "+studentId+" and resolved = 1;"
	db.query(query, function (err, result, fields) {
		if (err) throw err;
		console.log(result);
		res.render('student_history.ejs',{result:result});
	});
})

router.get('/complaint',(req,res)=>{
	var id = req.query.id;
	var query = 'SELECT complaint_list.complaint_id,complaint_subject,complaint_text,complaint_list.date,dept_name,reply_text,reply_list.date,from_to \
				 FROM ((complaint_list INNER JOIN department_list ON complaint_list.dept_id = department_list.dept_id and complaint_id = '+id+') \
				 LEFT JOIN reply_list ON reply_list.complaint_id = '+id+');' ;
	db.query(query, function (err, result, fields) {
	if (err) throw err;
	    console.log(result);
	    res.render('complaint.ejs',{result:result});
	});
})

router.post('/complaint',(req,res)=>{

	var query = 'INSERT INTO reply_list SET ?'
	var post = {
		reply_text : req.body.reply_text,
		from_to : 'TS',
		complaint_id : req.query.id,
		date : req.body.date
	}
	console.log(query);
	db.query(query,post,(err,result)=> {
		if(err) console.log(err);
		console.log(result);
		res.redirect('/student/home');
	})

})

router.get('/new_complaint',(req,res)=>{
	res.render('new_complaint.ejs');
})

router.post('/new_complaint',(req,res) => { //post method for submitting a complaint the body of request should contain respective methods
	console.log(req.body);
	var query = 'INSERT INTO complaint_list SET ?'
	var post = {
		complaint_subject : req.body.complaint_subject,
		complaint_text : req.body.complaint_text,
		date : req.body.date,
		student_id : req.body.student_id,
		admin_id : req.body.admin_id,
		secy_id : req.body.dept_id,
		dept_id : req.body.dept_id,
		complaint_id : null,
		resolved : 0
	}
	console.log(query);
	db.query(query,post,(err,result)=> {
		if(err) console.log(err);
		console.log(result);
		res.redirect('/student/home');
	})
})

module.exports = router;
