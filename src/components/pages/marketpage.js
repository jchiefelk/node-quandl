import React, { Component } from 'react';
import Header from '../components/header';
import MarketFundView from '../components/marketfundview';
import IntraDayTicket from '../components/intradayticket';
import { Router, Route, Link } from 'react-router'
require('../css/main.css');

export default class MarketPage extends Component {

    render() {
          return(
            <div style={{display: 'flex', flexDirection: 'column',height: window.innerHeight*1.5, backgroundColor: '#696969'}}> 
              <Header/>
              <IntraDayTicket  />
              <MarketFundView />
            </div>
          );
     }
}