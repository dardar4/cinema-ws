const express = require('express')
const cors = require('cors');
const usersRouter = require('../routers/users');
const accountRouter = require('../routers/account');
const showsRouter = require('../routers/shows');

module.exports = async (app) => {
    // Parses incoming json request into an object
    app.use(express.json());

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());
    
    // Load API routes
    app.use(usersRouter);
    app.use(accountRouter);
    app.use('/api', showsRouter);
}