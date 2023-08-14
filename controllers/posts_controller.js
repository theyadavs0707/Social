const Post = require('../models/post');


module.exports.create =async function(req,res){
    await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    return res.redirect('back');
}