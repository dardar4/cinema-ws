const mongoose = require('mongoose');
const validator = require('validator');
const SubscriptionModel = require('./subscription');
const ShowModel = require('./show');

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error('Email format is invalid')
            }
        }
    },
    city : {
        type : String,
        trim : true
    }
});

MemberSchema.virtual('showsSubscriptions', {
    ref : 'subscription',
    localField : '_id',
    foreignField : 'memberID'
});

MemberSchema.post('findOneAndDelete',  async function (doc, next){
    // After deleting a member document need to delete all of his subscriptions as well
    const memberSubscription = await SubscriptionModel.findOneAndDelete({ memberID : doc._id });

    // Loop every show the member was subscribed to and delete the subscription from it
    if(memberSubscription && memberSubscription.shows){
        
        const subscriptionId = memberSubscription._id;
        for(let show of memberSubscription.shows){
            ShowModel.findOneAndUpdate({ showID : show.showID}, 
                { $pull: { 
                    subscribers: {
                        $in: [subscriptionId]
                }}
            }).exec();
        }
    }


    next();
})

const MemberModel = mongoose.model('member', MemberSchema);

module.exports = MemberModel;