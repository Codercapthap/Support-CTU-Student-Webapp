require('dotenv').config();

module.exports = {
   port: process.env.APP_PORT || 3000
};

/**
 * PORT: server listening on http:localhost:PORT
 */
