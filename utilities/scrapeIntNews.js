const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const Article = require('../models/Articles');
const config = require('../config/database');

//const apiKey = 'New API key goes here'
const apiKey = config.apiKey

// NEWS api end points with apiKey
const TNW = 'https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=' + apiKey;
const MASHABLE = 'https://newsapi.org/v1/articles?source=mashable&sortBy=latest&apiKey=' + apiKey;
const CNN = 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=' + apiKey;
const NY_TIMES = 'https://newsapi.org/v1/articles?source=new-york-magazine&sortBy=latest&apiKey=' + apiKey;
const BBC_NEWS = ' https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=' + apiKey;
const IGN = 'https://newsapi.org/v1/articles?source=ign&sortBy=latest&apiKey=' + apiKey;
const TECH_RADAR = 'https://newsapi.org/v1/articles?source=techradar&sortBy=latest&apiKey=' + apiKey;
const POLYGON = 'https://newsapi.org/v1/articles?source=polygon&sortBy=top&apiKey=' + apiKey;
const TECH_CRUNCH = 'https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=' + apiKey;
const BBC_SPORTS = 'https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=' + apiKey;
const TALK_SPORTS = 'https://newsapi.org/v1/articles?source=talksport&sortBy=latest&apiKey=' + apiKey;
const ESPN = ' https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=' + apiKey;
const NFL_NEWS = 'https://newsapi.org/v1/articles?source=nfl-news&sortBy=latest&apiKey=' + apiKey;
const THE_ECONOMIST = 'https://newsapi.org/v1/articles?source=the-economist&sortBy=latest&apiKey=' + apiKey;
const CNBC = 'https://newsapi.org/v1/articles?source=cnbc&sortBy=top&apiKey=' + apiKey;
const BUSINES_INSIDER = 'https://newsapi.org/v1/articles?source=business-insider&sortBy=latest&apiKey=' + apiKey;
const MTV_NEWS = 'https://newsapi.org/v1/articles?source=mtv-news&sortBy=latest&apiKey=' + apiKey;
const MTV_UK = 'https://newsapi.org/v1/articles?source=mtv-news-uk&sortBy=top&apiKey=' + apiKey;
const ENTERTAINMENT_WEEKLY = 'https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&apiKey=' + apiKey;
const NEW_SCIENTIST = 'https://newsapi.org/v1/articles?source=new-scientist&sortBy=top&apiKey=' + apiKey;
const NATIONAL_GEOGRAPHY = 'https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=' + apiKey;

const sources = {
    TNW: ["trending", TNW, "TNW", '.post-body'],
    MASHABLE: ["trending", MASHABLE, "MASHABLE", '.article-content'],
    CNN: ["news", CNN, "CNN", '.zn-body__paragraph'],
    BBC_NEWS: ["news", BBC_NEWS, "BBC NEWS", '.story-body__inner'],
    NY_TIMES: ["news", NY_TIMES, "NY TIMES", '.article-content'],
    IGN: ["tech", IGN, "IGN", '.article-content'],
    TECH_RADAR: ["tech", TECH_RADAR, "TECH RADAR", '.text-copy'],
    POLYGON: ["tech", POLYGON, "POLYGON", '.c-entry-content'],
    TECH_CRUNCH: ["tech", TECH_CRUNCH, "TECH CRUNCH", '.article-entry'],
    BBC_SPORTS: ["sports", BBC_SPORTS, "BBC SPORTS", 'story-body'],
    TALK_SPORTS: ["sports", TALK_SPORTS, "TALK SPORTS", 'field-item'],
    ESPN: ["sports", ESPN, "ESPN", '.article-body'],
    NFL_NEWS: ["sports", NFL_NEWS, "NFL NEWS", '.articleText'],
    THE_ECONOMIST: ["business", THE_ECONOMIST, "THE ECONOMIST", '.blog-post__text'],
    CNBC: ["business", CNBC, "CNBC", '#article_body'],
    BUSINESS_INSIDER: ["business", BUSINES_INSIDER, "BUSINES INSIDER", '.KonaBody'],
    MTV_NEWS: ["entertainment", MTV_NEWS, "MTV NEWS", '.entry-content'],
    MTV_UK: ["entertainment", MTV_UK, "MTV UK", '.content-copy-text'],
    ENTERTAINMENT_WEEKLY: ["entertainment", ENTERTAINMENT_WEEKLY, "ENTERTAINMENT WEEKLY", '.article-body__inner'],
    NEW_SCIENTIST: ["science", NEW_SCIENTIST, "NEW SCIENTIST", '.article-content'],
    NATIONAL_GEOGRAPHY: ["science", NATIONAL_GEOGRAPHY, "NATIONAL GEOGRAPHY", '.parbase'],
};

//checke database for duplicate data
let checkForDuplicate = async function(article) {

  if (typeof article!=='undefined') {
    let dbArticle = await Article.find({
      title: article.title
    }, {title: 1});

    if (dbArticle.length) {
      console.log('article exist ' + dbArticle.title);
    } else{
      console.log('new article ' + article.title+' '+article.source);
      let newArticle = new Article();
      newArticle.title = article.title;
      newArticle.urlTitle = (article.title).replace(/[\. ,:-]+/g, "-");
      newArticle.articleAuthor = article.author;
      newArticle.source = article.source;
      newArticle.category = article.category;
      newArticle.publishedAt = article.publishedAt;
      newArticle.urlToImage = article.urlToImage;
      newArticle.details = article.details;
      newArticle.url = article.url;
      newArticle.save((err) => {
        if (err)
          throw err;
        }
      );
    }
  }
}

// scrapes news details from each news article url by <p> tags setup the article properties and push to Articles Object that mimics the news API JSON Structure.
let scrapeArticleUrl = (articleSource, articleCategory, articleTitle, articleAuthor, articleDate, articleTimeStamp, articleUrlToImage, artilceUrl, htmlScraperClass) => {

  axios.get(artilceUrl).then((response) => {
    let $ = cheerio.load(response.data);
    $(htmlScraperClass).each((i, elm) => {
      let data = $(elm);

      let addedSpace = data.find("p").text()
      let articleDetails = addedSpace.replace(/(.*?\.){3}/g, '$& \n\n');

      return articleDetails
    });
  }).then((articleDetails)=>{
    checkForDuplicate({
      source: articleSource,
      category: articleCategory,
      title: articleTitle,
      author: articleAuthor,
      publishedAt: articleDate,
      timeStamp: articleTimeStamp,
      urlToImage: articleUrlToImage,
      description: articleDetails,
      url: artilceUrl
    });
  }).catch(() => {
      console.log("Promise Rejected");
  });
}

//fetch data json data from news api for each link and pass on data to scrapeArticleUrl.
let fetchAllNewsData = (category, newsAPIurl, source, htmlScraperClass) => {
  request(newsAPIurl, (err, response, rawData) => {

    if (err) {
      throw err;
    }

    let body = JSON.parse(rawData);
    let newsArticles = body.articles;
    let displayDate = moment().format("MMM Do YY");
    let timeStamp = moment().format("YYYYMMDD");

    for (let i in newsArticles) {
      scrapeArticleUrl(source, category, newsArticles[i].title, newsArticles[i].author, displayDate, timeStamp, newsArticles[i].urlToImage, newsArticles[i].url, htmlScraperClass);
    }
  });
}

// executes nested functions.
module.exports.scrapeIntNews = () => {

  for (let i in sources) {
    let elements = sources[i]

    fetchAllNewsData(elements[0], elements[1], elements[2], elements[3]);
  }
}
