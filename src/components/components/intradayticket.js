'use strict';
import React, {Component} from 'react';
var StockDataStore = require('../../stores/stockdatastore');
var Actions = require('../../actions/actions');
var MarketGraph = require('../jsx/marketgraph');


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
					companyCode: null
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
						Actions.makeFrontEndRequest(params);
						this.setState({
							intraDayView: MarketGraph.setLoadingAnimation()	
						});
							
			}

			componentDidUpdate(){

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
					sendRequestStatus:	StockDataStore.getRequestSendStatus()
				});

			
				if(this.state.sendRequestStatus==true && this.state.marketData.data.length==0) {
					this.sendRequest();
				}


				if(this.state.marketData.data.length>0){
					this.setState({
						marketData: null,
						intraDayView: MarketGraph.setGraphView(this.state.marketData.data,	this.state.marketData.name)
					});
				}

			
			}

			render(){
				return(this.state.intraDayView);
			}
}