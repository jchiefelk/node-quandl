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
					rangeSelected: false,
					companyCode: StockDataStore.getCompanyCode(),
					marketData: StockDataStore.getInradayTicketData(),
					stockHistoryOptions: 'weekly'
				};
			}
			componentDidMount(){
				StockDataStore.addChangeListener(this._onChange.bind(this));
			}
			componentWillUnmount(){
				StockDataStore.removeChangeListener(this._onChange.bind(this));
			}
			_onChange(){
				this.setState({
					marketData: StockDataStore.getInradayTicketData(),
					startDate: StockDataStore.getStartDate(),
					endDate: StockDataStore.getEndDate(),
					companyCode: StockDataStore.getCompanyCode(),
					sendRequestStatus:	StockDataStore.getRequestSendStatus(),
					stockHistoryOptions:	StockDataStore.getStockHistoryOption()
				});

			}
			setLoadingView(){
				return MarketGraph.setLoadingAnimation();
			}  
			setMainView(){
				let autocorr= null;
				if(this.state.marketData.autocorr.length > 0) {
					autocorr = Autocorrelation.setIntradayAutocorrelation(this.state.marketData.autocorr, this.state.stockHistoryOptions);
				}
				return (
					<div className="intradaypage">
						{MarketGraph.setHistoryRangePicker(this.state.stockHistoryOptions)}
						
						<div className="intradaychild">
							{MarketGraph.setIntradayGraphGoogleView(this.state.marketData.data, this.state.marketData.name, this.state.stockHistoryOptions)}	
							{CandleStickGraph.setIntraDayGraph(this.state.marketData, this.state.stockHistoryOptions)}
						</div>

						
						<div className="intradaychild">
							{MarketGraph.setIntraDayBarGraph(this.state.marketData.data, this.state.marketData.name, this.state.stockHistoryOptions)}
							{autocorr}
						</div>
					</div>
				);
			}
			render(){
				let view; 
				if(this.state.marketData.data==0) {
					view = this.setLoadingView();
				} 
				if(this.state.marketData.data.length>0){
					view = this.setMainView();
				}
				return view;
			}
}