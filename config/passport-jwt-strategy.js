const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    try{
        let user = User.findById(jwtPayLoad._id);
        console.log('*****user id',user);
        console.log('*****jwt Pay load',jwtPayLoad._id);
        if(user){
            console.log('user found*****user id',user);
            return done(null,user);
        }
        else{
            console.log('user not found*****user id',user);
            return done(null,false); //false means user was not found
        }
    }catch(err){
        console.log('Error in finding user from jwt',err);
        return;
    }
}));

module.exports = passport;