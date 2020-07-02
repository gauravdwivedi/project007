const express= require('express');
const cookieParser= require('cookie-parser');
const app= express();
const port=8000;

// require the express layout
const expressLayout= require('express-ejs-layouts');
const mongoose = require('./config/mongoose');

// used for session cookie
const session= require('express-session');
const passport= require('passport');
const passportLocal= require('./config/passport-local-strategy');
const MongoStore= require('connect-mongo')(session);

app.use(express.urlencoded());

app.use(cookieParser());
// middleware to access static files
app.use(express.static('./assets'));

//extract style and scripts from subpages into the layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// tell app to use the layout
app.use(expressLayout);



// for setting up the viewEngine ejs
app.set('view engine', 'ejs');
app.set('views', './views');

//  mongo-store is used to store the session cookie in the db
// middleware which is used to takes in the session-cookie and encrypts it
app.use(session({
    name: 'brand-influencer-app',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store : new MongoStore(
        {
            mongooseConnection : mongoose,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// use express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        // console.log("error in running the express server:",err);
        // instead of above statement i will use interpolation using `` with $
        console.log(`Error in running the express server: ${err}`);
        return;
    }
    console.log(`Express server is running on the port: ${port}`);
});