var mongoose = require("mongoose");
var moment = require('moment');
var Bid = require('./Bid');



var ItemSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        images: [String],
        category: String,
        bids: [{type: mongoose.Schema.Types.ObjectId,
            ref: "Bid"}],
        createdOn: {type:Date, required:true, default: Date.now},
        
        minimum: {type: mongoose.Schema.Types.Number, min: 100, required:true, validate : {
                    validator : Number.isInteger,
                    message   : '{VALUE} is not an integer value'
                    }, 
                    default: 100},

        expires: {type:Date, default: moment, required: true},
        cancelled: {type: Boolean, default: false, required: true},

        lat: String,
        long: String
        }   ,
        {
            toObject: { virtuals: true },
            toJSON: { virtuals: true }
        }
);
ItemSchema.virtual("currentPrice").get(function(){
    if(!this.isStrictlyExpired){
        return null;
    }
    if(this.bids.length==0) return this.minimum
    else{
        Bid.findById(this.bids[this.bids.length - 1], function(err, bid){
            return bid;
        });
    };
})


ItemSchema.virtual("isActive").get(function(){
    //Verifica se esta ativo verificando se ainda esta dentro do prazo de expiracao

    if(this.cancelled) return false;
    if(moment(this.expires).isBefore(moment())){
        return false;
    }
    return true;
});

ItemSchema.virtual("isStrictlyExpired").get(function(){
    //Se estiver expirado, mas nao foi cancelado (util para descobrir quem ganhou o leilao)
    if(this.cancelled) return false;
    if(moment(this.expires).isBefore(moment())){
        return true;
    }
    return false;
})

module.exports = mongoose.model("Item", ItemSchema);
