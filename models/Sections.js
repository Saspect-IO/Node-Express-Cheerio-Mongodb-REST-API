const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SectionSchema = new Schema({
  title:{
    type:String,
    required:true
	},
  description:{
    type:String,
    required:true
	},
  timeStamp:{
    type:Date,
    required:false,
    default: Date.now
  }
}, {collection: 'sections'});

const Section = module.exports = mongoose.model('Section', SectionSchema);
