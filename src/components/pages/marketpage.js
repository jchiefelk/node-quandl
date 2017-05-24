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
        this.state = {
            marketPicker: MarketGraph.setCompanyPicker()
        };
    }


    render() {

      //  <VideoBackground />
          return(
            <div className="marketpage"> 
              <Header/>
             
              {this.state.marketPicker}
              <MarketFundView />
            </div>
          );
     }
}