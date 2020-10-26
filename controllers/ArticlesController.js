// ..........................................................................
// IMPORTS & ALIASES
// ..........................................................................
const Article = require('../models/Articles');
const moment = require('moment');


// ..........................................................................
// Article Forms and Previews
// ..........................................................................

//save new articles
module.exports.saveArticles = async function (article) {

  if (article !== undefined) {
    let dbArticle = await Article.find({
      title: article.title
    }, {
      title: 1
    });
    if (dbArticle && dbArticle.length > 0) {
      console.log('article exist ' + dbArticle[0].title);
    } else {
      console.log('new article ' + article.title + ' ' + article.source);
      let newArticle = new Article(article);
      await newArticle.save();
    }
  }
}

//get articles by category
module.exports.getArticleByCategory = async (req, res) => {

  let articles = await Article.find({
    category: req.params.category
  });

  let articlesFound = articles && articles.length > 0 ? articles.map((article) => {
    return {
      id: article._id,
      source: article.source,
      category: article.category,
      title: article.title,
      author: article.author,
      publishedAt: article.publishedAt,
      timeStamp: article.timeStamp,
      urlToImage: article.urlToImage,
      description: article.description,
      url: article.url,
      mview: article.mview
    }
  }) : [];
  res.json({
    articlesFound
  })
}

//update articles
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
  Article.updateOne(req.body._id, newData, (err) => {
    if (err)
      throw err;
    res.json("Article Updated")
  });
}

//remove articles from the database 3days old.
module.exports.cleanUpOldArticles = () => {
  Article.find({}, function (err, Data) {
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