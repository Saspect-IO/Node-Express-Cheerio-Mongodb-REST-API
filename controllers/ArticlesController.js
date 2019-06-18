"use strict";
// ..........................................................................
// IMPORTS & ALIASES
// ..........................................................................
const Article = require('../models/Articles');
const moment = require('moment');
// ..........................................................................
// Article Forms and Previews
// ..........................................................................
//
//get articles by category
module.exports.getArticleByCategory = (req, res) => {
  Article.find({
    category: req.params.category
  }, (err, dbArticles) => {
    //restructure like news api
    res.json({
      articles: dbArticles.map((dbArticles) => {
        return {
          id: dbArticles._id,
          source: dbArticles.source,
          category: dbArticles.category,
          title: dbArticles.title,
          author: dbArticles.author,
          publishedAt: dbArticles.publishedAt,
          timeStamp: dbArticles.timeStamp,
          urlToImage: dbArticles.urlToImage,
          description: dbArticles.description,
          url: dbArticles.url,
          mview: dbArticles.mview
        }
      })
    });
  });
}

//to update article view
module.exports.updateArticleById = (req, res) => {
  let newData = {
    $set: {
      source: req.body.Articles.source,
      category: req.body.Articles.category,
      title: req.body.Articles.title,
      author: req.body.Articles.author,
      publishedAt: req.body.Articles.publishedAt,
      timeStamp: req.body.Articles.timeStamp,
      urlToImage: req.body.Articles.urlToImage,
      description: req.body.Articles.description,
      url: req.body.Articles.url,
      mview: req.body.Articles.mview
    }
  }
  console.log("test: "+newData);
  Article.updateOne(req.body._id, newData, (err) => {
    if (err)
      throw err;
    res.json("Article Updated")
  });
}
//remove articles from the database 3days old.
module.exports.cleanUpOldArticles = () => {
  Article.find({}, function(err, Data) {
    if (Data) {
      let dbArticles = Data;

      for (let i in dbArticles) {
        let eachArticle = dbArticles[i];
        let relativeTime = moment(eachArticle.timeStamp, "YYYYMMDD").fromNow();
        if (relativeTime == '5 days ago') {
          Article.remove({
            "_id": dbArticles[i]._id
          }, (err, data) => {
            if (err) {
              throw err;
            }
          });
        }
      }
    }
  });
}
