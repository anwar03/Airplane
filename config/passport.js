var passport = require('passport');
var User = require('../app/models/user');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, done);
    });
});


passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    //passReqToCallback: true
}, function(req, email, password, username, done){
    req.checkBody('email', 'Please enter currect email address').notEmpty().isEmail();
    req.checkBody('password', 'Password must be minimum 6 charactar').notEmpty().isLength({min: 6});
    var errors = req.validationErrors();
    if( errors ){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }

    User.findOne({'email': email}, function(err, user){
        if( err ) return done(err);
        if(user) return done(null, false, req.flash('error', 'Email is already in used'));
        let newUser = new User();
        newUser.email = email;
        newUser.username = username;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, user){
            if( err ) return done(err);
            return done(null, user);
        });
    });
}));


passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    //passReqToCallback: true
}, function(req, email, password, done){
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    let errors = req.validationErrors();
    if(errors){
        let messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }

    User.findOne({'email': email}, function(err, user){
        if(err)
            return done(err);
        if(!user)
            return done(null, false, req.flash('error', 'User not found'));
        if(!user.validPassword(password))
            return done(null, false, req.flash('error', 'Wrong password'));
    });

    return done(null, user);
}));
