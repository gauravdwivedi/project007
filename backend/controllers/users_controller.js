const User= require('../models/user');


module.exports.profile= function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id , function(err, user){
            // if(err){console.log("error in finding user"); return;}
            if(user){
                return res.render('user_profile', {
                    title: "User profile",
                    user: user
                })
            }else{
                return res.redirect('/users/sign-in');
                  }
            });     
        }else{
        return res.redirect('/users/sign-in');
                }
            }
       

module.exports.createUser= function(req,res){
    return res.end('<h1> Create a new User </h1>');
}
// render the sign in page
module.exports.signInUser= function(req,res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In "
    });
}
// render the sign up page
module.exports.signUpUser= function(req,res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up "
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
    // steps tp authenticate
    // find the user
    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log("error in finding user and signing in"); return;}
        // handle user found
        if(user){
         // handle password which doesn't match
         if(user.password != req.body.password){
             return res.redirect('back');
         }

         // handle session creation
         res.cookie('user_id', user.id);
         return res.redirect('/users/profile');
        }else{
        // handle user not found
           return res.redirect('back');
        }
    });
}

