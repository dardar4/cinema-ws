const axios = require('axios');

const getAllMembers = async () => {
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    }
    catch(e){
        console.error(e.response.data);
        return [];
    }
};

module.exports = { getAllMembers }