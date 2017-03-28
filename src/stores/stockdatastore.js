'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';
var moment = require('moment');

function DailyData(){
      this.etfdata = null;
      this.marketdata = null;
};

let FrontEndData = new DailyData();

function StockData(){
    this.IntraDay = {
        name: null,
        data: [],
        market: null,
        startDate: null,
        endDate: null,
        companyCode: null,
        sendRequestStatus: false, 
        autocorr: []
    };
};

StockData.prototype.updateIntradayTicket = function(item){
  console.log('Update Intraday');
 // console.log(item);
  this.IntraDay.data=[];
  this.IntraDay.name = item.dataset.name;
  for(var x = item.dataset.data.length-1; x >=0 ; x--){
        let data = {
          date: item.dataset.data[x][0],
          close: item.dataset.data[x][4],
          volume: null
        }; 
        if(item.dataset.data[x][5]!=null){
          data.volume = item.dataset.data[x][5].toExponential(2);
        } 

        this.IntraDay.data.push(data);
  };
  StockDataStore.emit(CHANGE_EVENT);
};


StockData.prototype.updateMarket = function(item){
  this.IntraDay.market = item;
};


StockData.prototype.updateStartDate = function(item){
  this.IntraDay.startDate = item;
};


StockData.prototype.updateEndDate = function(item){
  this.IntraDay.endDate = item;
};


StockData.prototype.updateCompanyCode = function(item) {
  this.IntraDay.companyCode = item;
};

var Stocks = new StockData();

var StockDataStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  getInradayTicketData: function() {
    return Stocks.IntraDay;
  },
  getMarket: function(){
    return Stocks.IntraDay.market;
  },
  getStartDate: function(){
    return Stocks.IntraDay.startDate;
  },
  getEndDate: function(){
    return Stocks.IntraDay.endDate;
  },
  getCompanyCode: function(){
    return Stocks.IntraDay.companyCode;
  },
  getRequestSendStatus: function(){
    return Stocks.IntraDay.sendRequestStatus;
  },
  getIntraDayAutocorrelation: function(){
    return Stocks.IntraDay.autocorr;
  },
  getDailyETFData: function(){
    return FrontEndData.etfdata;
  },
  getDailyMarketData: function(){
    return FrontEndData.marketdata;
  }


});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.UPDATE_FRONTEND_DATA:
      FrontEndData.etfdata = action.data.etfdata;
      FrontEndData.marketdata = action.data.marketdata;
      StockDataStore.emitChange(CHANGE_EVENT);
      break;
    case appConstants.MARKET:
      Stocks.updateMarket(action.data);
      StockDataStore.emitChange(CHANGE_EVENT);
      break;
    case appConstants.INTRADAYTICKET:
      Stocks.updateIntradayTicket(action.data);
      break;
    case appConstants.STARTDATE:
      Stocks.updateStartDate(action.data);
      StockDataStore.emitChange(CHANGE_EVENT);
      break;
    case appConstants.ENDDATE:
      Stocks.updateEndDate(action.data);
      StockDataStore.emitChange(CHANGE_EVENT);
      break;
    case appConstants.COMPANY_CODE: 
      Stocks.updateCompanyCode(action.data);
      StockDataStore.emitChange(CHANGE_EVENT);
      break;
    case appConstants.SEND_REQUEST:
      if(Stocks.IntraDay.sendRequestStatus==false){
          Stocks.IntraDay.sendRequestStatus = true;
      } else {
          Stocks.IntraDay.sendRequestStatus = false;
      }
      StockDataStore.emitChange(CHANGE_EVENT);
      break;
    case appConstants.AUTOCORRELATION_INTRADAY:
        console.log(action.data);
        Stocks.IntraDay.autocorr = [];
        Stocks.IntraDay.autocorr = action.data;
        StockDataStore.emitChange(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});
module.exports = StockDataStore;
