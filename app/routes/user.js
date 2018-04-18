var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var jwt = require('jwt-simple');
var session = require('express-session');


var config = require('../config/database');
var userControllers = require('../controllers/userControllers');
var User = require('../models/user');
//require('../config/passport')(passport);

var router = express.Router();

router.use(function(req, res, next){
    next();
});


router.route('/user/me')
    .get(passport.authenticate('login', {session: false}), userControllers.userInfo);

router.route('/user')
    .get(isLoggedIn, userControllers.getUsers);

router.route('/user/login')
    .post(userControllers.loginUser);

router.route('/user/:id')
    .get(isLoggedIn, userControllers.profile)
    .put(userControllers.updateProfile)
    .delete(userControllers.deleteUser);

router.route('/user/register')
    .post(userControllers.createUser);


module.exports = router;



function isLoggedIn(req, res, next){
    if ( req.isAuthenticated()){
        return next();
    }
    res.send("please login.")
}

function notLoggedIn(req, res, next){
    if ( !req.isAuthenticated() ){
        return next();
    }
    res.redirect('/');
}
