const express= require('express');
// using express.Router
const router= express.Router();

const usersController= require('../controllers/users_controller');
router.get('/profile', usersController.profile);
router.get('/sign-in', usersController.signInUser);
router.get('/sign-up', usersController.signUpUser);
router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);


module.exports= router;