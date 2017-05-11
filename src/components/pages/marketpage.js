import React, { Component } from 'react';
import Header from '../components/header';
import MarketFundView from '../components/marketfundview';
import IntraDayTicket from '../components/intradayticket';
import VideoBackground from '../components/videobackground';


import { Router, Route, Link } from 'react-router'
require('../css/main.css');

export default class MarketPage extends Component {

	//	backgroundColor: 'rgba(75,192,192,0.4)'
    render() {
          return(
            <div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'silver'}}> 
              <Header/>
            
              <IntraDayTicket/>
              <MarketFundView />
            </div>
          );
     }
}