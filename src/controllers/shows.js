const SubscriptionAPI = require('../External API/SubscriptionAPI');


const getAllShows = async () => {
    // Get all shows
    const result = await SubscriptionAPI.getShows();
    return result.data;
};

const addShow = async (showData) => {
    // Create new show
    const result = await SubscriptionAPI.addShow(showData);
    return result.data;
}


module.exports = {
    getAllShows,
    addShow
}