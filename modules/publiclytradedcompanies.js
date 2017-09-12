'use strict';
let fs = require('fs');
let parse = require('csv-parse');
let async = require('async');
let Promise = require('bluebird');

function PubliclyTradedCompanies(){
	this.nysesource = __dirname + '/data/nyse.csv';
	this.nasdaqsource = __dirname +'/data/nasdaq.csv';

};

PubliclyTradedCompanies.prototype.symbolLookupNYSE = function(){

 let nyse =[];

  let promise = new Promise( function(resolve,reject){
		fs.createReadStream(__dirname + '/data/nyse.csv')
		.pipe(parse({delimiter: ','}))
		.on('data',function(csvrow){
			let company = {
				code: csvrow[0],
				name: csvrow[1],
				marketcap: csvrow[3]
			};
			nyse.push(company);
		})
		.on('end',function(){
			console.log('End Fetching');
			resolve(nyse);	
		});
  });
  return promise;
};

PubliclyTradedCompanies.prototype.symbolLookupNASDAQ = function(){

  let nasdaq =[];
  let promise = new Promise( function(resolve,reject){
		fs.createReadStream(__dirname + '/data/nasdaq.csv')
		.pipe(parse({delimiter: ','}))
		.on('data',function(csvrow){
			let company = {
				code: csvrow[0],
				name: csvrow[1],
				marketcap: csvrow[3]
			};
			nasdaq.push(company);
		})
		.on('end',function(){
			console.log('End Fetching');
			resolve(nasdaq);	
		});
  });
  return promise;

};

module.exports = new PubliclyTradedCompanies();