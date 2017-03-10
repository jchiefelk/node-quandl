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


let _store;
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


app.post('/api', function(req,res){



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