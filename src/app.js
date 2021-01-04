const express = require('express');
const config = require('../src/config');

const startServer = async () => {
    const app = express();

    // Load required modules (like mongoose and express)
    await require('./loaders')({ expressApp : app });

    // Set port and start the server
    app.listen(config.port, () => {
        console.log(`
          ###############################################
          🎥 Cinema server listening on port: ${config.port} 🎥
          ###############################################
        `);
    }).on('error', err => {
        console.error(err);
        process.exit(1);
    });
}

startServer();