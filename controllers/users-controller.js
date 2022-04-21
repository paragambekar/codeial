const { authenticate } = require('passport/lib');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(request,response){

    User.findById(request.params.id, function(error,user){
        return response.render('user_profile',{
            title : 'User Profile',
            profile_user : user,
        });

    });
}


module.exports.update =  async  function(request,response){

    if(request.user.id == request.params.id){

        try{

            let user = await User.findByIdAndUpdate(request.params.id);
            User.uploadedAvatar(request,response, function(error){
                if(error){
                    console.log('*******Multer Error',error);
                    return;
                }

                user.name = request.body.name;
                user.email = request.body.email;

                if(request.file){

                    if(user.avatar){ 
                        // user.avatar stores path from uploads// 
                        fs.unlinkSync(path.join(__dirname,  '..'  ,user.avatar));
                    }

                    // saving the path of the uploaded into avatar field  of user
                    user.avatar = User.avatarPath +'/'+ request.file.filename;
                }
                user.save();
                return response.redirect('back');
            });

        }catch(error){
            request.flash('error', error);
            return response.redirect('back');
        }
    
    }else{
        request.flash('error','Unauthorized');
        return response.status(401).send('Unauthorized');
    }
}

module.exports.signUp = function(request,response){

    if(request.isAuthenticated()){
        return response.redirect('/users/profile');
    }

   return response.render('users_sign_up',{
       title : 'Codieal | Sign Up',
   });

}

module.exports.signIn = function(request,response){

    if(request.isAuthenticated()){
       return  response.redirect('/users/profile');
    }

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

    request.flash('success', 'Logged in Successfully');

     return response.redirect('/');
 }

 module.exports.destroySession = function(request, response){
    request.logout();
    request.flash('success', 'You have Logged Out');
    return response.redirect('/');
}