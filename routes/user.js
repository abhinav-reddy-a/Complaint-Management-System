// can be used for google authentication later in implementation



const express = require('express');
const { token } = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
var passport = require('passport')
var router = express.Router();
const db = require('../db');
router.use(bodyParser.json()); 

router.get('/auth/google',passport.authenticate('google',{
    scope:[
        'email',
        'profile'
    ]
}),(req,res)=>{
    if(req.user){
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json({success:true,token:token,status:'You are successfully logged in!'})
    }
})

module.exports = router;