var User = require("../models/User");
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
var secret = require('../config').jwtSecret;

var controller = {};

controller.register = function(req, res, next){
    //Create a User
    User.create(
        {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        isAdmin: false
    },
    function(err, user){
        if(err){console.log(err)
        next(err)}
        else{
            res.user = user;
            next();
        }
    });
};

controller.allUsers = function(req, res, next){
    User.find({}, function(err, users){
        if(err) next(err);
        else{
            res.users = users;
            next();
        }
    });
}

controller.nameFromId = function(req, res, next){
    User.findById(req.body.id, (err, user)=>{
        if(err) next(err);
        else{
            res.name = user.name;
        }
        
    });
};

//Gera um token para a API, grava-o no documento mongo correspondente, e poem-lo na resposta para ser utilizado por middleware
controller.generateApiToken = function(req, res, next){
    if(req.body.expiresIn < 1 || req.body.expiresIn > 50) next(500);
    else{
        jwt.sign({id: req.user.id}, secret, {expiresIn: req.body.expiresIn+'w'}, function(err, token){
            if(err){next(err)};
            res.token = token;
            User.update({_id: req.user.id}, {$push: {tokens: res.token}}, function(err, raw){
                if(err)next(err);
                next();
            });
        });
    }
}

//previne um user de fazer login
controller.disableUser = function(req, res, next){
    if(!req.user.isAdmin && req.user._id != req.params.id){
        next(500);
    }
    else 
    {User.update({_id: req.params.id}, {isActive: false}, function(err, user){
        if(err)next(err)
        else next();
    })}
};

//torna um user num admin
controller.makeAdmin = function(req, res, next){
    User.update({_id: req.params.id}, {isAdmin: true}, function(err, user){
        if(err)next(err)
        else next();
    });
};
controller.query
module.exports = controller;