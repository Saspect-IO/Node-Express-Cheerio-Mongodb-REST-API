const moment = require('moment');
const { NEWS_SOURCE } = require('../config/news-config');
const { getNewsHeadline, scrapeArticleDetail } = require('../utilities/scrapeIntNews');
const { saveArticles } = require('../controllers/ArticlesController');
const config = require('../config/env');
const apiKey = config.apikeys.newsAPI;

module.exports.scrapeIntNews = async () => {
    for (let i in NEWS_SOURCE) {
        let elem = NEWS_SOURCE[i];
        let headline = await getNewsHeadline(`${elem.url}${apiKey}`);
        let articleDetails  = await scrapeArticleDetail(headline.url, elem.html_scraper_class);
        await saveArticles({
            title: headline.title,
            urlTitle: headline.title ? (headline.title).replace(/[\. ,:-]+/g, "-"): '',
            author: headline.author,
            subject: headline.description,
            content: headline.content,
            source: elem.source,
            category: elem.category,
            publishedAt: headline.publishedAt,
            publishedDate: moment(headline.publishedAt).format("MMM Do YY"),
            description: articleDetails,
            urlToImage: headline.UrlToImage,
            url: headline.url
        });
    }
}