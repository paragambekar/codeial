const { redirect } = require('express/lib/response');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(request, response){
    Post.findById(request.body.post, function(error, post){

        if(error){
            console.log("Error in finding post");
        }

        if (post){
            Comment.create({
                content: request.body.content,
                post: request.body.post,
                user: request.user._id
            }, function(error, comment){
                // handle error 

                post.comments.push(comment);
                post.save();

                response.redirect('/');
            });
        }

    });
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
} 

// module.exports.destroy = function(request,response){

//     Comment.findById(request.params.id, function(error,comment){

//         if(error){
//             console.log("didnt find comment");
//         }

//         if(comment.user == request.user.id){
              
//             let postId = comment.post;

//             comment.remove();

//             Post.findByIdAndUpdate(postId, {$pull: {comments : request.params.id}}, function(error,post){

//                 if(error){
//                     console.log("unable to update");
//                 }

//                 return redirect('back');

//             });
//         }else{
//             return redirect('back');
//         }

//     });

// }

// this only delete  the comment by does not update the post that this comment was removed 
// module.exports.destroy = function(request,response){

//     Post.findById(request.params.id, function(error,post){

//         if(post.user == request.user.id){

//             Comment.deleteOne({post : request.params.id}, function(error){

//                 return response.redirect('back');

//             })

//         }else{
//             return response.redirect('back');
//         }


//     });

// }

