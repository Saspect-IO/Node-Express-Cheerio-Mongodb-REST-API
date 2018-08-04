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
  }, (err, articles) => {
    console.log(articles);
    res.json(articles)
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
