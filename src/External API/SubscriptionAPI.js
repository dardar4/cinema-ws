const axios = require('axios');

const Subscription_URL = 'http://localhost:8000/api';

const getShows  = () => {
    return axios.get(`${Subscription_URL}/shows`);
}

const addShow = (showData) => {
    return axios.post(`${Subscription_URL}/shows`, showData);
}

module.exports = {
    getShows,
    addShow
}