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
      this.etf=null;
      this.market=null;

};


DailyData.prototype.D3Graphs = function(item){
    
      //
      // Put in D3.js format
      //
      this.etf={
        points: [],
        xValues: [],
        yValues: [],
        yMin: 0,
        yMax: null,
        autocorrelation: {
            points: [],
            xValues: [],
            yValues: [],
            yMin: 0,
            yMax: null,
        },
        open: [],
        high: [],
        low:  []
      };

      this.market={
        xValues: [], // dates
        yValues: [],
        yMin: 0,
        yMax: null,
        autocorrelation: {
            xValues: [], // lag times in business days
            yValues: [],
            yMin: 0,
            yMax: null,
        }
      };
      // autocorrelation graphs
      for(var x =0;x<item.etf_autocorrelation.length; x++){
          this.etf.autocorrelation.xValues.push(x); 
          this.etf.autocorrelation.yValues.push(item.etf_autocorrelation[x]); 
      };
      this.etf.autocorrelation.yMax = Math.max.apply(null, this.etf.autocorrelation.yValues); 
      
      for(var x =0;x<item.market_autocorrelation.length; x++){
          this.market.autocorrelation.xValues.push(x); 
          this.market.autocorrelation.yValues.push(item.market_autocorrelation[x]); 
      };
      this.market.autocorrelation.yMax = Math.max.apply(null, this.market.autocorrelation.yValues); 
   
      // market/etf graphs
      for(var x = 0; x < item.etfdata.length; x++){
          this.etf.xValues.push(item.etfdata[x].date); 
          this.etf.yValues.push(item.etfdata[x].close); 
          this.etf.open.push(item.etfdata[x].open),
          this.etf.high.push(item.etfdata[x].high),
          this.etf.low.push(item.etfdata[x].low)
      };
      this.etf.yMax = Math.max.apply(null, this.etf.yValues); 
      this.etf['name'] = item.etfdata[0].name;
      //
      //

      for(var x = 0; x < item.marketdata.length; x++){
          this.market.xValues.push(item.etfdata[x].date); 
          this.market.yValues.push(item.marketdata[x].value); 
      };
      this.market.yMax = Math.max.apply(null, this.market.yValues); 
      this.market['name'] = item.marketdata[0].name;
      this.marketdata=null;
      this.etfdata = null;
      StockDataStore.emit(CHANGE_EVENT);

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
          open: item.dataset.data[x][1],
          high: item.dataset.data[x][2],
          low:  item.dataset.data[x][3],
          close: item.dataset.data[x][4],
          volume: null,
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
    return FrontEndData.etf;
  },
  getDailyMarketData: function(){
    return FrontEndData.market;
  }

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.UPDATE_FRONTEND_DATA:
      FrontEndData.etfdata = action.data.etfdata;
      FrontEndData.marketdata = action.data.marketdata;
      FrontEndData.D3Graphs(action.data);
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
      Stocks.IntraDay.sendRequestStatus = !Stocks.IntraDay.sendRequestStatus;
      if(Stocks.IntraDay.sendRequestStatus==true){
        Stocks.IntraDay.data=[];
        Stocks.IntraDay.name=null;
      }
      StockDataStore.emitChange(CHANGE_EVENT);
      break;
    case appConstants.AUTOCORRELATION_INTRADAY:
        Stocks.IntraDay.autocorr = [];
        Stocks.IntraDay.autocorr = action.data;
        StockDataStore.emitChange(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});
module.exports = StockDataStore;
