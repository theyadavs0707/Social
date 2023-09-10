const nodemailer = require('../config/nodemailer');

//this is another way of exporting a method 
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment:comment}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'yadavshubham1997@outlook.com',
        to: comment.user.email, //sending it to user who has commented
        subject: "New comment",
        html: htmlString,
    },(err,info) =>{
        if(err){console.log('error in sending mail',err); return; }
        //console.log('Message Send',info);
        return;
    });
}