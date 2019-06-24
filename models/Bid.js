var mongoose = require('mongoose');
var moment = require('moment');

var BidSchema = new mongoose.Schema(
    {
        bidder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        date: {type: Date, required: true, default: moment},
        value: {type: mongoose.Schema.Types.Number, required: true, min: 100 ,validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
          }}
    }
);

module.exports = mongoose.model('Bid', BidSchema);