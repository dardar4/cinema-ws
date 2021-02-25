const mongoose = require('mongoose');
const config = require('../config');

module.exports = () => {
    mongoose.connect(config.mongoDbUrl, {
        useUnifiedTopology: true,
        useNewUrlParser : true, 
        useCreateIndex : true,
        useFindAndModify : false
    }, () => {
        console.log('✌️ CinemaSubscription DB loaded and connected! ✌️');
    })
};
