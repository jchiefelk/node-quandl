'use strict';
import React, {Component} from 'react';
var StockDataStore = require('../../stores/stockdatastore');
var Actions = require('../../actions/actions');
var MarketGraph = require('../jsx/marketgraph');
var CandleStickGraph = require('../jsx/candlestickplot');


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
					market: null,
					companyCode: null,
					autocorrelation: null,
					storeupdated: false,
					intraDayAutocorrelation: null,
					intraDayCandleStick: null
				};
			}

			sendRequest(){
						let code = this.state.companyCode.split(' ');
						let params = {
							code: code[0],
							market: this.state.market,
							db: 'GOOG',
							apiKey: 'hp2sm_6zVAoffDrYgzBi',
							startDate: this.state.startDate,
							endDate: this.state.endDate

						};
				
						this.setState({	intraDayView: MarketGraph.setLoadingAnimation()	});
						Actions.updatesendRequest();
						Actions.makeFrontEndRequest(params);			
			}

			componentDidUpdate(){

				if(this.state.storeupdated==true &&	this.state.sendRequestStatus==true) {
					this.setState({
						storeupdated: false,
						sendRequestStatus: false,
						intraDayView: null,
						intraDayAutocorrelation: null,
						intraDayCandleStick: null
					});
					this.sendRequest();
				}

				if(this.state.storeupdated==true && this.state.marketData.data.length>0){
						if(this.state.marketData.data.length>0){
								this.setState({
									storeupdated: false,
									marketData: null,
									intraDayView: MarketGraph.setIntradayGraphView(this.state.marketData.data, this.state.marketData.autocorr, this.state.marketData.name)
									// intraDayAutocorrelation: MarketGraph.setIntradayAutocorrelation(this.state.marketData.autocorr)

								});
						}
				}


			}

			componentDidMount(){
				StockDataStore.addChangeListener(this._onChange.bind(this));
				this.setState({
					intraDayView: MarketGraph.setCompanyPicker()
				});
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

			render(){
				return this.state.intraDayView;
			}
}