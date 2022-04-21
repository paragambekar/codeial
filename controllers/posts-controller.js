const { ObjectId } = require('mongodb');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create =  async function(request,response){

    try{
        let post = await Post.create({
            content : request.body.content,
            user : request.user._id,
        });

        if(request.xhr){
            return response.status(200).json({
                data : {
                    post : post,
                },
                message : "Post Created",
            })
        }

        request.flash('success', "Post Created");
        return response.redirect('back');

    }catch(error){
        request.flash('error', error);
        return response.redirect('back');
    }

    
    

}

module.exports.destroy =  async function(request,response){

    try{
        let post = await  Post.findById(request.params.id);

        // .id means converting ObjectId to string 
        if(post.user == request.user.id){
            post.remove();

            await Comment.deleteMany({post : request.params.id});

            if(request.xhr){
                return response.status(200).json({
                    data : {
                        post_id : request.params.id,
                    },
                    message : "Post deleted successfully"
                })
            }

            request.flash('success', "Post and associated comments deleted");
            return response.redirect('back');
        }else{
            request.flash('error', "You cannot delete this post");
            return response.redirect('back');
        }
    }catch(error){
        request.flash('error', error);
        return response.redirect('back');
    }

    

}

