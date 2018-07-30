const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const Article = require('../models/Articles');
const config = require('../config/database');


let getNewsParams = (category, headlineUrl, source, htmlScraperClass) => {

  axios.get(headlineUrl).then((response) => {

    let $ = cheerio.load(response.data);
    $(htmlScraperClass).each((i, elm) => {
      let data = $(elm );

      let title = data.find(".field-content a").text();
      let subject = data.find(".field-content").text();
      let urlToImage = data.find('img').attr('src');
      let displayDate = moment().format("MMM Do YY");


      Article.find({title:title}, function(err, exist) {
        if ((title!=='Global Jamaica'||title!=='')&&(exist===null||typeof(exit)==='undefined')) {

          let article = new Article();
          article.title=title;
          article.subject=subject;
          article.source=source;
          article.category= category;
          article.publishedAt= displayDate;
          article.urlToImage= urlToImage;
          article.url=headlineUrl;
          article.details=articleDetails;
          console.log('new article '+article.title);
          // article.save((err) => {
          //   if (err)
          //     throw err;
          // });
        }else {
          console.log('article exist');
        }
      });

    });
  });
}

module.exports.scrapeLocalNews = function(sources){

  for (let i in sources) {
      let extratedNewsSourceElements = sources[i]
      console.log('test: '+extratedNewsSourceElements.seciton);
      getNewsParams(extratedNewsSourceElements.seciton,  extratedNewsSourceElements.headlineUrl, extratedNewsSourceElements.mediaName,  extratedNewsSourceElements.htmlScraperClass);
  }
}
