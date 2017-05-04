import React, { Component } from 'react';
import Header from '../components/header';
import MarketFundView from '../components/marketfundview';
import IntraDayTicket from '../components/intradayticket';
import { Router, Route, Link } from 'react-router'
require('../css/main.css');

export default class MarketPage extends Component {

	//	backgroundColor: 'rgba(75,192,192,0.4)'
    render() {
          return(
            <div style={{display: 'flex',flexDirection: 'column',width: window.innerWidth, backgroundColor: 'rgba(75,192,192,0.4)' }}> 
              <Header/>
              <IntraDayTicket/>
            </div>
          );
     }
}