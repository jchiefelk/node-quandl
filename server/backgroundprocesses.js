var Quandl = require('../modules/quandl');
let PubliclyTradedCompanies = require('../modules/publiclytradedcompanies');
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

module.exports = new BackgroundProcesses();