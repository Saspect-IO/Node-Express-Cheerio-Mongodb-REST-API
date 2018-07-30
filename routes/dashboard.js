// ..........................................................................
// Imported library
// ..........................................................................
const express = require('express');
const router = express.Router();
const articlesCtrl = require('../controllers/ArticlesController');
//
// ..........................................................................
// Dash Routes for to Get Initial Page
// ..........................................................................
//
router.get('/dashboard/scrape-local', articlesCtrl.scrapeLocalNewsArticles);


module.exports = router;
