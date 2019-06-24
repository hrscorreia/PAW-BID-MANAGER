const express = require('express');
const router  = express.Router();
const passport = require("passport");
const createError = require('http-errors');

/* POST login. */
function notLogged(req, res, next){
    if(!req.isAuthenticated()) next();
    else{
      next(403);
    }
}

var logged = function(req, res, next){
    if(req.isAuthenticated()){
      next();
    }
    else{
      next(createError(505));
    }
  };

router.post('/login', notLogged, passport.authenticate('local', {failureRedirect: "/login", successRedirect: "/me"})
);

router.get("/logout", logged, function(req, res, next){
    req.logOut();
    res.redirect("/");
});


module.exports = router;