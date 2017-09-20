import React, {Component} from 'react';
var StockDataStore = require('../../stores/stockdatastore');
let Actions = require('../../actions/actions');


class MarketPicker extends Component {
	
	constructor(props) {
	    super(props);
	    this.state = {
	    	markets: ['NYSE', 'NASDAQ'],
	    	selecting: false,
	    	selectedMarket: 'Market'
	    };
	}

	componentDidMount(){
		Actions.updateMarket('nyse');
	}

	marketPicked(e){
		this.setState({
			selecting: false,
			selectedMarket: e.target.value
		});
		Actions.updateMarket(e.target.value);
	}

	render(){
		
		return(
			<div className="market-picker">
				<select className="market-picker-item" onClick={(e)=> this.marketPicked(e) } >
					<option value="nyse">nyse</option>
					<option value="nasdaq">nasdaq</option>
				</select>
			</div>
		);
	}
}

export default MarketPicker;