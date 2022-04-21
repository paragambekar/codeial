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
            request.flash('success', "Comment Added");
            response.redirect('/');
        }
    }catch(error){
        request.flash('error', error);
        response.redirect('/');
    }

        
}

module.exports.destroy = async function(request, response){

        try{
            let comment = await  Comment.findById(request.params.id);
            if (comment.user == request.user.id){

                let postId = comment.post;

                comment.remove();

                let post =  Post.findByIdAndUpdate(postId, { $pull: {comments: request.params.id}});
                request.flash('success', "Comment Deleted Successfully");
                    return response.redirect('back');
            }else{
                request.flash('success', "You cant deleted this comment");
                return response.redirect('back');
            }
        }catch(error){
            request.flash('error', error);
            return response.redirect('back');
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

