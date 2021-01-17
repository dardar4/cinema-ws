const subscriptionsDal = require('../dal/subscriptions');


const getSubscriptions  = async () => {
    // get all movies subscriptions from all members
    const result = await subscriptionsDal.getSubscriptions();
    return result.data;
}

const createShowSubscription = async (subscribeShowData) => {
    // Create new member's show subscription
    const result = await subscriptionsDal.addShowSubscription(subscribeShowData);
    return result.data;
}

const updateShowSubscription = async (memberID, subscribeShowData) => {
    // Update member's show subscription
    const result = await subscriptionsDal.updateShowSubscription(memberID, subscribeShowData);
    return result.data;
}


module.exports = {
    getSubscriptions,
    createShowSubscription,
    updateShowSubscription
}