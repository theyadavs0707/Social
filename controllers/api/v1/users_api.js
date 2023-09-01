const User = require('../../../models/users');
const jwt = require('jsonwebtoken');


//whenever username & password is received we need to find that user and generate jsonWebToken corresponding to that user
module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({ email: req.body.email });
        if( !user || user.password!= req.body.password ){
            return res.json(422, {
                message: "Invalid Username or password"
            });
        }
        return res.json(200, {
            message: "Sign in successfull, here is your token please keep it safe!",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', /*{ expiresIn: '1000000' }*/) //codeial key is used to encrypt because the same key is used to decrypt\
            }
        });
    }catch(err){
        console.log('******',err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}