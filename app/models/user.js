var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is require field'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'username is require field'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Password is require field']
    }
});

userSchema.pre('save', function(next){
    let user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if (err)
                return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if (err)
                    return next(err);
                user.password = hash;
                next();
            });
        });
    } else{
        return next();
    }
});


userSchema.methods.encryptPassword = function( password ){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
/*
userSchema.methods.encryptPassword = function(password, next){
    console.log('encryptPassword start');
    bcrypt.genSaltSync(10, function(err, salt){
        console.log('genSalt start', salt);
        if(err)
            return next(err);
        bcrypt.hashSync(password, salt, function(err, hash){
            console.log('Hash start', hash);
            if(err)
                return next(err);
            return hash;
        });
    });
};
*/
userSchema.methods.validPassword = function(password, cb){
    return bcrypt.compare(password, this.password, function(err, isMatch){
        if (err) return cb(err);
        return cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
