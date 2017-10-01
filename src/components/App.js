import React, { Component } from 'react';
import MarketPage from './pages/marketpage';
import AuthForm from './components/authform';
import {  Link } from 'react-router-dom';
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