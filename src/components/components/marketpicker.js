import React, {Component} from 'react';
var StockDataStore = require('../../stores/stockdatastore');
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
let Actions = require('../../actions/actions');
require('../css/marketpicker.css');


export default class MarketPicker extends Component {
	
	constructor(props) {
	    super(props);
	    this.state = {
	    	markets: ['NYSE', 'NASDAQ'],
	    	selecting: false,
	    	selectedMarket: 'Select Market'
	    };
	}

	marketPicked(i){

		this.setState({
			selecting: false,
			selectedMarket: this.state.markets[i]
		});
		Actions.updateMarket(this.state.markets[i]);
	}

	render(){
		console.log(this.state.selecting);
		if(this.state.selecting==false){
			this.items = null;
			this.items = (
					<div key={0} className="market-picker-item" onClick={()=> this.setState({selecting: true}) }>
					     <h4>{this.state.selectedMarket}</h4>
						<img src="https://s3-us-west-1.amazonaws.com/node-quandl/downarrow.png" className="dropdown-arrow" />
					</div>
			);


		} else {
			this.items = null;
			this.items = this.state.markets.map((item,i)=> (
					<div key={item} className="market-picker-item"   onClick={()=> this.marketPicked(i) }>
						<h4>{item}</h4>
					</div>
			));
		}

		return(
		<div className="market-picker">
				  <ReactCSSTransitionGroup 
          				transitionName="example"
          				transitionEnterTimeout={1}
          				transitionLeaveTimeout={1}>
		       			
		       			{this.items}
				   </ReactCSSTransitionGroup>
			</div>
		);
	}
}