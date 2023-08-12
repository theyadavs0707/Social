const User = require('../models/users');

module.exports.profile = function(req,res){
    return res.render('users_profile',{title:"Users Profile"});
}

//Render the Sign Up Page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title : "Codeial | Sign Up"
    });
}


//Render the Sign In Page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title : "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    try{
        let user = await User.findOne({email : req.body.email});
        if(!user){
           await User.create(req.body);
           return res.redirect('/users/sign-in');
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
    }
}

//sign in and create session
module.exports.createSession =  function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err);}
        res.redirect('/');
    });
}