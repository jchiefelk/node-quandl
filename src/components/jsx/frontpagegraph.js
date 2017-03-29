'use strict';
import React, {Component} from 'react';
var d3Chart = require('./d3Chart');


function FrontPageGraph(){
		this.id = "Front Page Graph";
};


FrontPageGraph.prototype.setETFGraphs = function(item){

		return (
			<div>
			</div>
		);

};


FrontPageGraph.prototype.setMarketGraphs = function(item){

		return (
			<div>
			</div>
			);
};


module.exports = new FrontPageGraph();