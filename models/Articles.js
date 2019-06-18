const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Articles Schema
let ArticlesSchema = new Schema({
	title:{
		type:String,
		unique:true,
		required:true
	},
	urlTitle:{
    type:String,
		required:false
	},
	subject:{
		type:String,
		required:false
	},
	description:{
			type:String,
			required:false
	},
	author:{
		type:String,
		required:false
	},
	source:{
    type:String,
		required:true
	},
	category:{
		type:String,
		required:true
	},
	publishedAt:{
    type:String,
		required:true
	},
	publishedDate:{
		type:Date,
		required:false
	},
	timeStamp:{
		type:Date,
		required:false,
		default: Date.now
	},
	urlToImage:{
    type:String,
		required:false
	},
	url:{
    type:String,
		required:true
	},
	mview: {
			type:String,
			required:false,
			default:""
	}
}, { collection : 'articles' });

const Articles = module.exports = mongoose.model('Articles', ArticlesSchema);
