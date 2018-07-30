"use strict";
// ..........................................................................
// IMPORTS & ALIASES
// ..........................................................................
const fs = require('fs');
const Article = require('../models/Articles');
const Category = require('../models/Categories');
const Sources = require('../models/Sources');
const Section = require('../models/Sections');
const scrapeUtilityLocal = require('../utilities/scrapeLocalNews');
const scrapeUtilityInt = require('../utilities/scrapeIntNews');
const moment = require('moment');
// ..........................................................................
// EXPORTS
// ..........................................................................
//
//scrape local news Articles
module.exports.getScrapeLocalNewsUtility = async function(){
  let sources = await Sources.find({publishe:true})
  res.render('dashboard/utilities/scrape-local',{
    title: 'Scrape Local News',
    sources:sources,
    messages: req.flash('success')
  });
}
module.exports.scrapeLocalNewsArticles = function(req, res) {

  setTimeout(function () {
    scrapeUtilityLocal.scrapeLocalNews([{
      section:"local",
      headlineUrl:'http://jamaica-gleaner.com/lead',
      mediaName:"GLEANER",
      htmlScraperClass:'div.views-row'
    }])
  }, 3000);
  res.send('working')
}

//scrape international news Articles
module.exports.scrapeIntNewsArticles = function(){

}

//scrape blockchain and crypto Articles
module.exports.scrapeCryptoNewsArticles = function(){

}
