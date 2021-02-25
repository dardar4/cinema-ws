const SubscriptionModel = require('../models/subscription');

const addSubscription = (SubscriptionData) => {
    const newSubscription = new SubscriptionModel(SubscriptionData);
    return newSubscription.save();
}

const getAllSubscriptions = () => {
    return SubscriptionModel.find({});
}

const getSubscription = (id) => {
    return SubscriptionModel.findOne({ memberID : id });
}

const updateSubscription = (id, SubscriptionData) => {
    return SubscriptionModel.findOneAndUpdate({ memberID : id }, SubscriptionData, {
        new : true, // returns the new user
        runValidators : true // validate the updated object
    });
}

const deleteSubscription = (id) => {
    return SubscriptionModel.findOneAndDelete({ memberID : id });
}

const deleteAllSubscriptions = () => {
    return SubscriptionModel.deleteMany({});
}

module.exports = {
    addSubscription,
    getAllSubscriptions,
    getSubscription,
    updateSubscription,
    deleteSubscription,
    deleteAllSubscriptions
}