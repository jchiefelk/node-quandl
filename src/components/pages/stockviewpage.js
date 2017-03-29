'use strict';
import React, {Component} from 'react';
import IntraDayTicket from '../components/intradayticket';
import Marketdata from '../components/marketdata';
var StockDataStore = require('../../stores/stockdatastore');
var Actions = require('../../actions/actions');
var FrontPageGraph = require('../jsx/frontpagegraph');
import LineChart from '../components/linechart';

let data = {
  points: [
    [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 },
      { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
    [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 },
      { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ],
    [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 },
      { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
  ],
  xValues: [0,1,2,3,4,5,6],
  yMin: 0,
  yMax: 30
};

export default class StockviewPage extends Component {

			constructor(){
				super();
				this.state = {
					dailyetfData: StockDataStore.getDailyETFData(),
					dailymarketData: StockDataStore.getDailyMarketData(),
					marketGraph: null,
					etfGraph: null,
					storeupdated: false
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
					storeupdated: true
				});
			}

			componentDidUpdate(){
				if(this.state.storeupdated==true){
						this.setState({
							storeupdated: false,
							marketGraph: FrontPageGraph.setMarketGraphs(this.state.dailymarketData),
							etfGraph: FrontPageGraph.setETFGraphs(this.state.dailyetfData)
						});
				}
			}

			render(){
				return (
					<div>
						<IntraDayTicket />
						  <LineChart
						    data={data}
						    width={600}
						    height={300}
						    />
					</div>
					);
			}
}