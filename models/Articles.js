const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Articles Schema
let ArticlesSchema = new Schema({
	title:{
    type:String,
		required:true,
		unique:true,
		text: true,
		index: true
	},
	urlTitle:{
    type:String,
		required:false
	},
	subject:{
		type:String,
		required:true,
	},
	details:{
			type:String,
			required:false
	},
	author:{
		type:String,
		required:false,
	},
	source:{
    type:String,
		required:true,
	},
	category:{
		type:Array,
		required:false,
		default:["article"],
	},
	publishedAt:{
    type:String,
		required:true,
	},
	publishedDate:{
		type:Date,
		required:false,
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
	tags:{
    	type:Array,
    	required:false,
		default:["article"],
	},
	section:{
		type:Array,
		required:false,
		default:["article"],
	},
	userId:{
		type:String,
		required:false,
		default:"anonymous"
	},
	scraped:{
		type:Boolean,
		required:false,
		default:false
	},
	featured:{
		type:Boolean,
		required:false,
		default:false
	},
	published:{
		type:Boolean,
		required:false,
		default:false
	},
	topStory:{
		type:Boolean,
		required:false,
		default:false
	},
	img:{
		data: Buffer,
		contentType: String
	}
}, { collection : 'articles' });

const Articles = module.exports = mongoose.model('Articles', ArticlesSchema);
