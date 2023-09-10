const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    //host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'yadavshubham1997@outlook.com',
        pass: 'Shubham@1997'
    },
    secureconnection: false,
    //tls: { ciphers: 'sslv3' }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template',err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}