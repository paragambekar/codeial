
const Post = require('../models/post');

module.exports.home = function(request, response){
    // 
    // populate the user of each post
    // Post.find({}.populate('user').exec(function(error,posts){

    //     return response.render('home',{
    //         title : 'Codeial | Home',
    //         posts : posts,
    //     })

    // }));

    Post.find({}).populate('user').exec(function(error,posts){

        return response.render('home',{
            title : 'Codeial | Home',
            posts : posts,
        })

    })

}