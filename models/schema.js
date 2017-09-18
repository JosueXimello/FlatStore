'use strict'

const	mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product_Schema = Schema({

		name: 	String,
		price:  Number,
		description: String,
		images: String,
		stock: Number,
		discount: Number,
		review:{
			stars: Number,
			comments: String,
			autor: String
		}
});
 

module.exports = mongoose.model('Product',Product_Schema);