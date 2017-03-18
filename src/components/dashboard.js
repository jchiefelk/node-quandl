import React, {Component} from 'react';
let Tutorial = require('./pages/tutorial')

export default class Dashboard extends Component {
	
  constructor(props) {
    super(props);
    this.state = {view: Tutorial.renderTutorial() };


  render() {
    return ( this.state.view );
  }

}