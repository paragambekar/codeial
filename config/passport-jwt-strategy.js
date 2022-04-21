const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest :ExtractJWT.fromAuthHeaderAsBearerToken(),

    // encrpytion and decrpytion string
    secretOrKey : 'codeial',
}

passport.use(new JWTStrategy(opts, function(jwtPayload,done){

    User.findById(jwtPayload._id, function(error, user){
        if(error){
            console.log("Not able to find user through jwt");
            return;
        }

        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });

}));


module.exports = passport;