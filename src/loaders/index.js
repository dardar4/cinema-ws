const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');

module.exports = async({expressApp}) => {
    mongooseLoader();
    //TODO: ADD LOGGER
    //Logger.info('✌️ DB loaded and connected!');

    expressLoader({expressApp});
    //TODO: ADD LOGGER
    //Logger.info('✌️ Express loaded');
}

