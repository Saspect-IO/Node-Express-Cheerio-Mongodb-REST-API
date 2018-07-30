const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SourcesSchema = new Schema({
  section:{
    type:String,
    required:true
  },
  headlineUrl:{
    type:String,
    required:true
  },
  mediaName:{
    type:String,
    required:true
  },
  htmlScraperClass:{
    type:String,
    required:false
  },
  published:{
    type:Boolean,
    default:false
  },
  timeStamp:{
    type:Date,
    required:false,
    default: Date.now
  }
}, {collection: 'sources'});

const Sources = module.exports = mongoose.model('Sources', SourcesSchema);
