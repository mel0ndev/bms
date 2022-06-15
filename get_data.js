const socket = require('ws'); 
const axios = require('axios'); 

const ws = new socket('wss://ftx.com/ws/'); 
const endpoint = "https://ftx.com/api"; 

let shitcoins = []; 

const main = async () => {
	ws.on('open', () => {
		console.log("Connection established"); 
		
		for (i = 0; i < shitcoins.length; i ++) {
			ws.send(JSON.stringify({op: 'subscribe', channel: 'trades', market: shitcoins[i].name})); 
		}
			ws.on('message', function message(data) {
				console.log('new trade %s', data); 
			});
	}); 
}


async function get_data() {
	shitcoins = []; 
	await axios.get("https://ftx.com/api/futures").then((res) => {
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
		console.log('coins in descending order of volume: \n')
		console.table(shitcoins);
	});

	return shitcoins; 
}

function filter_trades() {
	//filter websocket data here however we wanna do that
}

module.exports = { get_data, main }; 
