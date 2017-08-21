'use strict';
import React, {Component} from 'react';
var StockDataStore = require('../../stores/stockdatastore');
var Actions = require('../../actions/actions');
var MarketGraph = require('../jsx/marketgraph');
var CandleStickGraph = require('../jsx/candlestickplot');
var Autocorrelation = require('../jsx/autocorrelationgraph');
let API = require('../../api_utls/api');


export default class IntraDayTicket extends Component {

			constructor(){
				super();
				this.state = {
					data: null,
					intraday: [],
					intraDayView: null,
					companyName: null,
					startDate: null,
					endDate: null, 
					rangeSelected: false,
					market: StockDataStore.getMarket(),
					companyCode: StockDataStore.getCompanyCode(),
					autocorrelation: null,
					storeupdated: false,
					intraDayAutocorrelation: null,
					intraDayCandleStick: null,
					sendRequestStatus:	StockDataStore.getRequestSendStatus(),
					marketData: StockDataStore.getInradayTicketData()
				};
			}

			sendRequest(){
						let code = this.state.companyCode.split(' ');
						let params = {
							code: code[0]
						};
						// 
						API.getStockPrice(params);			
			}

			componentDidUpdate(){


				if(this.state.storeupdated==true &&	this.state.sendRequestStatus==true) {
					// this.sendRequest();
				}

			}
			componentDidMount(){
				StockDataStore.addChangeListener(this._onChange.bind(this));
				if(this.state.sendRequestStatus==true) {
					this.sendRequest();
				} 
			}
			componentWillUnmount(){
				StockDataStore.removeChangeListener(this._onChange.bind(this));
			}
			_onChange(){
				this.setState({
					market: StockDataStore.getMarket(),
					marketSelected: true, 
					marketData: StockDataStore.getInradayTicketData(),
					startDate: StockDataStore.getStartDate(),
					endDate: StockDataStore.getEndDate(),
					companyCode: StockDataStore.getCompanyCode(),
					sendRequestStatus:	StockDataStore.getRequestSendStatus(),
					storeupdated: true
				});


			}

			setLoadingView(){

				return MarketGraph.setLoadingAnimation();
			}  


			setMainView(){
				
				let autocorr= null;
				if(this.state.marketData.autocorr.length > 0) {
					autocorr = Autocorrelation.setIntradayAutocorrelation(this.state.marketData.autocorr)
				}

				return (
					<div className="intradaychild">
						<div>
							{MarketGraph.setIntradayGraphGoogleView(this.state.marketData.data, this.state.marketData.name)}
						</div>

						<div>
							{CandleStickGraph.setIntraDayGraph(this.state.marketData)}
							{autocorr}
						</div>
					</div>
				);
			}

			render(){
				// 
				let view; 
				if(this.state.marketData.data==0) {
					view = this.setLoadingView();
				} 
				if(this.state.marketData.data.length>0){
					view = this.setMainView();
				}
				return (
					<div className="intradaypage">
						{view}
					</div>
				);

			}
}