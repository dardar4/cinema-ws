const axios = require('axios');

const Subscription_URL = 'http://localhost:8000/api';

const getShows = () => {
    return axios.get(`${Subscription_URL}/shows`);
}

const addShow = (showData) => {
    return axios.post(`${Subscription_URL}/shows`, showData);
}

const updateShow = (showID, showData) => {
    return axios.patch(`${Subscription_URL}/shows/${showID}`, showData);
}

const deleteShow = (showID) => {
    return axios.delete(`${Subscription_URL}/shows/${showID}`);
}

const getMembers = () => {
    return axios.get(`${Subscription_URL}/members`);
}

const addMember = (memberData) => {
    return axios.post(`${Subscription_URL}/members`, memberData);
}

const updateMember = (memberID, memberData) => {
    return axios.patch(`${Subscription_URL}/members/${memberID}`, memberData);
}

const deleteMember = (memberID) => {
    return axios.delete(`${Subscription_URL}/members/${memberID}`);
}


module.exports = {
    getShows,
    addShow,
    updateShow,
    deleteShow,
    getMembers,
    addMember,
    updateMember,
    deleteMember
}