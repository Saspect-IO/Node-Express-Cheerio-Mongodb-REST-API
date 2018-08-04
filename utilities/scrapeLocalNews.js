const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const Article = require('../models/Articles');

let sources = [{
  category:"local",
  headlineUrl:'http://jamaica-gleaner.com/lead',
  mediaName:"GLEANER",
  htmlScraperClass:'div.views-row'
}];

let getNewsParams = (category, headlineUrl, source, htmlScraperClass) => {

  axios.get(headlineUrl).then((response) => {

    let $ = cheerio.load(response.data);
    $(htmlScraperClass).each((i, elm) => {
      let data = $(elm );

      let title = data.find(".field-content a").text();
      let subject = data.find(".field-content").text();
      let urlToImage = data.find('img').attr('src');
      let displayDate = moment().format("MMM Do YY");


      if (title!=='Global Jamaica'&&title!=='Weather'&&title!==''&&title!=='The Gleaner Supplement') {

        Article.findOne({title:title}, function(err, exist,next) {
          if (exist===null) {
            let article = new Article();
            article.title=title;
            article.urlTitle = (title).replace(/[\. ,:-]+/g, "-");
            article.subject=subject;
            article.source=source;
            article.category= category;
            article.publishedAt= displayDate;
            article.urlToImage= urlToImage;
            article.url=headlineUrl;
            console.log('new article '+article.title);
            article.save((err) => {
              if (err){
                console.log(err);
              }

            });
          }else if(exist!==null) {
            console.log('article exist '+ exist.title);
          }
        });
      }

    });
  });
}

module.exports.scrapeLocalNews = () => {

  for (let i=0; i < sources.length; i++) {
      let elements = sources[i]

      getNewsParams(elements.category,  elements.headlineUrl, elements.mediaName,  elements.htmlScraperClass);
  }
}
