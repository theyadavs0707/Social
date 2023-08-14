const Post = require('../models/post');

module.exports.home =async function(req,res){
    //console.log(req.cookies);
    //res.cookie('user_id',25);


    // const posts = await Post.find({});
    // return res.render('home',{
    //     title : 'Codeial | Home',
    //     posts: posts
    // });

    // populate the user of each post
    const posts = await Post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).exec();
    return res.render('home',{
        title : 'Codeial | Home',
        posts: posts
    });


}

// module.exports.profile = function(req,res){
//     return res.end('<h1> Welcome to profile page</h1>');