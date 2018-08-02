"use strict";
// ..........................................................................
// IMPORTS & ALIASES
// ..........................................................................
const fs = require('fs');
const Article = require('../models/Articles');
const Category = require('../models/Categories');
const Sources = require('../models/Sources');
const Section = require('../models/Sections');
const moment = require('moment');
// ..........................................................................
// Dashboard Pages
// ..........................................................................
//

module.exports.getDashboard = async function (req, res) {
  //let articles = Articles.find({category:'local',scaped:true},{_id:1, title:1, subject:1, displayDate:1, urlTitle:1, ult}).sort({timeStamp: -1}).limit(4)
  res.render('dashboards/dash',{
    // articles:artlices
  });
}
