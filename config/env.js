"use strict";
require('dotenv').config();

const dev = {
    app: {
        webserver: {
            port: parseInt(process.env.DEV_APP_PORT) || 3000,
            cookiestatus: false
        }
    },
    db: {
        host: process.env.DEV_DB_HOST
    },
    apikeys: {
        newsAPI: process.env.NEWS_API_KEY
    }
};

const production = {
    app: {
        webserver: {
            port: process.env.PORT || 8080,
            cookiestatus: true
        }
    },
    db: {
        host: process.env.PROD_DB_HOST
    },
    apikeys: {
        newsAPI: process.env.NEWS_API_KEY
    }
};

const env = process.env.NODE_ENV

const config = {
    dev,
    production
};

module.exports = config[env];