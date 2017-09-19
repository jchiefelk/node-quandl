import React from 'react';
import { Chart } from 'react-google-charts';

function Autocorrelation(){
	this.graphView = null;
};

Autocorrelation.prototype.setGoogleAutocorr = function(data){
			let line_data = [["DATE","correlation coefficient"]];
			for(var x =0; x<200; x++){
					line_data.push([x, data.autocorrelation.yValues[x] ]);
			};
			let options = {
						title: 'Historical 1 year Momentum',
						fontFamily: 'Arial',
						legend: "none",
						backgroundColor: 'transparent',
						/**
						chartArea: {
						    backgroundColor: {
						        stroke: 'black',
						        strokeWidth: 1
						    }
						},
						**/
						vAxis: {
							title: "Correlation Coefficient",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 2,
						    	color: 'black'
						   }	
				        },
					 	hAxis: {
					 		baselineColor: 'transparent',
					 		textStyle:{
					       	   	color: 'black',
					       	   	fontName: 'Arial',
					       	   	fontWeight: 700
				       	   	},
				       	   	gridlines: {
						    	count: 10,
						    	color: 'transparent'
						   	}	 
					 	}	
			};

			return (
				<div className="autocorrelationgraph">
					<Chart
						chartType="LineChart"
						data={line_data}
						width="100%"
						height="100%"
						options={options}
						/>
				</div>
			);
};


Autocorrelation.prototype.setIntradayAutocorrelation = function(data,historyoptions){
			let line_data = [["DATE","correlation coefficient"]];
			let set = [];
			for(var x =0; x<365;x++){
				line_data.push([x, data[x] ]);
				set.push(data[x]);
			};
		
			let max = Math.max.apply(null, set );
			let min = Math.min.apply(null, set);

			let options = {
						title: 'Price Autocorrelation',
						fontFamily: 'Arial',

						titleTextStyle: {
					        color: 'black',    // any HTML string color ('red', '#cc00cc')
					        fontName: 'Arial', // i.e. 'Times New Roman'
					        fontSize: 18, // 12, 18 whatever you want (don't specify px)
					        bold: false,    // true or false
					        italic: false   // true of false
					    },
						legend: "none",
						/**
						chartArea: {
						    backgroundColor: {
						        stroke: 'black',
						        strokeWidth: 1
						    }
						},
						**/
						backgroundColor: 'transparent',
						vAxis: {
							title: "Correlation Coefficient",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 2,
						    	color: 'black'
						   },
							viewWindowMode:'explicit',
							viewWindow:{
									max: max,
									min: min
							}	
				        },
					 	hAxis: {
					 	title: null,
						baselineColor: 'transparent',
        				 // gridlineColor: 'transparent',
					 		textStyle:{
					       	   	color: 'black',
					       	   	fontName: 'Arial',
					       	   	fontWeight: 700
				       	   	},

				       	   	gridlines: {
						    	color: 'transparent', 
						    	count: 2
						   	}	 
					 	}
			};

				// console.log(historyoptions);
				if(historyoptions.history=='weekly') options.hAxis.title = 'trading days - weekly lag';
				if(historyoptions.history=='daily') options.hAxis.title = 'trading days - daily lag';
				if(historyoptions.history=='intraday') options.hAxis.title = 'intraday -'+historyoptions.timesteps+' lag'; // 1min
				if(historyoptions=='intraday') options.hAxis.title = 'intraday -'+historyoptions.timesteps+' lag'; //5 min
				if(historyoptions=='intraday') options.hAxis.title = 'intraday -'+historyoptions.timesteps+' lag'; //15 min
				if(historyoptions=='intraday') options.hAxis.title = 'intraday -'+historyoptions.timesteps+' lag'; //30 min
				if(historyoptions=='intraday') options.hAxis.title = 'intraday -'+historyoptions.timesteps+' lag'; //60 min
	
				return (				
					<div  className="intradaylinegraph">
							<Chart
								chartType="LineChart"
								data={line_data}
								width="100%"
								height="100%"
								options={options}
							/>
					</div>
		    	);
};



module.exports = new Autocorrelation();