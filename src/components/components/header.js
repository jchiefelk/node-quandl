import React, {  Component } from 'react';
import {  Link } from 'react-router-dom';
require('../css/main.css');

export default class Header extends Component {

	 constructor(){
	  		super();
	  		this.state = {
	  			width: window.innerWidth
	  		};
	 }
	 componentDidMount(){
	    window.addEventListener('resize', this.handleResize.bind(this));
	 }
	 componentWillUnmount(){
	    window.removeEventListener('resize', this.handleResize.bind(this));
	 }
  	 handleResize(e) {
	    this.setState({
	      windowWidth: window.innerWidth
	    });
   	 }
	render() {

	    return (
	      <div className="header">
			    <Link to="/" className="header-link">Market Analysis</Link>	
	      </div>
	    );
	}

}