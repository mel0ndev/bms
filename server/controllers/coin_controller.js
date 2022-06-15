require('../models/db.js'); 
const data = require('../../get_data.js').get_data; 
const wb = require('../../get_data.js').main; 
const Coin = require('../models/coins.js').Coin;
const Trade = require('../models/coins.js').Trade; 

//database functions
exports.list_coins = async(req, res) => {
	try{
		const coins = await Coin.find({}); 
		res.json(coins); 
	} catch(error) {
		console.log(error); 
	}
}

//trade data gathering
async function get_coin_data() {
	try {
		let coins = await data(); 
		for (i = 0; i < coins.length; i++) {
			let new_coin_data = new Coin({
					name: coins[i].name,
					volume: coins[i].volume,
					open_interest: coins[i].oi
			});
			await new_coin_data.save(); 
		}
	} catch(error) {
		console.log(error); 
	}
	
}; 

async function web_socket() {

	try {
		let socket_data = await wb(); 
		
	} catch(error) {
		console.error(error); 
	}

}; 

//call data gathering functions here
//first we fill array
//then we subscribe to sockets
//then we ping the api every 15 seconds to get volume and oi, which are not websocket requests
get_coin_data(); 
web_socket(); 

setInterval(() => {
	get_coin_data(); 
	console.log("data entered"); 
}, 15000); 



