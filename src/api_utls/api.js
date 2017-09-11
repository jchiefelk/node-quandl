let Actions = require('../actions/actions');
function API() {
	this.value = null;	
};
API.prototype.getStockPrice = function(params){
    console.log(params);
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

API.prototype.getBitcoinData = function(daterange){
   
   let data={
      daterange: daterange
   };
   //  
   return fetch('/bitcoin', {
            method: 'post',
            headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
      })
      .then(function(response) {
            if(response.status!=undefined){
              Actions.setStatus(response.status);
            }
            return response.json();
          })
         .then(function(data) {
              Actions.updateBitcoinData(data.data);
          }).catch(function(error) {
              console.log(error);
          }); 

};

API.prototype.getStockistings = function(){


    return fetch('/stocklisting',{
              method: 'get'
          })
          .then((response) => {return response.json() })
          .then((data) => {console.log(data)})

};

module.exports = new API();