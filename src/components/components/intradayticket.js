'use strict';
import React, {Component} from 'react';
var StockDataStore = require('../../stores/stockdatastore');
var Actions = require('../../actions/actions');
var MarketGraph = require('../jsx/marketgraph');
var CandleStickGraph = require('../jsx/candlestickplot');
var Autocorrelation = require('../jsx/autocorrelationgraph');


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
						console.log('Send Request');
						let code = this.state.companyCode.split(' ');
						let params = {
							code: code[0],
							market: this.state.market,
							db: 'GOOG',
							apiKey: 'oaWPkjrfz_aQmyPmE-WT',
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
						console.log(this.state.marketData);
						if(this.state.marketData.data.length>0){
									this.setState({
											storeupdated: false,
											marketData: null,
											intraDayView: MarketGraph.setIntradayGraphGoogleView(this.state.marketData.data, this.state.marketData.autocorr, this.state.marketData.name),
											intraDayCandleStick: CandleStickGraph.setIntraDayGraph(this.state.marketData),
											
									});	
						}

						if(this.state.marketData.autocorr.length > 0) {
								this.setState({
										intraDayAutocorrelation: Autocorrelation.setIntradayAutocorrelation(this.state.marketData.autocorr)
								});

						}

				}


			}

			componentDidMount(){
				StockDataStore.addChangeListener(this._onChange.bind(this));
				/***
				if(this.state.marketData.data.length==0 && this.state.sendRequestStatus==false){
					this.setState({
							intraDayView: MarketGraph.setCompanyPicker()
					});
				}
				*****/

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

			render(){
				return (
					<div className="intradaypage">
					
							{this.state.intraDayView}
				
						<div className="intradaychild">
							{this.state.intraDayCandleStick}
							{this.state.intraDayAutocorrelation}
						</div>

					</div>
				);


			}
}