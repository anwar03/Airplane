let express = require('express');
let passport = require('passport');
let csrf = require('csurf');
let flash = require('connect-flash');
let jwt = require('jwt-simple');
let User = require('../models/user');
let config = require('../config/database');

//let csrfProtection = csrf();
//router.use(csrfProtection);

exports.getUsers = function(req, res, next){
    User.find({}, function(err, users){
        if( err )
            return res.json(err);
        return res.json(users);
    });
};

exports.profile = function(req, res, next){
    User.findById({_id: req.params.id}, function(err, user){
        if( err )
            return res.json(err);
        return res.json(user);
    });
};

exports.updateProfile = function(req, res, next){
    let updateUser = new User();
    let data = {
        email: req.body.email,
        username: req.body.username,
        password: updateUser.encryptPassword(req.body.password)
    }

    //console.log('update user: ', data);
    User.findByIdAndUpdate({_id: req.params.id}, data).then(function(){
            User.findById({_id: req.params.id }).then(function(err, user){
                if( err )
                    return res.json(err);
                return res.json(user);
        });
    });
};

exports.deleteUser = function(req, res, next){
    User.findByIdAndRemove({_id: req.params.id}).then(function(err, user){
        if( err )
            return res.json(err);
        return res.json(user);
    });
};


exports.createUser =  function(req, res, next){
    if(!req.body.email || !req.body.password)
        res.json({success: false, msg: "please enter email and password."})
    else{
        let newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        //console.log('new user', newUser);
        newUser.save(function(err, user){
            console.log('save user..');
            if(err)
                return res.json({success: false, msg: err })
            res.json({success: true, msg: 'Successful created new user.'});

        });
    }
};

exports.loginUser = function(req, res, next){
    User.findOne({email: req.body.email}, function(err, user){
        if (err) throw err;
        if (!user){
            res.send({success: false, msg: "User not found."});
        }else{
            user.validPassword(req.body.password, function(err, isMatch){
                if(isMatch && !err){
                    let token = jwt.encode(user, config.secret);
                    res.json({success: true, token: 'JWT '+token, User: user });
                }else{
                    res.send({success: false, msg: 'Wrong password.'});
                }
            });
        }
    });
};



exports.userInfo = function(req, res, next){
    //console.log('req headers', req.headers);
    let token = getToken(req.headers);
    //console.log('token', token);

    if(token){
        let decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        },function(err, user){
            if (err) throw err;
            if(!user){
                return res.status(403).send({success: false, msg: 'authentication failed, user not found.'});
            }else{
                return res.json({success: true, msg: 'Welcome in the member area ' + user.email, user: user });
            }
        });
    }else{
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
};

let getToken =  function(headers){
    //console.log('get headers', headers);
    if(headers.authorization){
        let parted = headers.authorization.split(' ');
        //console.log('get Token ',parted);
        if(parted.length == 2){
            return parted[1];
        }else{
            return null;
        }
    }else{
        //console.log('call else token');
        return null;
    }
};
