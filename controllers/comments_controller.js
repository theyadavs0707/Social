const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function(req,res){
    const post = await Post.findById(req.body.post); // first check if post exists or not
    if(post){
        const comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });
        //adding comment to the post
        post.comments.push(comment);
        post.save(); // whenever updating object need to call save() to save to database
        res.redirect('/'); //redirect to home page
    }

}

module.exports.destroy = async function(req,res){
    const comment = await Comment.findById( req.params.id) ;
    if(comment.user == req.user.id ){
        let postId = comment.post ;
        comment.deleteOne();
        await Post.findByIdAndUpdate(postId , {$pull: {comments: req.params.id }});
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }

}