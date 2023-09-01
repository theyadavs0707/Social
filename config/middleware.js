const User = require('../models/post');

const jwt = require('jsonwebtoken');
module.exports.setFlash = function (req, res, next) {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next();
}


module.exports.verify = async function (req, res, next) {
    const token = req.header('Authorization').toString().split(" ")[1];
    console.log(token);

    const verified = jwt.verify(token, 'codeial');
    //console.log(verified._id)
    if (verified) {
        req.user = verified
    } else {
        return res.status(401).send(error);
    }
    next()
}