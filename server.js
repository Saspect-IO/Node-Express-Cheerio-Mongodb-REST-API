"use strict";
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const scrapeUtilityLocal = require('./utilities/scrapeLocalNews');
const scrapeUtilityInt = require('./utilities/scrapeIntNews');
const articlesCtrl = require('./controllers/ArticlesController');

// Dev database on mlab
mongoose.connect( config.database,{ useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// set routes
const api = require('./routes/api');

// Init App
const app = express();

// CORS Middleware
app.use(cors());

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set init url path for api routes
app.use('/', api);

//test webscraper and old Articles clean up to make sure it works
 setInterval(function () {
   scrapeUtilityLocal.scrapeLocalNews();
   scrapeUtilityInt.scrapeIntNews();
   articlesCtrl.cleanUpOldArticles();
   console.log('scraping');
}, 900000000);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});
