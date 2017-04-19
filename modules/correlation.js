let Promise = require('bluebird');

const correlation = require('../build/Release/correlation');

function Correlation(){
	this.data = [];
}; 


Correlation.prototype.stockprice_autocorrelation = function(obj) {
	//
	// Stock Price Autocorrelation
	//
	this.data = [];
	for(var x = obj.dataset.data.length-1; x >=0 ; x--){
			        let data = {
			          date: obj.dataset.data[x][0],
			          close: obj.dataset.data[x][4],
			          volume: null
			        }; 
			        if(obj.dataset.data[x][5]!=null){
			          	data.volume = obj.dataset.data[x][5].toExponential(2);
			        } 
			        this.data.push(obj.dataset.data[x][4]);
	};
	let data = this.data;
	return new Promise(function(resolve,reject){
			correlation(data, function(results) {
	              resolve(results); 
			});	
	});

};


Correlation.prototype.market_fund_autocorrelatation = function(correlate){

	return new Promise(function(resolve,reject){
			correlation(correlate,function(results){
					resolve(results);
			});

	});

};
module.exports = new Correlation();