const express = require('express')
const cors = require('cors');
const usersRouter = require('../routers/users');
const accountRouter = require('../routers/account');
const showsRouter = require('../routers/shows');
const membersRouter = require('../routers/members');
const subscriptionsRouter = require('../routers/subscriptions');

module.exports = async ({expressApp}) => {
    // Parses incoming json request into an object
    expressApp.use(express.json());

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    expressApp.use(cors());
    
    // Load API routes
    expressApp.use('/api', usersRouter);
    expressApp.use('/api', accountRouter);
    expressApp.use('/api', showsRouter);
    expressApp.use('/api', membersRouter);
    expressApp.use('/api', subscriptionsRouter);
}