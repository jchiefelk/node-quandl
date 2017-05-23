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
          return(
            <div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'silver'}}> 
              <Header/>
              <VideoBackground />

              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  {this.state.marketPicker}
              </div>

              <MarketFundView />
            </div>
          );
     }
}