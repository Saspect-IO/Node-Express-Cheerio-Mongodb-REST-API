"use strict";
// ..........................................................................
// Imported library
// ..........................................................................
const express = require('express');
const router = express.Router();
const articlesCtrl = require('../controllers/ArticlesController');
//
// ..........................................................................
// Frontend API Routes
// ..........................................................................
//
router.get('/api/:category', articlesCtrl.getArticleByCategory);

module.exports = router;
