const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession =  async function(request,response){

    // Whenver a username & pass is received to find that user and generate json web token for that user
   
    try{
        let user = await  User.findOne({email : request.body.email});

        if(!user || user.password != request.body.password){
            return response.status(422).json({
                message : "Invalid username or password",
            });
        }

        if(user){
            return response.status(200).json({
                message : "Sign in successfull, Here is your token please keep it safe",
                data : jwt.sign(user.toJSON(),'codeial', {expiresIn : 100000}),
            });
        }

    }catch(error){
        return response.status(500).json({
            message : "Internal Server Error",
        });
    }
    

 }
