import React from 'react';
import { Chart } from 'react-google-charts';
require('../css/main.css');


function CandleStickGraph(){
	this.graph=null;
	this.options = {
		title: 'Intraday Price Variance',
		titleTextStyle: {
			color: 'black',    // any HTML string color ('red', '#cc00cc')
			fontName: 'Courier New', // i.e. 'Times New Roman'
			fontSize: 18, // 12, 18 whatever you want (don't specify px)
			bold: false,    // true or false
			italic: false   // true of false
		},
		legend: "none",
		backgroundColor: 'transparent',
		bar: { groupWidth: '100%' }, 
        candlestick: {
            fallingColor: { strokeWidth: 0, fill: 'red' }, // red
            risingColor: { strokeWidth: 0, fill: 'black' }   // back
        },
		hAxis: {
		baselineColor: 'transparent',
       	   textStyle:{
       	   	color: 'black',
       	   	fontName: 'Courier New',
       	   	fontWeight: 700,
       	   	fontSize: 8
       	   },
	       format:'MMM d, y',


	       gridlines: {
		    	count: 5
		   }
        },

       	vAxis: {
       	   baselineColor: 'transparent',
       	   textStyle:{
       	   	color: 'black',
       	   	fontName: 'Courier New',
       	   	fontWeight: 700
       	   },
		   labels: {
		       enabled: true
		   },
		   gridlines: {
		    	count: 5
		   }
        }
	};
	this.data = [["DATE","low-high & open-close","open","close","high"]];
};
CandleStickGraph.prototype.setGraph = function(item){
	this.data = [["DATE","low-high & open-close","open","close","high"]];
	//
	//
	for(var x=30; x >=0; x--){
			let data = [item.xValues[x], item.low[x], item.open[x], item.yValues[x], item.high[x]];
			this.data.push(data);
	};
	//
	this.graph = (
      <div className="candleStickGraph">
        <Chart
		  chartType="CandlestickChart"
		  data={this.data}
		  width="100%"
		  height="100%"
		  options={this.options}
        />
      </div>
	);
	return this.graph;
};

CandleStickGraph.prototype.setIntraDayGraph = function(item){
	this.data = [["DATE","low-high & open-close","open","close","high"]];
	//
	//
	if(item.data.length>=60){
		for(let x=60; x>0;x--){
				let data = [item.data[x].date, item.data[x].low, item.data[x].open, item.data[x].close, item.data[x].high];
				this.data.push(data);
		};
	} 
	if(item.data.length<60){
		for(let x=item.data.length-1; x>=0;x--){
				let data = [item.data[x].date, item.data[x].low, item.data[x].open, item.data[x].close, item.data[x].high];
				this.data.push(data);
		};
	}
	return (
      <div className="candleStickGraph_intraday">
        <Chart
		  chartType="CandlestickChart"
		  data={this.data}
		  width="100%"
		  height="100%"
		  options={this.options}
        />
      </div>
		);
};



module.exports = new CandleStickGraph();