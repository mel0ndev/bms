const socket = require('ws'); 
const axios = require('axios'); 

const ws = new socket('wss://ftx.com/ws/'); 
const endpoint = "https://ftx.com/api"; 

let shitcoins = []; 
var trades; 



//websocket handling
//while socket is open, we must ping for oi every minute
const main = async () => {
	ws.on('open', () => {
	console.log("Connection established"); 

	for (i = 0; i < shitcoins.length; i ++) {
		ws.send(JSON.stringify({op: 'subscribe', channel: 'trades', market: shitcoins[i].name})); 
	}
		ws.on('message', function message(data) {
			console.log('%s', data); 
		});
}); 

}


async function get_data() {
	await axios.get("https://ftx.com/api/futures").then((res) => {
		shitcoins = []; 
		for (i = 0; i < res.data.result.length; i++) {
			if (res.data.result[i].name.includes('PERP') &&
				Number(res.data.result[i].volumeUsd24h) > 10000000){
				shitcoins.push({
					name: res.data.result[i].name,
					volume: res.data.result[i].volumeUsd24h, 
					oi: res.data.result[i].openInterestUsd
				});
			}
		}
		
		shitcoins.sort(function(a,b){return b.volume - a.volume}); 
		console.log("coins inserted"); 
		return shitcoins; 
	});
}

function filter_coins() {
	//filter websocket coins here	
}


module.exports = { get_data, main }; 

