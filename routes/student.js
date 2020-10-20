const express = require('express');
var router = express.Router();
const db = require('../db'); 


router.get('/',(req,res)=>{
	res.render('student_home.ejs');
})
 
module.exports = router;