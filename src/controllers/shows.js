const SubscriptionAPI = require('../External API/SubscriptionAPI');
const subscriptionsDal = require('../dal/subscriptions');


const getAllShows = async () => {
    // Get all shows
    const result = await subscriptionsDal.getShows();
    return result.data;
};

const addShow = async (showData) => {
    // Create new show
    const result = await subscriptionsDal.addShow(showData);
    return result.data;
}

const updateShow = async (showID, showData) => {
    // Update existing show
    const result = await subscriptionsDal.updateShow(showID, showData);
    return result.data;
}

const deleteShow = async (showID) => {
    // Delete existing show
    const result = await subscriptionsDal.deleteShow(showID);
    return result.data;
}


module.exports = {
    getAllShows,
    addShow,
    updateShow,
    deleteShow
}