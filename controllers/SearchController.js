// ..........................................................................
// IMPORTS & ALIASES
// ..........................................................................
const express = require('express');
const fs = require('fs');
const Article = require('../models/Articles');
const Events = require('../models/Events');
const Files = require('../models/Files');
const Images = require('../models/Images');
// ..........................................................................
// EXPORTS
// ..........................................................................
//
//Get Search results
module.exports.postSearch = async function (req, res, next) {

    const [articles, events, files] = await Promise.all([
        Article.find(
            {"$text":{"$search": req.body.search},
                published:true},
            {_id:1,title:1,date:1,subject:1,urlTitle:1},
            {score:{$meta: "textScore"}}),
        Events.find(
            {"$text":{"$search": req.body.search},
                published:true},
            {_id:1,title:1,date:1,subject:1,urlTitle:1},
            {score:{$meta: "textScore"}}),
        Files.find(
            {"$text":{"$search": req.body.search},
                published:true},
            {_id:1,title:1,date:1,subject:1},
            {score:{$meta: "textScore"}})
    ]);

    res.render('frontend/search-results', {
        title: 'Search Results',
        articles:articles,
        events:events,
        files:files
    })
}
//get search by category
module.exports.postSearchCategory = async function (req, res, next) {

    const [articles, events, files, images] = await Promise.all([
        Article.find({category:req.params.category, published:true},
            {_id:1,title:1,date:1,subject:1,urlTitle:1}),
        Events.find ({category:req.params.category, published:true},
            {_id:1,title:1,date:1,subject:1,urlTitle:1}),
        Files.find  ({category:req.params.category, published:true},
            {_id:1,title:1,date:1,subject:1}),
    ]);

    res.render('frontend/categorySearchResults', {
        title: 'Search Results',
        articles:articles,
        events:events,
        files:files,
    })
}
// get search by tags
module.exports.postSearchTag = async function (req, res, next) {

    const [articles, events, files] = await Promise.all([
        Article.find({tags:req.params.tag, published:true},
            {_id:1,title:1,date:1,subject:1,urlTitle:1}),
        Events.find ({tags:req.params.tag, published:true},
            {_id:1,title:1,date:1,subject:1,urlTitle:1}),
        Files.find  ({tags:req.params.tag, published:true},
            {_id:1,title:1,date:1,subject:1}),
    ]);

    res.render('frontend/tagSearchResults', {
        title: 'Search Results',
        articles:articles,
        events:events,
        files:files,
    })
}

// module.exports.postSearchProducts = async function (req, res, next) {
//
//     const articles = await Article.find(
//             {"$text":{"$search": req.body.searchProduct},
//                 published:true, section:'Products'},
//             {_id:1,title:1,date:1,subject:1,urlTitle:1},
//             {score:{$meta: "textScore"}})
//
//     res.render('frontend/products', {
//         title: 'Search Results',
//         products:articles,
//     })
// }
