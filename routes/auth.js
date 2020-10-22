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

//secy, find 'secy' in email id
//student, starts with cse+no...,ee,me,ce,mems,phd,msc,mscphd,mt,mtech,mtphd

function checkEmail(email,req,res){
	var query = 'select secy_email from secy_list where secy_email in("'+email+'");'
	db.query(query, function (err, result, fields) {
	if (err) throw err;
		console.log(query);
	    console.log(result);
	    if(typeof result[0] !='undefined'){
	    	req.session.user = keys.secyKey;
	    	// console.log(req.session.user);
	    	res.redirect('/secy/home');
	    }else{
	    	query = 'select admin_email from admin_list where admin_name in("'+email+'");'
			db.query(query, function (err1, result1, fields1) {
			if (err1) throw err1;
			    console.log(result1);
			    if(typeof result1[0] !='undefined'){
	    			req.session.user = keys.adminKey;
			    	res.redirect('/admin/home');
			    }
			    else{
			    	req.session.user = keys.studentKey;
			    	res.redirect('/student/home');
			    }
			});
	    }
	});
}