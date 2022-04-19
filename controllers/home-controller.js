
const { MongoUnexpectedServerResponseError } = require('mongodb');
const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function(request, response){

    try{

        let posts = await Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    });


    let users = await User.find({});
    

    return response.render('home', {
        title: "Codeial | Home",
        posts:  posts,
        all_users : users,
    });

    }catch(error){
        console.log('Error',error);
        return;
    }

    
        
}