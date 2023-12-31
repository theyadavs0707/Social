const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {
    const posts = await Post.find({}).sort('-createdAt').populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
    return res.json(200, {
        message: "List of Posts",
        posts: posts
    });
}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);
        console.log(req.user.id);
        // .id means converting the object id into string

        if(post.user == req.user.id){ // here we are checking if the user is authorized to delete the post
            post.deleteOne();
            await Comment.deleteMany({ post:req.params.id });
            return res.json(200, {
                message: "Post and associated comments deleted successfully"
            });
        }
        else{
            return res.json(401, {
                message: "You cannot delete this post!"
            });
        }
    }
    catch (err) {
        //req.flash('error',err);
        console.log('******', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }

}