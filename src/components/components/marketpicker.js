import React, {Component} from 'react';
var StockDataStore = require('../../stores/stockdatastore');
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
let Actions = require('../../actions/actions');


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
		if(this.state.selecting==false){
			this.items = (
					<div key={0} style={{marginLeft: 35,display: 'flex', cursor: 'pointer', fontFamily: 'Courier New',fontSize: 18}} onClick={()=> this.setState({selecting: true}) }>
						{this.state.selectedMarket}
						<img src="https://s3-us-west-1.amazonaws.com/node-quandl/downarrow.png" style={{width: 20, height: 20}} />
					</div>
			);


		} else {
			this.items = null;
			this.items = this.state.markets.map((item,i)=> (
					<div key={item} style={{marginLeft: 35, cursor: 'pointer',fontFamily: 'Courier New', fontSize: 18}}   onClick={()=> this.marketPicked(i) }>
						{item}
					</div>
			));
		}

		return(
			<div>
				  <ReactCSSTransitionGroup 
          				transitionName="example"
          				transitionEnterTimeout={1000}
          				transitionLeaveTimeout={1}>
		       			
		       			{this.items}
				   </ReactCSSTransitionGroup>
			</div>
		);
	}
}