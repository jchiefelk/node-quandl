'use strict';
import React, {Component} from 'react';
import Marketdata from '../components/marketdata';
var StockDataStore = require('../../stores/stockdatastore');
let API = require('../../api_utls/api');
var Actions = require('../../actions/actions');
var MarketGraph = require('../jsx/marketgraph');
var CandleStickGraph = require('../jsx/candlestickplot');
var Autocorrelation = require('../jsx/autocorrelationgraph');
require('../css/main.css');


export default class BitcoinView extends Component {
			constructor(){
				super();
				this.state = {
					dailyetfData: {
				        points: [],
				        xValues: [],
				        yMin: 0,
				        yMax: 0
				    },
					dailymarketData: {
				        points: [],
				        xValues: [],
				        yMin: 0,
				        yMax: 0
				    },
					marketGraph: null,
					etfGraph: null,
					storeupdated: false,
					etfAutocorrelation: null,
					marketAutocorrelation: null,
					sendRequestStatus: false,
					etfCandleStick: null,
					viewMode: 'markets',
					bitcoinData: null,
					daterange: 'daily',
					bitcoinHistoryOptions:	StockDataStore.getBitcoinHistoryOption(),
					cryptoexchangedata: null,
					currencyexchangedata: null
				};
			}

			componentDidMount(){
				StockDataStore.addChangeListener(this._onChange.bind(this));
				API.getBitcoinData("daily");
			//	API.getCryptoCurrencyExchangeData("daily");
			}

			componentWillUnmount(){
				StockDataStore.removeChangeListener(this._onChange.bind(this));
			}

			_onChange(){
				this.setState({
					dailyetfData: StockDataStore.getDailyETFData(),
					dailymarketData: StockDataStore.getDailyMarketData(),
					sendRequestStatus:	StockDataStore.getRequestSendStatus(),
					bitcoinData: StockDataStore.getBitcoinHistory(),
					storeupdated: true,
					bitcoinHistoryOptions:	StockDataStore.getBitcoinHistoryOption(),
					cryptoexchangedata: StockDataStore.getCryptoCurrencyExchange(),
					currencyexchangedata:  StockDataStore.getCurrencyExchange()
				});

			}

			renderMarketView(){
				let marketAutocorrelation, marketGraph = null;
				if(this.state.dailymarketData.autocorrelation!=undefined && this.state.sendRequestStatus==false){
					marketAutocorrelation = Autocorrelation.setGoogleAutocorr(this.state.dailymarketData);
				}
				if(this.state.dailymarketData.xValues.length>0 && this.state.sendRequestStatus==false){	
					marketGraph = MarketGraph.setMarketGoogleGraph(this.state.dailymarketData);
				}
				return (
					<div className="graphViews">
						{marketGraph}
						<div className="graphViewChild">
							{marketAutocorrelation}
						</div>
					</div>
				);
			}

			renderETFView(){
				let etfGraph, marketAutocorrelation, etfCandleStick, etfAutocorrelation = null;
				if(this.state.dailyetfData.xValues.length>0  && this.state.sendRequestStatus==false && this.state.viewMode=='markets'){
					etfGraph = MarketGraph.setMarketGoogleGraph(this.state.dailyetfData);
				}
				if(this.state.dailyetfData.autocorrelation!=undefined  && this.state.sendRequestStatus==false && this.state.viewMode=='markets'){
					etfAutocorrelation = Autocorrelation.setGoogleAutocorr(this.state.dailyetfData);
					etfCandleStick = CandleStickGraph.setGraph(this.state.dailyetfData);
				}
				return (
							<div className="graphViews">
								{etfGraph}
								<div className="graphViewChild">
									{etfAutocorrelation}
									{etfCandleStick}
								</div>
							</div>
				);
			}

			renderBitCoinPriceView(){
					let priceview = null;
					if(this.state.bitcoinData!=null){
						priceview = MarketGraph.setBitcoinGraph(this.state.bitcoinData, this.state.bitcoinHistoryOptions);
					}
					return priceview;
			}

			renderBitcoinVarianceView(){
					let varianceview = null;
					if(this.state.bitcoinData!=null){
						if(this.state.bitcoinHistoryOptions=='monthly') varianceview = CandleStickGraph.setBitcoinVarianceView(this.state.bitcoinData, this.state.bitcoinHistoryOptions);
						if(this.state.bitcoinHistoryOptions=='alltime') varianceview = MarketGraph.setBitcoinVolumeGraph(this.state.bitcoinData, this.state.bitcoinHistoryOptions);
					}
					return varianceview;
			}

			renderCryptoCurrencyExchangeView(){
					//
					// MarketGraph.renderCryptoCurrencyExchangeView(this.state.cryptoexchangedata, this.state.bitcoinHistoryOptions)
					//
			
					let view = null;
					if(this.state.cryptoexchangedata!=null){
						view = MarketGraph.renderCryptoCurrencyExchangeView(this.state.cryptoexchangedata, this.state.bitcoinHistoryOptions);
					} else {
						view = (<div/>);
					}
					return view;
			}

				renderCurrencyExchange(){
					//
					// MarketGraph.renderCryptoCurrencyExchangeView(this.state.cryptoexchangedata, this.state.bitcoinHistoryOptions)
					//
				


					let view = null;
					if(this.state.currencyexchangedata!=null){
						
						view = MarketGraph.renderCurrencyExchangeView(this.state.currencyexchangedata);
					} else {
						view = (<div/>);
					}
					return view;
			}

			render(){
				//
				// 			
				//
				return (
					<div className="marketgraph-view">
						<h1 className="graph-page-title">Bitcoin - $BTC</h1>
						{MarketGraph.renderBitcoinAPIOptions(this.state.bitcoinHistoryOptions)}
						{this.renderBitCoinPriceView()}
						{this.renderCurrencyExchange()}
					</div>
				);
			}
}