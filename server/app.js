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
let etf=[];
let market=[];
let etf_autocorrelation=[];
let market_autocorrelation=[];
/**
  Quandl Calls that are made once per day
**/
function Interval(){
  this.etfData = null;
  this.marketData = null;
  this.etf=[];
  this.market=[];
};
Interval.prototype.startInterval = function(){
    Quandl.getMarketData()
             .then(function(value) {
                   //  console.log(value);
                    marketData =  value.data;
                    market_autocorrelation = value.correlation;
                    // return Quandl.getETFData();
                  })
                  .catch(function(error){
                      console.log(error);
                  });
                  /**
                  .then((result) => {
                      etfData = result.data;
                      etf_autocorrelation = result.correlation;
                  })
                  .catch(function(error){
                      console.log(error);
                  });
                  **/

};
let routine =  new Interval();
routine.startInterval();
// setInterval( routine.startInterval, 86400000 );
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
    console.log(req.body);

    Quandl.getIntraDayTicket(req.body)
           .then(function(value) { 
                market = value;
                let request = req.body;
                request.startDate = 'start';
                request.endDate = 'end';
                // 
                // return Quandl.getIntraDayTicket(request) // Get ALL Historicall Data for Autocorrelation
                // console.log(value['Time Series (1min)']);
                // console.log(value['Monthly Time Series']);
                let timeSeries = 'Weekly Time Series';
                if(req.body.daterange){

                  if(req.body.daterange=='intraday' && req.body.timeSteps=='1min') timeSeries = 'Time Series (1min)';
                  if(req.body.daterange=='intraday' && req.body.timeSteps=='5min') timeSeries = 'Time Series (5min)';
                  if(req.body.daterange=='intraday' && req.body.timeSteps=='15min') timeSeries = 'Time Series (15min)';
                  if(req.body.daterange=='intraday' && req.body.timeSteps=='30min') timeSeries = 'Time Series (30min)';
                  if(req.body.daterange=='intraday' && req.body.timeSteps=='60min') timeSeries = 'Time Series (60min)';

                  if(req.body.daterange=='daily') timeSeries = 'Time Series (Daily)';
                  if(req.body.daterange=='weekly') timeSeries = 'Weekly Time Series';
                  if(req.body.daterange=='monthly') timeSeries = 'Monthly Time Series';

                }
                return Correlation.stockprice_autocorrelation(value[timeSeries]);
            })
           .then((result) => {

                autocorr=result;
                res.json({
                    general: market,
                    autocorr: autocorr
                });
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
      etfdata: etfData,
      etf_autocorrelation: etf_autocorrelation,
      market_autocorrelation: market_autocorrelation
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