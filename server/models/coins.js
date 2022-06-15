const mongoose = require('mongoose'); 

const coin_schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	volume: {
		type: Number,
		required: true
	},
	open_interest: {
		type: Number,
		required: true
	}
});

coin_schema.index({ "$**": 'text' }); 

module.exports = mongoose.model('Coin', coin_schema); 
	
