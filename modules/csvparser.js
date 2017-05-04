'use strict';
var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');//
var nyse = [];

fs.createReadStream(__dirname+'/NYSE.csv')
		.pipe(parse({delimiter: ','}))
	   	.on('data', function(csvrow) {
	   		let company = {
				code: csvrow[0],
				name: csvrow[1],
				ticker: csvrow[2]
			};
	        nyse.push(company);      
	    })
		.on('end',function() {
		      //do something wiht csvData
		      console.log('End Fetching');
		      console.log(nyse);
		 });