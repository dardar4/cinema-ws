const mongoose = require('mongoose');
const subscriptionModel = require('./subscription');

const Schema = mongoose.Schema;

const ShowSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    showID : {
        type : Number,
        required : true
    },
    imageURL : {
        type : String,
        trim : true
    },
    premiered : {
        type : Date
    },
    genres : {
        type : Array,
        required : true
    },
    subscribers: [{ 
        type : Schema.Types.ObjectId, 
        ref: 'subscription' 
    }],
});


ShowSchema.post('findOneAndDelete', async function (doc, next) {
    // After deleting the show document need to go over all subscriptions and delete this show from them as well
    for(let subscriptionId of doc.subscribers){
        try{
            subscriptionModel.findByIdAndUpdate(subscriptionId,
            { $pull: { 
                    shows: {
                        showID : doc.showID 
                    } 
                } 
            }).exec();
        }
        catch(e){
            console.error(e);
        }
    }
    next();
})

const ShowModel = mongoose.model('show', ShowSchema);

module.exports = ShowModel;