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
          //  console.log(data);

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
       // console.log(data);
    })
    .catch(function(error){
        console.log(error);
    });

};
//
// averages of major indexes 
//
var makeGeneralRequest = function() {

       fetch('/api', {
            method: 'post',
            headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(_store)
          }).then(function(response) {
            if(response.status!=undefined){
              Actions.setStatus(response.status);
            }
            return response.json();
          }).then(function(data) {
             // console.log(data);
             Actions.updateIntradDayData(data.general);
             Actions.updateAutocorrelation(data.autocorr);
          }).catch(function(error) {
              console.log(error);
          }); 
};




var getFrontEndData = function(){

  fetch('/frontenddata', {
        method: 'get',
        accept: 'application/json'
  })
  .then((response)=> {
    return response.json();
  })
  .then((data) =>{

      Actions.updateFrontEndData(data);
  })
  .catch((error)=>{
      console.log(error);
  });
};

var Actions = {

  getDailyFrontEndData: function(){
      getFrontEndData();
  },

  updateFrontEndData: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.UPDATE_FRONTEND_DATA,
      data: item
    });

  },

  makeFrontEndRequest: function(item){
      _store = item;
     //  makeETFRequest();
      // makeMarketRequest();
      makeGeneralRequest();
  },

  updateAutocorrelation: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.AUTOCORRELATION_INTRADAY,
      data: item
    });
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


  setStartDate: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.STARTDATE,
      data: item

    });

  },

  setEndDate: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.ENDDATE,
      data: item
    });

  },

  updatesendRequest: function(item){

    AppDispatcher.handleAction({
      actionType: appConstants.SEND_REQUEST,  
      data: event
    });

  },

  updateCompanyCode: function(item) {
      AppDispatcher.handleAction({
          actionType: appConstants.COMPANY_CODE,
          data: item
      });
  }

};
module.exports = Actions;