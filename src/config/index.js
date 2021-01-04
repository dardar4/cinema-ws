const dotenv = require('dotenv');

// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
        port : process.env.PORT,
        databaseURL : process.env.DB_URL,
        databaseName : process.env.DB_NAME
}