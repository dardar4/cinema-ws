const SubscriptionAPI = require('../External API/SubscriptionAPI');


const getAllShows = () => {
    // Get all shows
    return SubscriptionAPI.getShows();
};

const addShow = (showData) => {
    // Create new show
    return SubscriptionAPI.addShow(showData);
}


module.exports = {
    getAllShows,
    addShow
}