let passport = require('passport');
var jwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
let User = require('../models/user');
let config = require('../config/database');

 module.exports = function(passport){
     let opts = {};
     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
     opts.secretOrKey = config.secret;
     passport.use('login', new jwtStrategy(opts, function(jwt_payload, done) {
         console.log('passport config..');
         User.findOne({id: jwt_payload.id }, function(err, user){
             if( err )
                return done(err, false);
             if( user )
                return done(null, user);
         });
     }));
 };
