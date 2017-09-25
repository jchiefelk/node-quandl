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
var morgan = require('morgan');
//
// Server-side analysis sccchtuff
//
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
var BackgroundProcesses = require('./backgroundprocesses');
BackgroundProcesses.getNYSEListings()
.then(function(value){
  return BackgroundProcesses.getNASDAQListings();
})
.then(function(value){
  // console.log(routine.stocklistings);
});
//
//
// Required for POST Requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Set Port
app.set('port', (process.env.PORT || 3000));
//
app.use(morgan('dev'));
//
// Set RESTFUL Routes
//
var routes = require('./routes');
app.use('/api', routes);
// secret variable
// app.set('superSecret', config.secret); 
// Static JavaScript Bundle
app.use(express.static(path.resolve(__dirname, '..', 'build')));
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
app.post('/stockapi', function(req,res){
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