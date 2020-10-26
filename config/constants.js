const constants = {
    NEWS_SOURCE: {
        TNW: {
            category: "trending",
            url: 'https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=',
            source: "TNW",
            html_scraper_class: '.post-body'
        },
        MASHABLE: {
            category: "trending",
            url: 'https://newsapi.org/v1/articles?source=mashable&sortBy=latest&apiKey=',
            source: "MASHABLE",
            html_scraper_class: '.article-content'
        },
        CNN: {
            category: "news",
            url: 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=',
            source: "CNN",
            html_scraper_class: '.zn-body__paragraph'
        },
        BBC_NEWS: {
            category: "news",
            url: ' https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=',
            source: "BBC NEWS",
            html_scraper_class: '.story-body__inner'
        },
        NY_TIMES: {
            category: "news",
            url: 'https://newsapi.org/v1/articles?source=new-york-magazine&sortBy=latest&apiKey=',
            source: "NY TIMES",
            html_scraper_class: '.article-content'
        },
        IGN: {
            category: "tech",
            url: 'https://newsapi.org/v1/articles?source=ign&sortBy=latest&apiKey=',
            source: "IGN",
            html_scraper_class: '.article-content'
        },
        TECH_RADAR: {
            category: "tech",
            url: 'https://newsapi.org/v1/articles?source=techradar&sortBy=latest&apiKey=',
            source: "TECH RADAR",
            html_scraper_class: '.text-copy'
        },
        POLYGON: {
            category: "tech",
            url: 'https://newsapi.org/v1/articles?source=polygon&sortBy=top&apiKey=',
            source: "POLYGON",
            html_scraper_class: '.c-entry-content'
        },
        TECH_CRUNCH: {
            category: "tech",
            url: 'https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=',
            source: "TECH CRUNCH",
            html_scraper_class: '.article-entry'
        },
        BBC_SPORTS: {
            category: "sports",
            url: 'https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=',
            source: "BBC SPORTS",
            html_scraper_class: 'story-body'
        },
        TALK_SPORTS: {
            category: "sports",
            url: 'https://newsapi.org/v1/articles?source=talksport&sortBy=latest&apiKey=',
            source: "TALK SPORTS",
            html_scraper_class: 'field-item'
        },
        ESPN: {
            category: "sports",
            url: 'https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=',
            source: "ESPN",
            html_scraper_class: '.article-body'
        },
        NFL_NEWS: {
            category: "sports",
            url: 'https://newsapi.org/v1/articles?source=nfl-news&sortBy=latest&apiKey=',
            source: "NFL NEWS",
            html_scraper_class: '.articleText'
        },
        THE_ECONOMIST: {
            category: "business",
            url: 'https://newsapi.org/v1/articles?source=the-economist&sortBy=latest&apiKey=',
            source: "THE ECONOMIST",
            html_scraper_class: '.blog-post__text'
        },
        CNBC: {
            category: "business",
            url: 'https://newsapi.org/v1/articles?source=cnbc&sortBy=top&apiKey=',
            source: "CNBC",
            html_scraper_class: '#article_body'
        },
        BUSINESS_INSIDER: {
            category: "business",
            url: 'https://newsapi.org/v1/articles?source=business-insider&sortBy=latest&apiKey=',
            source: "BUSINES INSIDER",
            html_scraper_class: '.KonaBody'
        },
        MTV_NEWS: {
            category: "entertainment",
            url: 'https://newsapi.org/v1/articles?source=mtv-news&sortBy=latest&apiKey=',
            source: "MTV NEWS",
            html_scraper_class: '.entry-content'
        },
        MTV_UK: {
            category: "entertainment",
            url: 'https://newsapi.org/v1/articles?source=mtv-news-uk&sortBy=top&apiKey=',
            source: "MTV UK",
            html_scraper_class: '.content-copy-text'
        },
        ENTERTAINMENT_WEEKLY: {
            category: "entertainment",
            url: 'https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&apiKey=',
            source: "ENTERTAINMENT WEEKLY",
            html_scraper_class: '.article-body__inner'
        },
        NEW_SCIENTIST: {
            category: "science",
            url: 'https://newsapi.org/v1/articles?source=new-scientist&sortBy=top&apiKey=',
            source: "NEW SCIENTIST",
            html_scraper_class: '.article-content'
        },
        NATIONAL_GEOGRAPHY: {
            category: "science",
            url: 'https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=',
            source: "NATIONAL GEOGRAPHY",
            html_scraper_class: '.parbase'
        }
    },
    FAKE_DOM: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <p>Details Not Availables, please check html scraper class attribute</p>
            </body>
            </html>`
}


module.exports = constants;