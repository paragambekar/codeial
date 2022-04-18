const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(request, response){
    Post.findById(req.body.post, function(error, post){

        if(error){
            console.log("Error in finding post");
        }

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(error, comment){
                // handle error

                post.comments.push(comment);
                post.save();

                response.redirect('/');
            });
        }

    });
}

// const Comment = require('../models/comment');
// const Post = require('../models/post');

// module.exports.create = function(request,response){
//     // Here we need to comment over a post
//     // why? request.body.post 
//     // Because we gave the name attribute of our comment form post 
//     console.log("Inside controller");
//     Post.findById(request.body.post, function(error,post){
//         // console.log(typeof(Post.findById(request.body.post)));
//         console.log(request.body.post);
//         if(error){
//             console.log("Error in finding post");
//         }

//         // if post is found then only we can add comment
//         if(post){
//             console.log("Post found");
//             Comment.create({
//                 content : request.body.content,
//                 post : request.body.post,
//                 user : '12',

//             }, function(error, comment){

//                 if(error){
//                     console.log("Error in pushing comment");
//                 }
//                 console.log(comment.user);
//                 post.comments.push(comment);
//                 post.save();

//                 response.redirect('/'); 
//             })

//         }

//     }); 

//     // Post.findById(request.body.post, function(error, post){

//     //     if(error){
//     //         console.log("Error in finding userss");
//     //     }
//     //     if(post){
//     //         console.log("user found");
//     //     }
//     // });
// }

