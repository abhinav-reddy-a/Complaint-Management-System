const express = require('express');
var router = express.Router();
const db = require('../services/db');
var keys = require('../config/keys');

function checkLogin(req,res){
	if(typeof req.user == 'undefined'){
		res.redirect('../');
	}
	if(req.session.user != keys.secyKey){
		res.redirect('../auth/logout');
	}
}

function checkError(err,res){
	if(err){
		console.log(err);
		res.send({success:false,message:'database error',err:err});
	}
}

function sendQuery(req,res,Query,fileName){
	db.query(Query, function (err, result, fields) {
		checkError(err,res);
		// console.log(result);
		res.render(fileName,{result:result,name:req.user.name,role:'secy'});	
	});
}

function findDate(fullDate){
	var date = fullDate.slice(8,10);
	var year = fullDate.slice(11,15);
	var monToNum = {
		'Jan':1,
		'Feb':2,
		'Mar':3,
		'Apr':4,
		'May':5,
		'Jun':6,
		'Jul':7,
		'Aug':8,
		'Sep':9,
		'Oct':10,
		'Nov':11,
		'Dec':12
	};
	var month = monToNum[fullDate.slice(4,7)];
	return {month, date, year};
}

var date_diff_indays = function(date1, date2) {
	dt1 = new Date(date1);
	dt2 = new Date(date2);
	var Difference_In_Time = dt2.getTime() - dt1.getTime(); 
  
	// To calculate the no. of days between two dates 
	return (Difference_In_Time / (1000 * 3600 * 24) + 1); 
}

router.get('/home',(req,res)=>{
	checkLogin(req,res);
	var secyId = req.session.id;
	var query = "SELECT complaint_id,complaint_subject,date,dept_name \
				FROM complaint_list INNER JOIN department_list \
				ON department_list.dept_id = complaint_list.dept_id and secy_id = "+secyId+" and resolved = 0 order by date desc;"
	sendQuery(req,res,query,'home.ejs');	
})

router.get('/history',(req,res)=>{
	checkLogin(req,res);
	var secyId = req.session.id;
	var query = "SELECT complaint_id,complaint_subject,date,dept_name \
				FROM complaint_list INNER JOIN department_list \
				ON department_list.dept_id = complaint_list.dept_id and secy_id = "+secyId+" and resolved = 1 order by date desc;"
	sendQuery(req,res,query,'history.ejs');
})

router.get('/complaint',(req,res)=>{
	checkLogin(req,res);
	var id = req.query.id;
	var query = 'SELECT complaint_list.complaint_id,complaint_list.student_id,complaint_list.dept_id,complaint_list.admin_id,complaint_subject,\
				complaint_list.stars,complaint_list.comments,complaint_text,complaint_list.date "cdate",\
				dept_name,reply_text,reply_list.date,from_to, resolved \
				FROM ((complaint_list INNER JOIN department_list ON complaint_list.dept_id = department_list.dept_id and complaint_id = '+id+'\
				and secy_id = '+req.session.id+') \
				LEFT JOIN reply_list ON reply_list.complaint_id = '+id+');' ;	
	sendQuery(req,res,query,'complaint.ejs');
})

router.post('/complaint',(req,res)=>{
	checkLogin(req,res);
	var query = '';
	var post = {};
	if(typeof req.body.comments == 'undefined'){
		query = 'INSERT INTO reply_list SET ?'
		post = {
			reply_text : req.body.reply_text,
			from_to : 'S',
			complaint_id : req.query.id,
			date : req.body.date
		}
	}else{
		query = 'UPDATE complaint_list SET ? WHERE complaint_id = '+req.query.id;
		post = {
			stars : req.body.stars,
			comments : req.body.comments
		}
	}
	// console.log(query);
	db.query(query,post,(err,result)=> {
		checkError(err,res);
		// console.log(result);
		var link = '/secy/complaint/?id='+req.query.id+'#bottom';
		res.redirect(link);
	})
})

router.get('/new_complaint',(req,res)=>{
	checkLogin(req,res);
	res.render('new_complaint.ejs',{id:req.session.id,role:'secy',name:req.user.name});	
})

router.post('/new_complaint',(req,res) => { //post method for submitting a complaint the body of request should contain respective methods
	checkLogin(req,res);
	// console.log(req.body);
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
	// console.log(query);
	db.query(query,post,(err,result)=> {
		checkError(err,res);
		// console.log(result);
		res.redirect('/secy/home');	
	})	
})

router.get('/delete',(req,res)=>{
	checkLogin(req,res);
	var id = req.query.id;
	var query = 'DELETE FROM complaint_list where complaint_id = '+id+' and secy_id = '+req.session.id;
	db.query(query, function (err, result, fields) {
		checkError(err,res);
		// console.log(result);
		res.redirect('/secy/home');
	});	
})

router.get('/resolve',(req,res)=>{
	checkLogin(req,res);
	var id = req.query.id;
	var d = new Date();
	var obj = findDate(req.query.date);
	// console.log(d.getHours());
	var date = d.getFullYear()+'-'+String(Number(d.getMonth())+1)+'-'+d.getDate();
	// console.log('date: ', date);
	var datei = obj.year+'-'+obj.month+'-'+obj.date;
	var dt1 = obj.month+'/'+obj.date+'/'+obj.year;
	var dt2 = String(Number(d.getMonth())+1)+'/'+d.getDate()+'/'+d.getFullYear();
	var days = date_diff_indays(dt1,dt2);
	var query = 'UPDATE complaint_list SET resolved = 1, resolved_date = "'+date+'", days = '+days+' \
				 WHERE complaint_id='+req.query.id+' and secy_id = '+req.session.id+' and date = "'+datei+'";';
	db.query(query, function (err, result, fields) {
		checkError(err,res);
		// console.log(result);
		res.redirect('/secy/home');
	});	
})

router.get('/forward',(req,res)=>{
	checkLogin(req,res);
	var id = req.query.id;
	var query = 'UPDATE complaint_list SET admin_id='+req.query.did+' WHERE complaint_id='+req.query.id+' and secy_id = '+req.session.id;
	db.query(query, function (err, result, fields) {
		checkError(err,res);
		// console.log(result);
		res.redirect('/secy/home');
	});	
})

router.get('/info',(req,res)=>{
	var query = 'SELECT secy_list.secy_id,secy_name,secy_email,department_list.dept_name,\
				 sum(complaint_list.stars)/count(complaint_list.stars) "stars", sum(complaint_list.days)/count(complaint_list.days) "days" \
				 FROM ((secy_list LEFT JOIN department_list on secy_list.dept_id = department_list.dept_id) \
				 LEFT JOIN complaint_list ON secy_list.secy_id = complaint_list.secy_id and complaint_list.resolved = 1 \
				 and complaint_list.student_id != "null")\
				 GROUP BY secy_list.secy_id;';
	db.query(query,function(err, result, fields){
		checkError(err,res);
		// console.log(result);
		res.render('info.ejs',{result: result});
	})
})

module.exports = router;