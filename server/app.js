// server/app.js
var bodyParser = require('body-parser');
var Quandl = require('../modules/quandl');
var config = require('../modules/config');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = express();
let Correlation = require('../modules/correlation');
let _store;
let Promise = require('bluebird');
let marketData = null;
let etfData = null;
/**
  Quandl Calls that are made once per day
**/
function Interval(){
  this.etfData = null;
  this.marketData = null;
};
Interval.prototype.startInterval = function(){
    Quandl.getMarketData()
             .then(function(value) {
                      marketData = value;
                      return Quandl.getETFData();
                  })
                  .then(function(result) {
                        etfData = result;
                  })
                  .catch(function(error){
                      console.log(error);
                  });
};
let routine =  new Interval();
routine.startInterval();
setInterval( routine.startInterval, 86400000 );
//
// Required for POST Requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Set Port
app.set('port', (process.env.PORT || 3000));
// Static JavaScript Bundle
app.use(express.static(path.resolve(__dirname, '..', 'build')));
//
// Set RESTFUL Routes
//
var routes = require('./routes');
app.use('/', routes);

app.get('/etf', function(req,res){

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

app.get('/markets', function(req,res){
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

app.post('/api', function(req,res){
    let market, autocorr;
    Quandl.getIntraDayTicket(req.body)
           .then(function(value) {
                market = value;
                return Correlation.autocorrelation(value)
            })
           .then((result) => {
                res.json({
                  general: market,
                  autocorr: result
                });
                market = null;
            })
           .catch(function(error){
                console.log(error);
                res.json({error: error});
                next(error);
            }); 
});

app.get('/frontenddata',function(req,res){
    res.json({
      marketdata: marketData,
      etfdata: etfData
    });
});

// 
//
// Always return the main index.html, so react-router render the route in the client
//
// This is for proper refresh handling
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
//
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); 
});