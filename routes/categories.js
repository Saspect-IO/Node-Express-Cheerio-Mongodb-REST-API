// ..........................................................................
// Imported library
// ..........................................................................
const express = require('express');
const router = express.Router();
const databaseOperators = require('../utilities/databaseOperators');
const Article = require('../models/articles');
//
// ..........................................................................
// API Routes for JSON Data
// ..........................................................................
//
router.get('/news', (req, res) => {
  	Article.getArticleByCategory({"Articles.category": "news"}, (err, article) =>{
      if(err) throw err;

      databaseOperators.clearArray();
      databaseOperators.restructureDatafromDatabase(article);
      if (databaseOperators.Articles.articles.length != 0) {
          res.json(databaseOperators.Articles);
      }
    });
});

router.get('/trending', (req, res) => {
  	Article.getArticleByCategory({"Articles.category": "trending"}, (err, article) =>{
      if(err) throw err;

      databaseOperators.clearArray();
      databaseOperators.restructureDatafromDatabase(article);
      if (databaseOperators.Articles.articles.length != 0) {
          res.json(databaseOperators.Articles);
      }
    });
});

router.get('/tech', (req, res) => {
  	Article.getArticleByCategory({"Articles.category": "tech"}, (err, article) =>{
      if(err) throw err;

      databaseOperators.clearArray();
      databaseOperators.restructureDatafromDatabase(article);
      if (databaseOperators.Articles.articles.length != 0) {
          res.json(databaseOperators.Articles);
      }
    });
});

router.get('/sports', (req, res) => {
  	Article.getArticleByCategory({"Articles.category": "sports"}, (err, article) =>{
      if(err) throw err;

      databaseOperators.clearArray();
      databaseOperators.restructureDatafromDatabase(article);
      if (databaseOperators.Articles.articles.length != 0) {
          res.json(databaseOperators.Articles);
      }
    });
});

router.get('/science', (req, res) => {
  	Article.getArticleByCategory({"Articles.category": "science"}, (err, article) =>{
      if(err) throw err;

      databaseOperators.clearArray();
      databaseOperators.restructureDatafromDatabase(article);
      if (databaseOperators.Articles.articles.length != 0) {
          res.json(databaseOperators.Articles);
      }
    });
});

router.get('/entertainment', (req, res) => {
  	Article.getArticleByCategory({"Articles.category": "entertainment"}, (err, article) =>{
      if(err) throw err;

      databaseOperators.clearArray();
      databaseOperators.restructureDatafromDatabase(article);
      if (databaseOperators.Articles.articles.length != 0) {
          res.json(databaseOperators.Articles);
      }
    });
});

router.get('/local', (req, res) => {
  	Article.getArticleByCategory({"Articles.category": "local"}, (err, article) =>{
      if(err) throw err;

      databaseOperators.clearArray();
      databaseOperators.restructureDatafromDatabase(article);
      if (databaseOperators.Articles.articles.length != 0) {
          res.json(databaseOperators.Articles);
      }
    });
});


module.exports = router;
