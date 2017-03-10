var Quandl = require('../modules/quandl');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
var router = express.Router();
//
// ETF
//
router.get('/etf', function(req,res){

        Quandl.getETFData()
            .then(function(value) {
                 res.json({etf: value});  
            })
            .catch(function(error){
            	console.log(error);
                res.json({error: error});
                next(error);
            });             
});


router.get('/markets', function(req,res){
	
	Quandl.getMarketData()
		   .then(function(value) {
                 res.json({market: value});  
            })
            .catch(function(error){
            	console.log(error);
                res.json({error: error});
                next(error);
            }); 



});



router.post('/general', function(req,res){



    Quandl.getIntraDayTicket(req.body)
           .then(function(value) {
                 res.json({general: value});  
            })
            .catch(function(error){
                console.log(error);
                res.json({error: error});
                next(error);
            }); 



});



module.exports = router;