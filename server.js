"use strict";
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/env');
const mongoose = require('mongoose');
const {scrapeIntNews} = require('./helpers/scrapeArticles');
const {cleanUpOldArticles} = require('./controllers/ArticlesController');
const api = require('./routes/api');

// ..........................................................................
// Database Init
// ..........................................................................
//mongoose options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  bufferMaxEntries: 0,
}
//connect to database
mongoose.connect(config.db.host, mongooseOptions).then(
  () => console.log("Database Connection established!"),
  err => console.log(err)
);
mongoose.set('useFindAndModify', false);
// To log errors after initial connection  
mongoose.connection.on('error', err => {
  console.log(err);
  if (err) throw err
});


// ..........................................................................
// Init App
// ..........................................................................
const app = express();

// ..........................................................................
// App Middleware
// ..........................................................................
//security protocol
app.use(helmet());
// CORS Middleware
app.use(cors());

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set init url path for api routes
app.use('/', api);

//test webscraper and old Articles clean up to make sure it works
setTimeout( async function () {
  console.log('scraping...');
  await scrapeIntNews();
  cleanUpOldArticles();
  console.log('complete...');
}, 900);

// ..........................................................................
// Port Settings
// ..........................................................................
// Set Port
app.set('port', (config.app.webserver.port));

app.listen(app.get('port'), ()=> {
    console.log('Server started on port ' + app.get('port'));
});
