const mongoose = require('mongoose');
const airPlane = mongoose.model('airPlane');
/*
var onSuccess = function(err, data, res){
    if(err) res.send(err);
    res.json(data);
};
*/
exports.listAllLink = function(req, res, next){
    airPlane.find({},function(err, data){
        if(err) res.send(err);
        res.json(data);
    });
};

exports.getOne = function(req, res, next){
    airPlane.findOne({_id: req.params.id}).then(function(err, data){
        if(err) res.send(err);
        res.json(data);
    });
};

exports.createLink = function(req, res, next){
    airPlane.create(req.body).then(function(err, data){
        if(err) res.send(err);
        res.json(data);
    }).catch(next);
};

exports.updateLink = function(req, res, next){
    var data = {
        title: req.body.title,
        shortLink: req.body.shortLink,
        destination: req.body.destination,
        redirect: req.body.redirect
    };

    airPlane.findByIdAndUpdate({_id: req.params.id}, data).then(function(){
        airPlane.findOne({_id: req.params.id}).then(function(err, data){
            if(err) res.send(err);
            res.json(data);
        });
    });
};

exports.deleteLink = function(req, res, next){
    airPlane.findByIdAndRemove({_id: req.params.id}).then(function(err, data){
        if(err) res.send(err);
        res.json(data);
    }).catch(next);
};
