import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import MarketPage from './pages/marketpage';
import AuthForm from './components/authform'
require('./css/main.css');
require('./css/react-datetime.css');
require('./css/marketpicker.css');

class App extends Component {

	  render() {
	  	// change marketpage name to something bitcoin related
	  	// <MarketPage/>

	        return (<AuthForm/>);
	   }

}
export default App;