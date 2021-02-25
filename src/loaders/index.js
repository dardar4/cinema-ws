const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');
const showsLoader = require ('./shows')
const membersLoader = require('./members');
const adminUserLoader = require('./adminUser')

module.exports = async({expressApp}) => {
    mongooseLoader();
    //TODO: ADD LOGGER
    //Logger.info('✌️ DB loaded and connected!');

    expressLoader({expressApp});
    //TODO: ADD LOGGER
    //Logger.info('✌️ Express loaded');

    showsLoader();

    membersLoader();

    adminUserLoader();
}

