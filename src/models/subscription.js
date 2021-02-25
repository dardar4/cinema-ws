const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShowsSubSchema = new Schema ({
    name : {
        type : String,
        required : true,
        trim : true
    },
    showID : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        required : true
    }
})

const SubscriptionSchema = new Schema({
    memberID : {
        type : Schema.Types.ObjectId,
        required : true,
    },
    shows : [ShowsSubSchema]
});

const SubscriptionModel = mongoose.model('subscription', SubscriptionSchema);

module.exports = SubscriptionModel;