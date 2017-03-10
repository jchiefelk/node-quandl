'use strict';
let Promise = require('bluebird');
let api_key = 'hp2sm_6zVAoffDrYgzBi';
let quandl_url = 'https://www.quandl.com/api/v3/datasets/';
let ETF = require('./data/etf');
let Market = require('./data/markets');
var moment = require('moment');
var fetch = require('node-fetch');

function Quandl() {
		// ETF Stuffs
		this.quandlETFResults = [];
		this.etfiterator = 0;
		this.etfpromiseArray = [];
		this.quandlETFResults = [];
		// Market Stuffs
		this.quandlMarketResults = [];
		this.marketiterator = 0;
		this.marketpromiseArray = [];
		this.quandlMarketResults = [];
};


Quandl.prototype.ETFrecursion = function(){
		let url = this.etfpromiseArray[this.etfiterator];
		this.etfiterator+=1;
		return fetch(url, {
					method: 'GET',
					mode: 'cors',
				})
				.then((response) => typeof response== 'object' ? response.json() : {} )		
};
	

Quandl.prototype.fetchETFData = function(){

		return this.ETFrecursion()
			.then( ( responseJson ) => {
						
					   	this.quandlETFResults.push(responseJson);
					 	if(this.etfiterator < this.etfpromiseArray.length){  
					 		return this.fetchETFData();
					 	} else {
					 	
					 		return this.quandlETFResults;
					 	}
			});
};


Quandl.prototype.getETFData = function(params){
	this.etfiterator = 0;
	this.etfpromiseArray = [];
	this.quandlETFResults = [];
	let date = new Date();
	let url,
	startDate =  moment(new Date()).format('YYYY-MM-DD'),
	endDate =  moment().format('YYYY-MM-DD');
	for(var k in ETF){
					url = quandl_url+ETF[k].db+'/'+ETF[k].market+'_'+ETF[k].code+'.json?api_key='+api_key;
					this.etfpromiseArray.push(url);
	};
	return this.fetchETFData()
			.then(function(res) {
	  			return res;
			});

};


Quandl.prototype.Marketrecursion = function(){
		let url = this.marketpromiseArray[this.marketiterator];
		this.marketiterator+=1;
		return fetch(url, {
					method: 'GET',
					mode: 'cors',
				})
				.then((response) => typeof response== 'object' ? response.json() : {} )		
};
	

Quandl.prototype.fetchMarketData = function(){

		return this.Marketrecursion()
			.then( ( responseJson ) => {
						
					   	this.quandlMarketResults.push(responseJson);
					 	if(this.marketiterator < this.marketpromiseArray.length){  
					 		return this.fetchMarketData();
					 	} else {
					
					 		return this.quandlMarketResults;
					 	}
			});
};


Quandl.prototype.getMarketData = function(item){
	this.quandlMarketResults = [];
	this.marketiterator = 0;
	this.marketpromiseArray = [];
	this.quandlMarketResults = [];
	let date = new Date();
	let url,
	promise = null,
	startDate =  moment(new Date()).format('YYYY-MM-DD'),
	endDate =  moment().format('YYYY-MM-DD');
	for(var k in Market){
					url = quandl_url+Market[k].db+'/'+Market[k].market+'_'+Market[k].code+'.json?api_key='+api_key;
					this.marketpromiseArray.push(url);
	};

	return this.fetchMarketData()
		.then(function(res) {
  			return res;
		});
};


Quandl.prototype.getIntraDayTicket = function(params){


	let url;
	if( params.startDate==null || params.endDate==null) {
		url = quandl_url+params.db+'/'+params.market+'_'+params.code+'.json?api_key='+params.apiKey;
	} else {
		url = quandl_url+params.db+'/'+params.market+'_'+params.code+'.json?start_date='+params.startDate+'&end_date='+params.endDate+'&api_key='+params.apiKey;
	}

	return fetch(url, {
			  method: 'GET',
			  mode: 'cors',
			})
			.then((response) => typeof response == 'object' ? response.json() : {} )
			.then( ( responseJson ) => {
				   	return responseJson;
			})
};

module.exports = new Quandl();