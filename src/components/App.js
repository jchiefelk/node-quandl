import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import MarketPage from './pages/marketpage';
require('./css/main.css');


class App extends Component {

	  render() {
	        return (<MarketPage/>);
	   }

}
export default App;