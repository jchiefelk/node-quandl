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
	//
	// Stock Price Autocorrelation
	//
	this.data = {
		name: "Stockprice Autocorrelation",
		date: [],
		close: [],
		volume: []
	};
	//
	for(var x = obj.dataset.data.length-1; x >=0 ; x--){
		this.data.date.push(obj.dataset.data[x][0]);
		this.data.close.push(obj.dataset.data[x][4]); 
		if(obj.dataset.data[x][5]!=null){
			 this.data.volume.push(obj.dataset.data[x][5].toExponential(2));
		}
	};
	//
	return new Promise(function(resolve,reject){
			correlation(this.data, function(results) {
	              resolve(results); 
			});	
	});
};


Correlation.prototype.market_fund_autocorrelatation = function(correlate){
	// console.log(co);
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