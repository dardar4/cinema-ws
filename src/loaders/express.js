const express = require('express')
const cors = require('cors');
const usersRouter = require('../routers/users');
const accountRouter = require('../routers/account');

module.exports = async ({ expressApp }) => {
    // Parses incoming json request into an object
    expressApp.use(express.json());

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    expressApp.use(cors());
    
    // Load API routes
    expressApp.use(usersRouter);
    expressApp.use(accountRouter);
}