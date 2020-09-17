'use strict';
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	_id:Number,
	userName: {
		type: String,
		default: '',
	},
	firstName: {
		type: String,
		default: '',
	},
	lastName: {
		type: String,
		default: '',
	},
	updatedAt: {
		type: Date,
		default: Date.now(),
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	photos:{
		type:[String],
		default:[]
	}
});
userSchema.pre('save', function (next) {
	this.updatedAt = Date.now();
	return next();
});
const User = mongoose.model('user', userSchema);
module.exports = User;