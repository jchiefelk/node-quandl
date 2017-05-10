import React, { Component } from 'react';
import Header from '../components/header';
import { Router, Route, Link } from 'react-router'
import IntraDayTicket from '../components/intradayticket';
require('../css/main.css');

export default class IntraDayPage extends Component {

    render() {
          return(
            <div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'silver'}}>   
              <Header/>
              <IntraDayTicket />
            </div>
          );
     }
}