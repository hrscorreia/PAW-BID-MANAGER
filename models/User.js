var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
    {
        name: String,
        email: {type:String, unique:true},
        password: {type:String},
        isAdmin: {type:Boolean, required: true, default: false},
        isActive: {type:Boolean, required: true, default: true},
        tokens: [String]
    }
);

module.exports = mongoose.model("User", UserSchema);


