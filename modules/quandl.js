'use strict';
let Promise = require('bluebird');
let api_key = 'oaWPkjrfz_aQmyPmE-WT';
let Correlation = require('./correlation');
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
		let data =[]; 
		let correlate=[];
		let results={
			data: [],
			correlation: []
		};
		return this.ETFrecursion()
			.then( ( responseJson ) => {
					 	this.quandlETFResults.push(responseJson);
					 	if(this.etfiterator < this.etfpromiseArray.length){  
					 		return this.fetchETFData();
					 	} else {
					 	
					 		return this.quandlETFResults;
					 	}
			})
			.then(function(value) {
                    for(var x=0;x <365;x++) {
                          results.data.push({
                                name: value[0].dataset.name,
                                date: value[0].dataset.data[x][0],
                                open: value[0].dataset.data[x][1],
                                high: value[0].dataset.data[x][2],
                                low:  value[0].dataset.data[x][3],
                                close: value[0].dataset.data[x][4],
                                volume: value[0].dataset.data[x][5]
                          });
                    };
                    for(var x = 0; x < value[0].dataset.data.length ; x++){
                            correlate.push(value[0].dataset.data[x][1]);
                    };
                     return Correlation.market_fund_autocorrelatation(correlate);    
            })
			.then((result)=>{
				results.correlation = result;
				return results;
			});
};
Quandl.prototype.getETFData = function(params){
	this.etfiterator = 0;
	this.etfpromiseArray = [];
	this.quandlETFResults = [];
	let url;
	var startDate, endDate;
	startDate =  moment(new Date().setFullYear(2016)).format('YYYY-MM-DD'),
	endDate =  moment().format('YYYY-MM-DD');

	for(var k in ETF){
					// url = quandl_url+ETF[k].db+'/'+ETF[k].market+'_'+ETF[k].code+'.json?start_date='+startDate+'&end_date='+endDate+'&api_key='+api_key;
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
		let data =[]; 
		let correlate=[];
		let results={
			data: [],
			correlation: []
		};
		return this.Marketrecursion()
			.then( ( responseJson ) => {
						
					   	this.quandlMarketResults.push(responseJson);
					 	if(this.marketiterator < this.marketpromiseArray.length){  
					 		return this.fetchMarketData();
					 	} else {
					
					 		return this.quandlMarketResults;
					 	}
			})
			.then(function(value) {
                      for(var x=0;x <365;x++) {
                  
                          results.data.push({
                              name:  value[0].dataset.name,
                              date:  value[0].dataset.data[x][0],
                              value:  value[0].dataset.data[x][1]
                          });
                      };

                      for(var x = 0; x < value[0].dataset.data.length ; x++){
                            correlate.push(value[0].dataset.data[x][1]);
                      };

                      return Correlation.market_fund_autocorrelatation(correlate);    
            })
			.then((result)=>{
				results.correlation = result;
				return results;
			});  	
};
Quandl.prototype.getMarketData = function(){
	this.quandlMarketResults = [];
	this.marketiterator = 0;
	this.marketpromiseArray = [];
	this.quandlMarketResults = [];
	let date = new Date();
	let url,
	promise = null;
	var startDate, endDate;
	startDate =  moment(new Date().setFullYear(2016)).format('YYYY-MM-DD'),
	endDate =  moment().format('YYYY-MM-DD');
	for(var k in Market){
		// url = quandl_url+Market[k].db+'/'+Market[k].market+'_'+Market[k].code+'.json?start_date='+startDate+'&end_date='+endDate+'&api_key='+api_key;
		url = quandl_url+Market[k].db+'/'+Market[k].market+'_'+Market[k].code+'.json?api_key='+api_key;
		this.marketpromiseArray.push(url);
	};
	return this.fetchMarketData()
		.then(function(res) {
  			return res;
	});
};
Quandl.prototype.getIntraDayTicket = function(params){
	let timeSteps=null;
	let timeSeries =  'TIME_SERIES_WEEKLY';
	let url; 
	if(params.daterange){
		if(params.daterange=='intraday') timeSeries = 'TIME_SERIES_INTRADAY';
		if(params.daterange=='daily') timeSeries = 'TIME_SERIES_DAILY';
		if(params.daterange=='weekly') timeSeries = 'TIME_SERIES_WEEKLY';
		if(params.daterange=='monthly') timeSeries = 'TIME_SERIES_MONTHLY';
	}

	if(params.timeSteps){
                  if(params.timeSteps=='1min') timeSteps = 'Time Series (1min)';
                  if(params.timeSteps=='5min') timeSteps = 'Time Series (5min)';
                  if(params.timeSteps=='15min') timeSteps = 'Time Series (15min)';
                  if(params.timeSteps=='30min') timeSteps = 'Time Series (30min)';
                  if(params.timeSteps=='60min') timeSteps = 'Time Series (60min)';
     }
     if(params.timeSteps!=null){
     	 url = 'https://www.alphavantage.co/query?function='+timeSeries+'&symbol='+params.code+'&interval='+params.timeSteps+'&outputsize=full&apikey=JKH0X5U5HVN4DD1Y';
     } else {
     	url = 'https://www.alphavantage.co/query?function='+timeSeries+'&symbol='+params.code+'&apikey=JKH0X5U5HVN4DD1Y';
     }

     console.log(url);

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