const User= require('../models/user');


module.exports.profile= function(req,res){
    return res.render('user_profile', {
        title: "User profile"
    });
}
       

module.exports.createUser= function(req,res){
    return res.end('<h1> Create a new User </h1>');
}
// render the sign in page
module.exports.signInUser= function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Brand-influencer-App | Sign In "
    });
}
// render the sign up page
module.exports.signUpUser= function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_up', {
        title: "Brand-influencer-app | Sign Up "
    });
}

// get the SignUp data
module.exports.create= function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log("error in finding user and signing up"); return;}
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log("error in creating user while signing up"); return;}

                return res.redirect('/users/sign-in');
            });
        }else{
            res.redirect('back');
        }     
    })
}

// sign in and create a session for the user
module.exports.createSession= function(req,res){
    return res.redirect('/');
}

// sign out function
module.exports.destroySession= function(req,res){
    // before redirecting we need to log out
    req.logout();
    return res.redirect('/');
}