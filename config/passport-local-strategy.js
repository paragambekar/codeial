const { ListCollectionsCursor } = require('mongoose/node_modules/mongodb');
const passport = require('passport');

const LocalStrategy = require('passpport-local').Strategy;


// authentication using passport
// tell which strategy is to used and on what field here its email 
passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email, password, done){
    // find a user and establish the identity
    // first email as key is what we have defined in our schema and second one is the one from the current function 
    User.findOne({email: email}, function(err, user)  {
        if (err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        if (!user || user.password != password){
            console.log('Invalid Username/Password');
            // done function first argument is for error and second is authentication is done or not
            return done(null, false);
        }

        // if user is found we return the user  
        return done(null, user);
    });
}


));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});



module.exports = passport;

 