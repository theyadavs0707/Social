const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID: "1086731898872-p656mre66a5qpm88sbc3cidvvgf4a1si.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done){
        try{
            //find a user
            let user =await User.findOne({ email: profile.emails[0].value });
            console.log(accessToken, refreshToken);
            console.log(profile);
            if(user){
                // if found set this user as req.user
                return done(null,user);
            }
            else{
                //if not found , create the user and set it as req.user
                let newUser =await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
                return done(null,newUser);
            }
        }catch(err){
            console.log('***Error in passport google startegy',err);
        }    
    }
));

module.exports = passport;