import React, { Component } from 'react';
import Header from '../components/header';
import MarketFundView from '../components/marketfundview';
import IntraDayTicket from '../components/intradayticket';
import VideoBackground from '../components/videobackground';
var MarketGraph = require('../jsx/marketgraph');
import { Router, Route, Link } from 'react-router'
require('../css/main.css');

export default class MarketPage extends Component {

    constructor(){
        super();
    }

    render() {
          return(
            <div className="marketpage"> 
              <Header/>
              {MarketGraph.setCompanyPicker()}
              <MarketFundView/>
            </div>
          );
     }
}