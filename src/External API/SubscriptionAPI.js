const axios = require('axios');

const Subscription_URL = 'http://localhost:8000/api';

const getShows  = async () => {
    const shows = await axios.get(`${Subscription_URL}/shows`);
    return shows.data;
}

module.exports = {
    getShows
}