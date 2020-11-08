const axios = require('axios');
const cheerio = require('cheerio');
const { FAKE_DOM } = require('../config/constants')


//fetch json data from news api for each url.
module.exports.getNewsHeadline = async (url) => {
  try {
    const res = await axios.get(url);
    let newsHeadlines = res ? res.data ? res.data.articles : [] : [];
    return newsHeadlines;
  } catch (err) {
    console.log('[News Headline Fetch Error]::', err.message);
  }
}

// scrapes news details from each news article url by <p> tags.
module.exports.scrapeArticleDetail = async (artilceUrl, htmlScraperClass) => {
  try {
    const res = await axios.get(artilceUrl);
    let $ = res ? cheerio.load(res.data) : cheerio.load(FAKE_DOM);
    let articleDetails = null;
    $(htmlScraperClass).each((i, elem) => {
      let eachElem = $(elem);
      let eachParagraph = eachElem.find("p").text();
      articleDetails = eachParagraph.replace(/(.*?\.){3}/g, '$& \n\n'); // add new line for each paragraph
    });
    return articleDetails;
  } catch (err) {
    console.log('[News Article Details Scraper Error]::', err.message);
  }
}
