var Quandl = require('../modules/quandl');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
var router = express.Router();
//
// ETF
//
router.get('/etf', function(req,res){
        console.log('Quandl ETF Time'); 
        Quandl.getETFData()
            .then(function(value) {
                 res.json(value);  
            })
            .catch(function(error){
            	console.log(error);
                res.json({error: error});
                next(error);
            });             
});


router.get('/markets', function(req,res){
	console.log('Quandl Market Time');
	Quandl.getMarketData()
		   .then(function(value) {
                 res.json(value);  
            })
            .catch(function(error){
            	console.log(error);
                res.json({error: error});
                next(error);
            }); 



});

module.exports = router;