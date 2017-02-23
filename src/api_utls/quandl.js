'use strict';
let Promise = require('bluebird');
let config = require('./config');
let api_key = config.key;
let quandl_url = 'https://www.quandl.com/api/v3/datasets/';
// let quandl_url = 'https://www.quandl.com/api/v3/datasets/XNYS/ETP_UADJ.json?api_key='+api_key;
let Actions = require('../actions/actions');

function Quandl(){
		this.date = 0;
};

Quandl.prototype.getIntraDayTicket = function(params){
	console.log('Grab Intradayticket');
	console.log(params);
	let url;

	if( params.startDate==null || params.endDate==null) {
		url = quandl_url+params.db+'/'+params.market+'_'+params.code+'.json?api_key='+params.apiKey;
	} else {
		url = quandl_url+params.db+'/'+params.market+'_'+params.code+'.json?start_date='+params.startDate+'&end_date='+params.endDate+'&api_key='+params.apiKey;
	}


	console.log(url);

	return fetch(url, {
			  method: 'GET',
			  mode: 'cors',
			})
			.then((response) => typeof response == 'object' ? response.json() : {} )
			.then( ( responseJson ) => {
				  Actions.saveIntradDayData(responseJson); 	
			})
			.catch( ( error ) => {
				  console.log(error);
			});
};

module.exports = new Quandl();