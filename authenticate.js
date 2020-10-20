var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt =require('passport-jwt').ExtractJwt;
var GoogleStrategy = require('passport-google-oauth').Strategy;
var db = require('./db');

//added authentication but still not used
exports.googlePassport = passport.use(new GoogleStrategy({
    clientID: "something", // will be provided by google by registering
    clientSecret: "something",//prvided by google
    callbackURL: "http://localhost:3000/auth/google/callback",

},
function(token,refreshToken,profile,done){
    // if we specify organization during getting clientid and secret
    // no need of checking the domain below
    if(profile._json.domain === 'iiti.ac.in'){ 
        done(null,profile)
    }
    else{
        done(new Error('Invalid host domain')) // invalid domain
    }
}
))