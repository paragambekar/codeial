const { authenticate } = require('passport/lib');
const User = require('../models/users');

module.exports.profile = function(request,response){

    response.end('User Profile');

}

module.exports.signUp = function(request,response){

   return response.render('users_sign_up',{
       title : 'Codieal | Sign Up',
   });

}

module.exports.signIn = function(request,response){

    return response.render('users_sign_in',{
        title : 'Codieal | Sign In',
    });
 
 }


//  Get the sign up data 
 module.exports.create = function(request,response){

    // here the password and confirm_password are the values of name attribute of our form 
    if(request.body.password != request.body.confirm_password){
        return response.redirect('back');
    }

    User.findOne({ email: request.body.email}, function(error,user){

        if(error){console.log('Error in finding User'); return}

        if(!user){
            User.create(request.body, function(error,user){
                if(error){console.log('Error in creating User while sign up'); return}

                return response.redirect('/users/sign-in');
            })
        }else{
            return response.redirect('back');
        }

    });

 }

 module.exports.createSession = function(request,response){
    
 }