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
router.get('/api/articles/:category', articlesCtrl.getArticleByCategory);

router.post('/api/articles/updateArticle', articlesCtrl.updateArticleById);

module.exports = router;
