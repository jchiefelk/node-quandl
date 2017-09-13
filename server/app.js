// server/app.js
var bodyParser = require('body-parser');
var Quandl = require('../modules/quandl');
var config = require('../modules/config');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const http = require('http');
const https = require('https');
const app = express();
let Correlation = require('../modules/correlation');
let PubliclyTradedCompanies = require('../modules/publiclytradedcompanies');
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
function BackgroundProcesses(){
  this.etfData = null;
  this.marketData = null;
  this.etf=[];
  this.market=[];
  this.stocklistings = [];
};
BackgroundProcesses.prototype.startInterval = function(){
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

BackgroundProcesses.prototype.getNYSEListings = function(){
   
    return PubliclyTradedCompanies.symbolLookupNYSE()
          .then( ( data ) => {
              for(let x=1;x<data.length;x++){
                 let stocklisting = {};
                 stocklisting[data[x].code] = data[x].name;
                 this.stocklistings.push(stocklisting); 
              };
               
              return this.stocklistings;
          })
          .catch((err) => {
            console.log(err);   
          });

};

BackgroundProcesses.prototype.getNASDAQListings = function(){

    return PubliclyTradedCompanies.symbolLookupNASDAQ()
          .then( ( data ) => {
              for(let x=1;x<data.length;x++){
                let stocklisting = {};
                 stocklisting[data[x].code] = data[x].name;
                 this.stocklistings.push(stocklisting); 
              };
              return this.stocklistings; 
          })
          .catch((err) => {
            console.log(err);   
          });

};
let routine = new BackgroundProcesses();
routine.getNYSEListings()
.then(function(value){
      // console.log(value);
  return routine.getNASDAQListings();
})
.then(function(value){
  // console.log(routine.stocklistings);
});
//
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


app.post('/bitcoin', function(req,res){

  let url = 'https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period='+req.body.daterange+'&?format=json';
   return fetch(url, {
            method: 'get',
            mode: 'cors'
      })
      .then((response) => console.log(response) )
      /**
       .then((response) => typeof response == 'object' ? response.json() : {} )
      .then( ( responseJson ) => {
            res.json({
              data: responseJson
            });
      })
      .catch((err) => {
            console.log(err);
            res.json({
              error: err
            });

      });
      ***/
});

app.post('/stocklisting', function(req, res){


        let stocklisting=[];
        let code = req.body.companycode.split('');


        for(let x=0; x<routine.stocklistings.length; x++){
            let index=0;
            for(let key in routine.stocklistings[x]){
                let stockcode = routine.stocklistings[x][key]; 
                let autocomplete = function(){
                  if(code[index]!=undefined && stockcode[index]==code[index].toUpperCase() && index < code.length-1){
                      let data = {
                        companycode: key,
                        name: routine.stocklistings[x][key]
                      };
                      stocklisting.push(data);
                      index+=1;
                      autocomplete();
                  }
                };
                autocomplete();
            };

        };
        res.json({
          stocklisting: stocklisting
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