const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use new strategy to login 
passport.use(new googleStrategy({

    clientID : '889648298853-erqg6ntgkbe4cqraumrn1e0i3ffm9rkk.apps.googleusercontent.com',
    clientSecret : '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',
    callbackURL : "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done){
        // find user 
        User.findOne({ email : profile.emails[0].value }).exec(function(error,user){
            if(error){
                console.log("Error in google authentication",error);
                return;
            }

            console.log(profile);

            if(user){
                return done(null, user);
            }else{
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex'),
                },function(error, user){
                    if(error){
                        console.log("Error in creating user",error);
                        return;
                    }
                    return done(null,user);
                });
            }

        });

    }


));

module.exports = passport;