const User = require('../models/users');

module.exports.profile =async function(req,res){
    let user = await User.findById(req.params.id);
    return res.render('users_profile',{
        title:"Users Profile",
        profile_user: user
    });
}

module.exports.update =async function(req,res){
    if(req.user.id == req.params.id){
        await User.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect('back');
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

//Render the Sign Up Page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){ //agar user logged  in hai aur signin wala url daal de toh -- usko profile page pe redirect kar do
        let userId=req.user.id;
        return res.redirect('/users/profile'+'/'+userId);
    }

    return res.render('user_sign_up',{
        title : "Codeial | Sign Up"
    });
}


//Render the Sign In Page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){ //agar user logged  in hai aur signin wala url daal de toh -- usko profile page pe redirect kar do
        let userId=req.user.id;
        return res.redirect('/users/profile'+'/'+userId);
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
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err);}
        req.flash('success','You have logged out!');
        res.redirect('/');
    });
}