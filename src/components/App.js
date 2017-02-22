import React, { Component } from 'react';
import Header from './components/header';
import StockviewPage from './pages/stockviewpage';
import { Router, Route, Link } from 'react-router'


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