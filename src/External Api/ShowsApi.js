const axios = require('axios');

const getAllShows = async() => {
    try{
        const response = await axios.get('https://api.tvmaze.com/shows?page=0');
        return response.data;
    }
    catch(e){
        console.error(e.response.data);
        return [];
    }
};

module.exports = { getAllShows };