var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var _ = require( 'lodash' );
var _store = null;


var makeETFRequest = function() {
   
     fetch('http://localhost:3000/etf', {
          method: 'get',
          accept: 'application/json',
          
        }).then(function(response) {
          if(response.status!=undefined){
              Actions.setStatus(response.status);
          }
          return response.json();
        }).then(function(data) {
            console.log(data);

        }).catch(function(error) {
          console.log(error);
        }); 
};


var makeMarketRequest = function() {

    fetch('http://localhost:3000/markets',{
        method: 'get',
        accept: 'application/json', 
    })
    .then(function(response){
          if(response.status!=undefined){
              Actions.setStatus(response.status);
          }
          return response.json();
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(error){
        console.log(error);
    });

};



var Actions = {

  makeFrontEndRequest: function(item){
      _store = item;
     //  makeETFRequest();
      // makeMarketRequest();
  },

  updateMarket: function(item){
    
    AppDispatcher.handleAction({
      actionType: appConstants.MARKET,
      data: item
    });
  },

  updateIntradDayData: function(item){
    // console.log(item)
    AppDispatcher.handleAction({
      actionType: appConstants.INTRADAYTICKET,
      data: item
    });

  },

  setStatus: function(item) {
    AppDispatcher.handleAction({
      actionType: appConstants.HTTPSTATUS,
      data: item 
    });
  },

  SaveClick: function(event){

    AppDispatcher.handleAction({
      actionType: appConstants.SAVE_CLICKED,	
      data: event
    });
  },

};
module.exports = Actions;