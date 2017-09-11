'use strict';
let fs = require('fs');
let parse = require('csv-parse');
let async = require('async');

function PubliclyTradedCompanies(){
	this.nysesource = __dirname + '/data/nyse.csv';
	this.nasdaqsource = __dirname +'/data/nasdaq.csv';

};

PubliclyTradedCompanies.prototype.symbolLookupNYSE = function(){

	let nyse =[];

	return fs.createReadStream(this.nysesource)
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
			console.log(nyse);
		});
};

PubliclyTradedCompanies.prototype.symbolLookupNASDAQ = function(){

	return	fs.createReadStream(this.nasdaqsource)
		.pipe(parse({delimiter: ','}))
		.on('data',function(csvrow){
			let company = {
				code: csvrow[0],
				name: csvrow[1],
				marketcap: csvrow[3]
			};

		})
		.on('end',function(){
			console.log('End Fetching');

		});
};

module.exports = new PubliclyTradedCompanies();