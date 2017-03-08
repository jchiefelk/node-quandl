'use strict';
import React,{Component} from 'react';
var StockDataStore = require('../../stores/stockdatastore');
var Actions = require('../../actions/actions');
import Chart from 'chart.js';



export default class Marketdata extends Component {

	constructor(){
		super();
		this.state={
			marketView: null
		};
	}
	
	setMarketView(){
		let view =(
			<div/>
		);
		return view;
	}

	componentDidMount(){
		StockDataStore.addChangeListener(this._onChange.bind(this));
		this.setState({
			marketView: this.setMarketView()
		});
		Actions.makeFrontEndRequest()
	}

	componentWillUnmount(){
		StockDataStore.removeChangeListener(this._onChange.bind(this));
	}

	_onChange(){
		this.setState({

		})
	}

	render(){
		return this.state.marketView
	}
	

}