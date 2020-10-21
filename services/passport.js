const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Admin = mongoose.model('admins');
const Secy = mongoose.model('secies');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId:profile.id})
    .then((existingUser)=>{
        if(!existingUser){
            new User({googleId:profile.id}).save()
            .then((user)=>{
                done(null,user);
            })
        }else{
            done(null,existingUser);
        }
    })
    
  }
));
