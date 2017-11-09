import React, { Component } from 'react';
import Header from '../components/header';
import MarketFundView from '../components/marketfundview';
import IntraDayTicket from '../components/intradayticket';
import VideoBackground from '../components/videobackground';
var StockDataStore = require('../../stores/stockdatastore');
var MarketGraph = require('../jsx/marketgraph');
import { Link } from 'react-router-dom';



 class MarketPage extends Component {

    constructor(){
        super();
        this.state ={
              stocklistings: StockDataStore.getStockListings()
        };
    }
      componentDidMount(){
        StockDataStore.addChangeListener(this._onChange.bind(this));
      }
      componentWillUnmount(){
        StockDataStore.removeChangeListener(this._onChange.bind(this));
      }
      _onChange(){
        this.setState({
          stocklistings: StockDataStore.getStockListings()
        });
      }
    render() {
          return(
            <div className="marketpage"> 
              <Header/>
              {MarketGraph.setCompanyPicker(this.state.stocklistings)}
              <MarketFundView/>
            </div>
          );
     }
}

export default MarketPage;