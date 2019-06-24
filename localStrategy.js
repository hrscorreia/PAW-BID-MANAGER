const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/User");
const bcrypt = require("bcrypt");

module.exports = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email, password, cb) {

        User.findOne({email: email}, function(err, user){
            console.log("Inside local strategy callback \n"+ email + "\t" +  password);
            if(err) {return cb(err)};
            if(!user){
                return cb(null, false, {message: "incorrect email"});
            };
            if(!bcrypt.compareSync(password, user.password)){
                console.log("Wrong password");
                //console.log(user.password);
                //console.log(bcrypt.hashSync(password, 8));
                return cb(null, false, {message: "incorrect Password"});
            }
            console.log("got here");

            return cb(null, user);
        });
    }
);
