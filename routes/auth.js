const passport = require('passport');
var router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Admin = mongoose.model('admins');
const Secy = mongoose.model('secies');

router.get('/google',
	passport.authenticate('google',{
	scope:['profile','email']
}));

router.get('/google/callback',
	passport.authenticate('google'), 
	(req,res)=>{
		//res.send(req.user);
		console.log(req.user.id);
		User.findOne({googleId:req.user.googleId})
	    .then((existingUser)=>{
	        if(existingUser){
	        	console.log('user found');
	        	res.redirect('/student/home');
	        }else{
	        	console.log(User);
	        	console.log('not found');
	        	checkSecy(req,res);
	        }
	    })
	    //console.log('hello');
}); 

async function checksecy(req,res){
	Secy.findOne({googleId:req.user.googleId})
	    .then((existingUser)=>{
	        if(existingUser){
	        	console.log('secy found');
	        	res.redirect('/secy/home');
	        }else{
	        	console.log('secy not found');
	        	checkAdmin(req,res);
	        }
	    })
}


async function checkAdmin(req,res){
	Admin.findOne({googleId:req.user.googleId})
	    .then((existingUser)=>{
	        if(existingUser){
	        	console.log('admin found');
	        	res.redirect('/admin/home');
	        }else{
	        	console.log('admin not found');
	        	res.redirect('./');
	        }
	    })
}

router.get('/login',(req,res)=>{
res.render('login.ejs');
})

router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('../');
})

module.exports = router;

// User.findOne({googleId:profile.id})
//     .then((existingUser)=>{
//         if(!existingUser){
//             new User({googleId:profile.id}).save()
//             .then((user)=>{
//                 done(null,user);
//             })
//         }else{
//             done(null,existingUser);
//         }
//     })