const SubscriptionAPI = require('../External API/SubscriptionAPI');


const getAllShows =  () => {
    // Get all shows
    return SubscriptionAPI.getShows();
};


module.exports = {
    getAllShows
}