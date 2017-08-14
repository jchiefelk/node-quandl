let Actions = require('../actions/actions');

function API() {
	this.value = null;	
};

API.prototype.getStockPrice = function(params){


    return   fetch('/api', {
            method: 'post',
            headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
          }).then(function(response) {
            if(response.status!=undefined){
              Actions.setStatus(response.status);
            }
            return response.json();
          }).then(function(data) {

             Actions.updateIntradDayData(data.general);
             Actions.updateAutocorrelation(data.autocorr);
          }).catch(function(error) {
              console.log(error);
          }); 
};
API.prototype.getBitcoinData = function(){
  return fetch('https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=daily&?format=json', {
        method: 'GET',
        mode: 'cors',
      })
      .then(function(response) {
            if(response.status!=undefined){
              Actions.setStatus(response.status);
            }
            return response.json();
          }).then(function(data) {
              Actions.updateBitcoinData(data);
          }).catch(function(error) {
              console.log(error);
          }); 
};
module.exports = new API();