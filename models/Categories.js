const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
  title:{
    type:String,
    required:true
	},
  description:{
    type:String,
    required:true
  },
  section:{
    type:Array,
		required:false,
		default:["article"],
	},
  timeStamp:{
    type:Date,
    required:false,
    default: Date.now
  }

}, {collection: 'categories'});

const Category = module.exports = mongoose.model('Category', CategorySchema);
