const { redirect } = require('express/lib/response');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(request, response){
    
    try{
        let post = await Post.findById(request.body.post);
        if (post){
            let comment = await Comment.create({
                content: request.body.content,
                post: request.body.post,
                user: request.user._id
            });
           
                // handle error 

            post.comments.push(comment);
            post.save();

            response.redirect('/');
        }
    }catch(error){
        console.log('Error in adding comment',error);
        return;
    }

        
}

module.exports.destroy = async function(request, response){

        try{
            let comment = await  Comment.findById(request.params.id);
            if (comment.user == request.user.id){

                let postId = comment.post;

                comment.remove();

                let post =  Post.findByIdAndUpdate(postId, { $pull: {comments: request.params.id}});
                    return response.redirect('back');
            }else{
                return response.redirect('back');
            }
        }catch(error){
            console.log('Error in destroying comments');
        }
     
        
} 

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

