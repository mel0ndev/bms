const mongoose = require('mongoose'); 


const coins_schema = new mongoose.Schema({
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

const trades_schema = new mongoose.Schema({
	name: {
		type: String, 
		required: true
	},
	trades: {
		price: {
			type: Number,
			required: true
		},
		size: {
			type: Number,
			required: true
		},
		side: {
			type: String,
			required: true
		},
		liquidation: {
			type: Boolean,
			required: true
		},
	}	
}); 

coins_schema.index({ "$**": 'text' }); 
trades_schema.index({ "$**": 'text' }); 

module.exports = mongoose.model('Coin', coins_schema); 
module.exports = mongoose.model('Trade', trades_schema); 
