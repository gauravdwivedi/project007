const express= require('express');
const cookieParser= require('cookie-parser');
const app= express();
const port=8000;

// require the express layout
const expressLayout= require('express-ejs-layouts');

const mongoose = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());
// middleware to access static files
app.use(express.static('./assets'));

//extract style and scripts from subpages into the layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// tell app to use the layout
app.use(expressLayout);

// use express router
app.use('/',require('./routes'));

// for setting up the viewEngine ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        // console.log("error in running the express server:",err);
        // instead of above statement i will use interpolation using `` with $
        console.log(`Error in running the express server: ${err}`);
        return;
    }
    console.log(`Express server is running on the port: ${port}`);
});