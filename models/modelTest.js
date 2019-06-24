var Item = require("./Item");
var mongoose = require("mongoose");
var Bid = require('./Bid');
var User = require('./User')
mongoose.connect('mongodb://localhost:27017/auction-paw', {useNewUrlParser: true});

//Testes
/*
Item.findOne({name: '123'}, function(err, item){
    //item.deActivate(function(err, res){
    //    if(err)console.log(err);
    //
    //});
    console.log(item.isActive);

});

Item.findById('5cfdbe3ad5d0742fa05913cf', function(err, item){
    console.log(item.isActive);
});

*/
/*
var user = new User(
    {
        name: 'Dude',
        email: 'someDude@email.com',
        password: '123',
        isAdmin: false,
        isActive: true
    }
);
user.save()

Bid.create(
    {
        bidder: user._id,
        value: 50
    }
)



*/

Item.findOne({}).populate('bids').exec(function(err, doc){
    if(err) console.log(err);
    console.log(doc)
})