let Promise = require('bluebird');
const correlation = require('../build/Release/correlation');
const autocorrelation = require('../build/Release/autocorrelation');

function Correlation(){
	this.data = {
		date: null,
		close: null,
		volume: null
	};
}; 

Correlation.prototype.stockprice_autocorrelation = function(obj) {
	/***
		Return Structure
		{ '1. open': '71.5850',
	     '2. high': '71.6100',
	     '3. low': '71.5600',
	     '4. close': '71.5600',
	     '5. volume': '117761' 
	     }
	***/
	//
	// Stock Price Autocorrelation
	//
	this.data = {
		name: "Stockprice Autocorrelation",
		date: [],
		close: [],
		volume: []
	};
	for(let key in obj){
		this.data.date.push(key);
		this.data.close.push(obj[key]['4. close']); 		
		this.data.volume.push(obj[key]['5. volume']);
	};
	var object = {
		'close': this.data.close
	};
	return new Promise(function(resolve,reject){
			autocorrelation(object, function(results) {
	              resolve(results); 
			});	
	});
};


Correlation.prototype.bitcoin_autocorrelation = function(obj){

	this.data={
		close: []
	};

	for(let key in obj){
		this.data.close.push(obj[key].average);
	};

	let object = {	
		'close': this.data.close
	};
	//console.log(this.data.close.length);
	return new Promise(function(resolve,reject){
		autocorrelation(object,function(results){
			resolve(results);
		});
	});
};

Correlation.prototype.market_fund_autocorrelatation = function(correlate){
	
	this.data = {
		name: "Stockprice Autocorrelation",
		date: [],
		close: correlate,
		volume: []
	};
	return new Promise(function(resolve,reject){
			let obj = {
				'close': correlate,
				'high': []	
			};
			autocorrelation(obj, function(results){
				resolve(results);
			});

	});
};

module.exports = new Correlation();