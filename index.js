const express = require('express');
const port = 8000;
const cookieParser = require('cookie-parser');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db =  require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);



app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());


//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assests'));


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name : 'codeial',
    secret : 'blahsomething',
    saveUninitialized : false,
    resave: false,
    cookie : {
        maxAge : (1000*60*100)
    },
    store :new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',require('./routes/index'));



app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`)
});