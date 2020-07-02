const passport = require('passport');

const LocalStrategy= require('passport-local').Strategy;
const User= require('../models/user');


// we will require users
// authentication using passport
passport.use(new LocalStrategy({
    usernameField: "email"
    },
    function(email, password, done){
        // find a user and establish the identity
        // one email is property and one email is value
    User.findOne({email:email}, function(err, user) {
        if(err){
            console.log('Error in finding the user --> Passport'); 
            return done(err);
        }
        if(!user || user.password != password){
            console.log('Invalid UserName/password');
            return done(null,false);
        }
        return done(null,user);
    });
}
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null, user.id)
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding the user --> Passport'); 
            return done(err);
        }
        return done(null, user);
    });
});

// check if the user is authenticated
// using this func as a middleware
passport.checkAuthentication= function(req,res,next){
    // if the user is signed in pass on the request to the next function
    if(req.isAuthenticated()){
          return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

// set the user for the views (once we have checked user is signed in)
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        /*req.user contains the current signed in user from the session cookie and we are just
        sending it to the locals for views */ 
        res.locals.user = req.user;
    }
    next();
}

module.exports= passport;


