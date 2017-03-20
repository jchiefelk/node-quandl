import React, { Component } from 'react';
import Header from './components/header';
import StockviewPage from './pages/stockviewpage';
import { Router, Route, Link } from 'react-router'
import MarketPicker from './components/marketpicker.js';
require('./css/main.css');


class App extends Component {

	  render() {
	        return(
	        	<div className="app"> 
	        		<Header/>
	       			<StockviewPage />
	        	</div>
	        );
	   }

}
export default App;