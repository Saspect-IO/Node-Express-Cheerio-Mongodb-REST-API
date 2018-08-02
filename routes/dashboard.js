// ..........................................................................
// Imported library
// ..........................................................................
const express = require('express');
const router = express.Router();
const articlesCtrl = require('../controllers/ArticlesController');
const authCtrl = require('../controllers/AuthenticationController');
const pagesCtrl = require('../controllers/PagesController');
//
// ..........................................................................
// Login and Authentication
// ..........................................................................
//
//
// ..........................................................................
// Dashboard routes
// ..........................................................................
//
router.get('/', pagesCtrl.getDashboard)

router.get('/scrape-local', articlesCtrl.scrapeLocalNewsArticles)
router.get('/scrape-int', articlesCtrl.scrapeIntNewsArticles)




module.exports = router;
