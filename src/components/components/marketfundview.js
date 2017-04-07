'use strict';
import React, {Component} from 'react';
import Marketdata from '../components/marketdata';
var StockDataStore = require('../../stores/stockdatastore');
var Actions = require('../../actions/actions');
var MarketGraph = require('../jsx/marketgraph');
var CandleStickGraph = require('../jsx/candlestickplot');
require('../css/main.css');


export default class MarketFundView extends Component {

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
					viewMode: 'markets'
				};
			}

			componentDidMount(){
				StockDataStore.addChangeListener(this._onChange.bind(this));
				Actions.getDailyFrontEndData();
			}

			componentWillUnmount(){
				StockDataStore.removeChangeListener(this._onChange.bind(this));
			}

			_onChange(){
				this.setState({
					dailyetfData: StockDataStore.getDailyETFData(),
					dailymarketData: StockDataStore.getDailyMarketData(),
					sendRequestStatus:	StockDataStore.getRequestSendStatus(),
					storeupdated: true
				});
			}

			componentDidUpdate(){

				

				if(this.state.storeupdated==true && this.state.sendRequestStatus==true){
					this.setState({
						storeupdated: true,
						marketGraph: null,
						etfGraph: null,
						etfAutocorrelation: null,
						marketAutocorrelation: null,
						etfCandleStick: null,
						viewMode: 'intraday'
					});
					// Actions.updatesendRequest();
				}

				if(this.state.storeupdated==true && this.state.dailymarketData.xValues.length>0 && this.state.sendRequestStatus==false && this.state.viewMode=='markets'){
					this.setState({
							storeupdated: false,
							marketGraph: MarketGraph.setMarketFundGraph(this.state.dailymarketData)
						});
				}

				if(this.state.storeupdated==true && this.state.dailyetfData.xValues.length>0  && this.state.sendRequestStatus==false && this.state.viewMode=='markets'){
					this.setState({
							storeupdated: false,
							etfGraph: MarketGraph.setMarketFundGraph(this.state.dailyetfData)
						});
				}
				
				if(	this.state.storeupdated==true && this.state.dailymarketData.autocorrelation.xValues.length>0  && this.state.sendRequestStatus==false && this.state.viewMode=='markets'){
					this.setState({
							storeupdated: false,
							etfAutocorrelation: MarketGraph.setAutocorrelationGraph(this.state.dailyetfData),
							etfCandleStick: CandleStickGraph.setGraph(this.state.dailyetfData)
						});
				}
			
				if(	this.state.storeupdated==true && this.state.dailymarketData.autocorrelation.xValues.length>0  && this.state.sendRequestStatus==false && this.state.viewMode=='markets'){
						this.setState({
							storeupdated: false,
							marketAutocorrelation: MarketGraph.setAutocorrelationGraph(this.state.dailymarketData)
						});
				}
		
				
			}

			render(){

				return (
					<div className="graph-page">

							<div style={{display: 'flex', marginTop: 50}}>
								{this.state.marketGraph}
								<div>
									{this.state.marketAutocorrelation}
								</div>
							</div>

							<div style={{display: 'flex', marginTop: 60, marginLeft: 75}}>
								{this.state.etfGraph}
								
								<div style={{display: 'flex', flexDirection: 'column', marginTop: 50}}>
									{this.state.etfAutocorrelation}
									{this.state.etfCandleStick}
								</div>

							</div>
					</div>
					);
			}
}