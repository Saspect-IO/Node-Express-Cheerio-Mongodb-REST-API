"use strict";
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
//const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const config = require('./config/database');

// Dev database on mlab
mongoose.connect( config.database,{ useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// set routes
const dashboard = require('./routes/dashboard');
const api = require('./routes/api');


// Init App
const app = express();

// CORS Middleware
app.use(cors());

app.use(morgan('combined'))

//app.enable('trust proxy', true);

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// // Express Session
// app.use(session({
//     secret: '',
//     name: 'sessionId',
//     resave: true,
//     saveUninitialized: false,
//     proxy: true,
//     cookie: {
//       //secure: true,
//     },
//     store: new MongoStore({
//       mongooseConnection: db
//     })
// }))


// Express Messages Middleware
//app.use(flash());


// // Passport init
// require('./config/passport')(passport);
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('*', function(req, res, next){
//   res.locals.user = req.user || null;
//   next();
// });

app.use('/', dashboard);
app.use('/api', api);

// app.get('*', function(req, res, next){
//
//   res.render('errors/error-internal-server', {
//     title: 'Error 404 - Page not found',
//     status:'404',
//     msg: 'Sorry page not found',
//     backlink:'/dashboard'
//   });
//   next();
// });

// Handle Global errors
// app.use((err, req, res, next) => {
//   if (! err) {
//       return next();
//   }
//   console.log(err);
//
//   res.render('errors/error-internal-server', {
//     title: 'Error 500 -  Internal Server Error',
//     status:'500',
//     msg: err,
//     backlink:'/dashboard',
//   });
// });

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});
