var express = require('express');
var router = express.Router();
var db = require('../db');

function checkError(err,res){
	if(err){
		console.log(err);
		res.send({success:false,message:'database error',err:err});
	}
}

router.get('/',(req,res)=>{
	//Select all customers and return the result object:
	var query = "SELECT complaint_id,complaint_subject,date,dept_name FROM complaint_list \
				INNER JOIN department_list ON department_list.dept_id = complaint_list.dept_id order by date desc;"
	db.query(query, function (err, result, fields) {
		checkError(err,res)
		console.log(result);
	    res.render('index.ejs',{result:result});
	});
})

router.get('/complaint',(req,res)=>{
	var id = req.query.id;
	var query = 'SELECT complaint_list.complaint_id,complaint_subject,complaint_text,complaint_list.date,dept_name,reply_text,reply_list.date,from_to \
				 FROM ((complaint_list INNER JOIN department_list ON complaint_list.dept_id = department_list.dept_id and complaint_id = '+id+') \
				 LEFT JOIN reply_list ON reply_list.complaint_id = '+id+');' ;
	db.query(query, function (err, result, fields) {
		checkError(err,res)
		console.log(result);
	    res.render('complaint.ejs',{result:result,role:'general'});
	});
})

module.exports = router;