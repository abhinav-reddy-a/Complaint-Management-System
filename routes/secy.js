const express = require('express');
var router = express.Router();
const db = require('../db');
var keys = require('../config/keys');

router.get('/home',(req,res)=>{
	if(typeof req.user!='undefined'){
		if(req.session.user == keys.secyKey){
			var secyId = req.session.id;
			var query = "SELECT complaint_id,complaint_subject,date,dept_name \
						FROM complaint_list INNER JOIN department_list \
						ON department_list.dept_id = complaint_list.dept_id and secy_id = "+secyId+" and resolved = 0;"
			db.query(query, function (err, result, fields) {
				if (err){
					console.log(err);
					res.send({success:false,message:'database error',err:err});		
				}else{
					console.log(result);
					res.render('student_home.ejs',{result:result});	
				}
			});
		}else{
			res.redirect('../auth/logout');
		}
	}else{
		res.redirect('../');
	}
})

router.get('/history',(req,res)=>{
	if(typeof req.user!='undefined'){
		if(req.session.user == keys.secyKey){
			var secyId = req.session.id;
			var query = "SELECT complaint_id,complaint_subject,date,dept_name \
						FROM complaint_list INNER JOIN department_list \
						ON department_list.dept_id = complaint_list.dept_id and secy_id = "+secyId+" and resolved = 1;"
			db.query(query, function (err, result, fields) {
				if (err){
					console.log(err);
					res.send({success:false,message:'database error',err:err});		
				}else{
					console.log(result);
					res.render('secy_history.ejs',{result:result});	
				}
			});
		}else{
			res.redirect('../auth/logout');
		}
	}else{
		res.redirect('../');
	}
})

router.get('/complaint',(req,res)=>{
	if(typeof req.user!='undefined'){
		if(req.session.user == keys.secyKey){
			var id = req.query.id;
			var query = 'SELECT complaint_list.complaint_id,complaint_list.dept_id,complaint_list.admin_id,complaint_subject,complaint_text,complaint_list.date,dept_name,reply_text,reply_list.date,from_to \
						 FROM ((complaint_list INNER JOIN department_list ON complaint_list.dept_id = department_list.dept_id and complaint_id = '+id+') \
						 LEFT JOIN reply_list ON reply_list.complaint_id = '+id+');' ;
			db.query(query, function (err, result, fields) {
				if (err){
					console.log(err);
					res.send({success:false,message:'database error',err:err});		
				}else{
					console.log(result);
				    res.render('complaint.ejs',{result:result,role:'secy'});
				}
			});
		}else{
			res.redirect('../auth/logout');
		}
	}else{
		res.redirect('../');
	}
})

router.post('/complaint',(req,res)=>{

	var query = 'INSERT INTO reply_list SET ?'
	var post = {
		reply_text : req.body.reply_text,
		from_to : 'S',
		complaint_id : req.query.id,
		date : req.body.date
	}
	console.log(query);
	db.query(query,post,(err,result)=> {
		if(err){
			console.log(err);
			res.send({success:false,message:'database error',err:err});		
		}else{
			console.log(result);
			res.redirect('/secy/home');	
		}
	})

})

router.get('/new_complaint',(req,res)=>{
	if(typeof req.user!='undefined'){
		if(req.session.user == keys.secyKey){
			res.render('new_complaint.ejs',{id:req.session.id,role:'secy'});
		}else{
			res.redirect('../auth/logout');
		}
	}else{
		res.redirect('../');
	}
})

router.post('/new_complaint',(req,res) => { //post method for submitting a complaint the body of request should contain respective methods
	if(typeof req.user!='undefined'){
		if(req.session.user == keys.secyKey){
			console.log(req.body);
			var query = 'INSERT INTO complaint_list SET ?'
			var post = {
				complaint_subject : req.body.complaint_subject,
				complaint_text : req.body.complaint_text,
				date : req.body.date,
				student_id : req.body.null,
				admin_id : req.body.dept_id,
				secy_id : req.body.secy_id,
				dept_id : req.body.dept_id,
				complaint_id : null,
				resolved : 0
			}
			console.log(query);
			db.query(query,post,(err,result)=> {
				if(err){
					console.log(err);
					res.send({success:false,message:'database error',err:err});				
				}else{
					console.log(result);
					res.redirect('/secy/home');	
				}
			})
		}else{
			res.redirect('../auth/logout');
		}
	}else{
		res.redirect('../');
	}
})

router.get('/delete',(req,res)=>{
	if(typeof req.user!='undefined'){
		if(req.session.user == keys.secyKey){
			var id = req.query.id;
			var query = 'DELETE FROM complaint_list where complaint_id = '+id+' and secy_id = '+req.session.id;
			db.query(query, function (err, result, fields) {
				if(err){
						console.log(err);
						res.send({success:false,message:'database error',err:err});				
				}else{
				    console.log(result);
				    res.redirect('/secy/home');
				}
			});
		}else{
			res.redirect('../auth/logout');
		}
	}else{
		res.redirect('../');
	}
})

router.get('/forward',(req,res)=>{
	if(typeof req.user!='undefined'){
		if(req.session.user == keys.secyKey){
			var id = req.query.id;
			var query = 'UPDATE complaint_list SET admin_id='+req.query.did+' WHERE complaint_id='+req.query.id;
			db.query(query, function (err, result, fields) {
				if(err){
							console.log(err);
							res.send({success:false,message:'database error',err:err});				
				}else{
				    console.log(result);
				    res.redirect('/secy/home');
				}
			});
		}else{
			res.redirect('../auth/logout');
		}
	}else{
		res.redirect('../');
	}
})

module.exports = router;
