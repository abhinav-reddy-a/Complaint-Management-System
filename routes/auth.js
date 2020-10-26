const passport = require('passport');
var router = require('express').Router();
var db = require('../db');
var keys = require('../config/keys');

router.get('/google',
	passport.authenticate('google',{
	scope:['profile','email']
}));

router.get('/google/callback',
	passport.authenticate('google'), 
	(req,res)=>{
		checkEmail(req.user.username,req,res);
}); 

router.get('/login',(req,res)=>{
res.render('login.ejs');
})

router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('../');
})

module.exports = router;


function checkError(err,res){
	if(err){
		console.log(err);
		res.send({success:false,message:'database error',err:err});
	}
}

//secy, find 'secy' in email id
//student, starts with cse+no...,ee,me,ce,mems,phd,msc,mscphd,mt,mtech,mtphd

function checkEmail(email,req,res){
	var query = 'select secy_id from secy_list where secy_email = "'+email+'";'
	db.query(query, function (err, result, fields) {
		checkError(err,res);
		console.log(query);
		console.log(result);
		if(typeof result[0] !='undefined'){
	    	req.session.user = keys.secyKey;
	    	req.session.id = result[0].secy_id;
	    	// console.log(req.session.user);
			res.redirect('/secy/home');
	    }else{
	    	query = 'select admin_id from admin_list where admin_email = "'+email+'";'
			db.query(query, function (err1, result1, fields1) {
				checkError(err1,res);
			    console.log(result1);
			    if(typeof result1[0] !='undefined'){
		    		req.session.user = keys.adminKey;
		    		req.session.id = result1[0].admin_id;
			    	res.redirect('/admin/home');
			    }
			    else{
			    	query = 'select roll_no from student_list where student_email = "'+email+'";'
					db.query(query, function (err2, result2, fields2) {
						checkError(err2,res);
					    console.log(result2);
					    if(typeof result2[0] !='undefined'){
			    			req.session.user = keys.studentKey;
			    			req.session.id = result2[0].roll_no;
						    res.redirect('/student/home');
						}else{
					    	res.redirect('/auth/logout');
					    }
					});
			    }
			});
	    }
	});
}