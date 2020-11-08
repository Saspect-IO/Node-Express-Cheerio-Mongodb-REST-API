Node, Express, Mongodb, RESTful API Service, with the [cheerio](https://cheerio.js.org/) webscraper, powered by the [newsAPI](https://newsapi.org/) for:
1. [NotiVize-Android-Mobile-App](https://github.com/Saspect-IO/NotiVize).

The REST API JSON Demo on heroku returns data by categories, links below:
1. [tech](https://notivize2.herokuapp.com/api/articles/tech)
2. [local](https://notivize2.herokuapp.com/api/articles/local)
3. [entertainment](https://notivize2.herokuapp.com/api/articles/entertainment)
4. [trending](https://notivize2.herokuapp.com/api/articles/trending)
5. [news](https://notivize2.herokuapp.com/api/articles/news)
6. [sports](https://notivize2.herokuapp.com/api/articles/sports)
7. [science](https://notivize2.herokuapp.com/api/articles/science)

The android demo app can be downloaded [here](https://play.google.com/store/apps/details?id=com.saspect.notivise).

## API Usage

Clone or download repo
npm install
npm install -g nodemon
open cli in project folder and run:  npm run dev

## Recommendations

1) You will need to get an API key from the news api to fetch news headlines.

2) Database Storage: Use Mongodb Atlas for cloud or mongod for local server.

## Future Updates

1) Add Routes and configuration for login and registration component using JWT tokens Passport Js.
