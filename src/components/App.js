import React, { Component } from 'react';
import Header from './components/header';
import StockviewPage from './pages/stockviewpage';
import { Router, Route, Link } from 'react-router'
import MarketPicker from './components/marketpicker.js';


class App extends Component {


	  render() {
	        return(
	        	<div style={{alignItems: 'center'}}> 
	        		<Header/>
	        		<StockviewPage />
	        	</div>
	        );
	   }

}
export default App;