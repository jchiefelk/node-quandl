import React, { Component } from 'react';
import Header from './components/header';
import MarketFundView from './components/marketfundview';
import { Router, Route, Link } from 'react-router'
import MarketPicker from './components/marketpicker.js';
import IntraDayTicket from './components/intradayticket';

require('./css/main.css');


class App extends Component {

	  render() {
	        return(
	        	<div style={{display: 'flex', flexDirection: 'column',height: window.innerHeight*1.5, backgroundColor: '#696969'}}> 
	        		<Header/>
	        		<IntraDayTicket />
	       			<MarketFundView />
	        	</div>
	        );
	   }

}
export default App;