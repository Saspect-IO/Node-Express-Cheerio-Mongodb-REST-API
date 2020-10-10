const axios = require('axios');
const cheerio = require('cheerio');

// scrapes news details from each news article url by <p> tags setup the article properties and push to Articles Object that mimics the news API JSON Structure.
module.exports.scrapeArticleDetail = async (artilceUrl, htmlScraperClass) => {
  try {
    const response = await axios.get(artilceUrl);
    let $ = cheerio.load(response.data);
    let articleDetails = null;
    $(htmlScraperClass).each((i, elm) => {
      let data = $(elm);
      let addedSpace = data.find("p").text();
      articleDetails = addedSpace.replace(/(.*?\.){3}/g, '$& \n\n');
    });
    return articleDetails;
  } catch (err) {
    console.log('[Error]:', err.message);
  }
}

//fetch json data from news api for each url.
module.exports.getNewsHeadline = async (url) => {
  try {
    const resp = await axios.get(url);
    let newsArticle = resp.data.articles;
    return newsArticle
  } catch (err) {
    console.log('[Error]:', err.message);
  }
}