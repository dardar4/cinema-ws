const mongoose = require('mongoose');
const config = require('../config');
const path = require('path');

module.exports = () => {
    mongoose.connect(path.join(config.databaseURL, config.databaseName), {
        useUnifiedTopology: true,
        useNewUrlParser : true, 
        useCreateIndex : true,
        //useFindAndModify : false
    }, () => {
        console.log('✌️ DB loaded and connected!');
    })
};
