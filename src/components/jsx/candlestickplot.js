import React from 'react';
import { Chart } from 'react-google-charts';
require('../css/main.css');


function CandleStickGraph(){
	this.graph=null;

	this.data = [["DATE","low-high & open-close","open","close","high"]];
};

CandleStickGraph.prototype.setIntraDayGraph = function(item){
	this.data = [["DATE","low-high & open-close","open","close","high"]];

	let prices = [];

				for(let x=0; x<item.data.length; x++){
					prices.push(item.data[x].close);
				};

				let max = Math.max.apply(null, prices );
				let min = Math.min.apply(null, prices);



	//
	let	options = {
		title: 'Intraday Price Variance',

		viewWindowMode:'explicit',
		 viewWindow:{
				                max: max,
				                min: min
		},
		titleTextStyle: {
			color: 'black',    // any HTML string color ('red', '#cc00cc')
			fontName: 'Arial', // i.e. 'Times New Roman'
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
		/**
		chartArea: {
			backgroundColor: {
				stroke: 'black',
				strokeWidth: 1
			}
		},
		***/

       	vAxis: {
       	   baselineColor: 'transparent',
       	   textStyle:{
       	   	color: 'black',
       	   	fontName: 'Arial',
       	   	fontWeight: 700
       	   },
		   labels: {
		       enabled: true
		   },
		   gridlines: {
		    	count: 2,
		    	color: 'black'
		   }
        },
		hAxis: {
				title: "",	
				titleTextStyle: { color: 'black' },
				baselineColor: 'transparent',
				textStyle: {
				        		fontSize: 10,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				},
				gridlines: {
					count: 3,
					color: 'transparent'
				},

		}
	};





	//
	//	
	if(item.data.length>=60){
		for(let x=60; x>0;x--){
				let data = [new Date(item.data[x].date), item.data[x].low, item.data[x].open, item.data[x].close, item.data[x].high];
				this.data.push(data);
		};
	} 
	if(item.data.length<60){
		for(let x=item.data.length-1; x>=0;x--){
				let data = [new Date(item.data[x].date), item.data[x].low, item.data[x].open, item.data[x].close, item.data[x].high];
				this.data.push(data);
		};
	}
	return (
	      <div  className="intradaylinegraph">
		        <Chart
				  chartType="CandlestickChart"
				  data={this.data}
				  width="100%"
				  height="100%"
				  options={options}
		        />
	      </div>
		);
};


CandleStickGraph.prototype.setBitcoinVarianceView = function(data, historyoptions){



		let vardata = [["DATE","low-high & open-close", "open", "close", "average"]];
		console.log('setting bit variance plot');
		for(let x=data.length-1; x>=0;x--){
				var d = [ new Date(data[x].time), data[x].low, data[x].open, data[x].average, data[x].high];
				vardata.push(d);
		};


				let prices = [];

				for(let x=0; x<data.length; x++){
					prices.push(data[x].average);
				};

				let max = Math.max.apply(null, prices );
				let min = Math.min.apply(null, prices);


		let options = {
					title: "Interday Price Vairence",
				    viewWindowMode:'explicit',
				    viewWindow:{
				                max: max,
				                min: min
				    },
					titleTextStyle: {
						color: 'black',    // any HTML string color ('red', '#cc00cc')
						fontName: 'Arial', // i.e. 'Times New Roman'
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
			       	vAxis: {
			       	   baselineColor: 'transparent',
			       	   textStyle:{
			       	   	color: 'black',
			       	   	fontName: 'Arial',
			       	   	fontWeight: 700,
			       	   	fontSize: 12
			       	   },
					   labels: {
					       enabled: true
					   },
					   gridlines: {
					    	count: 2,
					    	color: 'black'
					   }
			        },
			        hAxis: {
							title: "",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'transparent',
							textStyle: {
							        		fontSize: 12,
							        		fontName: 'Arial',
							        		color: 'black',
							        		fontWeight: 700,
							       
							},
							gridlines: {
								count: 5,
								color: 'transparent'
							},
							format: null
					}
	};


/**
	if(historyoptions=='monthly' || historyoptions=='alltime'){
		options.hAxis.format = 'MMM d, y'
	}
	**/
	/**
	if(historyoptions=='daily'){
		options.hAxis.format = ['HH:mm', 'ha']
	}
	**/

	return (
		<div className="bitcoinCandleStickPlot">
		        <Chart
				  chartType="CandlestickChart"
				  data={vardata}
				  width="100%"
				  height="100%"
				  options={options}
		        />
	      </div>
	);
};
module.exports = new CandleStickGraph();