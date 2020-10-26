const moment = require('moment');
const { NEWS_SOURCE } = require('../config/constants');
const { getNewsHeadline, scrapeArticleDetail } = require('../utilities/scrapeIntNews');
const { saveArticles } = require('../controllers/ArticlesController');
const config = require('../config/env')

module.exports.scrapeIntNews = async () => {
    for (let i in NEWS_SOURCE) {
        let elem = NEWS_SOURCE[i];
        let headlines = await getNewsHeadline(`${elem.url}${config.apikeys.newsAPI}`);
        for (const key in headlines) {
            let articleDetails = await scrapeArticleDetail(headlines[key] ? headlines[key].url : "", elem.html_scraper_class);
            await saveArticles({
                title: headlines[key] ? headlines[key].title : "",
                urlTitle: headlines[key].title ? (headlines[key].title).replace(/[\. ,:-]+/g, "-") : '',
                author: headlines[key] ? headlines[key].author : "",
                subject: headlines[key] ? headlines[key].description : "",
                content: headlines[key] ? headlines[key].content : "",
                source: elem.source,
                category: elem.category,
                publishedAt: headlines[key] ? headlines[key].publishedAt ? headlines[key].publishedAt : '' : '',
                publishedDate: headlines[key] ? headlines[key].publishedAt ? moment(headlines[key].publishedAt).format() : moment().format() : moment().format(),
                description: articleDetails,
                urlToImage: headlines[key] ? headlines[key].UrlToImage : "",
                url: headlines[key] ? headlines[key].url  : "",
            });
        }
    }
}