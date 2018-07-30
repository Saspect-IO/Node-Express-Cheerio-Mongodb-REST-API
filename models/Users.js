const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
let UsersSchema = mongoose.Schema({
	name:{
		type: String,
		required:true
	},
  email: {
    type: String,
    required:true,
    unique:true
  },
	password: {
		type: String,
		required:true
	},
	token:{
		type: String,
	},
	confirmed: {
		type: Boolean,
		default:false
	},
	status: {
		type: String,
		default:'inactive'
	},
	role: {
		type: String,
		default:'guest'
	},
	subcribed: {
		type: Boolean,
		default:false
	},
  timeStamp:{
    type:Date,
    default: Date.now
  }
}, {collection: 'users'});

const Users = module.exports = mongoose.model('Users', UsersSchema);
