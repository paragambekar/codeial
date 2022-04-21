
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(request,response){


    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            }
        });


    return response.status(200).json({
        message : "Lists of posts",
        posts : posts,
    });

}

module.exports.destroy =  async function(request,response){

    try{
        let post = await  Post.findById(request.params.id);

        // .id means converting ObjectId to string 
        if(post.user == request.user.id){
            post.remove();

            await Comment.deleteMany({post : request.params.id});

            // if(request.xhr){
            //     return response.status(200).json({
            //         data : {
            //             post_id : request.params.id,
            //         },
            //         message : "Post deleted successfully"
            //     })
            // }

            // request.flash('success', "Post and associated comments deleted");
            return response.status(200).json({
                message : "Post and associated comments deleted",
            });
        }else{
            return response.status(401).json({
                message : "You cannot delete this post",
            });
        }
    }catch(error){
        console.log("**** Error");
        return response.status(500).json({
            message : "Internal Server Error",
        });
    }

    

}

