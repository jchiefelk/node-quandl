import React from 'react';
import { Chart } from 'react-google-charts';
require('../css/main.css');


function CandleStickGraph(){
	this.graph=null;
	this.options = {
		legend: "none",
		backgroundColor: 'transparent',
        candlestick: {
            fallingColor: { strokeWidth: 0, fill: 'red' }, // red
            risingColor: { strokeWidth: 0, fill: 'black' }   // green
        },

		hAxis: {

       	   textStyle:{
       	   	color: 'black',
       	   	fontName: 'Courier New',
       	   	fontWeight: 700,
       	   	fontSize: 10

       	   },
		   gridlines: {
		    	color: 'transparent', 
		    	count: 1
		    },
	        format:'MMM d, y',

			labels: {
			       enabled: true
			}
        },

       	vAxis: {
       	   textStyle:{
       	   	color: 'black',
       	   	fontName: 'Courier New',
       	   	fontWeight: 700
       	   },
		   labels: {
		       enabled: true
		   },
		   gridlines: {
		    	color: 'transparent', 
		    	count: 4
		    }
        }
	
	};
	this.data = [["DATE","val1","val2","val3","val4"]];
	//this.data = [["DATE","val1","val2","val3","val4"],["Mon",20,28,38,45],["Tue",31,38,55,66],["Wed",50,55,77,80],["Thu",77,77,66,50],["Fri",68,66,22,15]]; 
	// col0: xaxis label, col1: number specifying low/minumum, col2: opening value, col3: closing price, col4: high price for the day
};


CandleStickGraph.prototype.setGraph = function(item){
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
	//
	//
	for(var x=item.data.length; x >=0; x--){
			let data = [item.data[x], item.low[x], item.open[x], item.yValues[x], item.high[x]];
			this.data.push(data);
	};
	//
	this.graph = (
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

	return this.graph;

};



module.exports = new CandleStickGraph();