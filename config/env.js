"use strict";
const editJsonFile = require("edit-json-file");
require('dotenv').config()
let file = editJsonFile(`${__dirname}/env.json`);

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
    settings: {
        fileSizeLimit: file.get("fileSizeLimit.value")
    },
    apikeys:{
        newsAPI:process.env.NEWS_API_KEY
    }
};

const prod = {
    app: {
        webserver: {
            port: parseInt(process.env.PROD_APP_PORT) || 8080,
            cookiestatus: true
        }
    },
    db: {
        host: process.env.PROD_DB_HOST
    },
    settings: {
        fileSizeLimit: file.get("settings.fileSizeLimit")
    },
    apikeys:{
        newsAPI:process.env.NEWS_API_KEY
    }
};

const env = process.env.NODE_ENV

const config = {
    dev,
    prod
};

module.exports = config[env];