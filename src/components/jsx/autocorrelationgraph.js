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
						fontFamily: 'Courier New',
						legend: "none",
						backgroundColor: 'transparent',

						chartArea: {
						    backgroundColor: {
						        stroke: 'black',
						        strokeWidth: 1
						    }
						},
						vAxis: {
							title: "Correlation Coefficient",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Courier New',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 5,
						    	color: 'transparent'
						   }	
				        },
					 	hAxis: {
					 		baselineColor: 'transparent',
					 		textStyle:{
					       	   	color: 'black',
					       	   	fontName: 'Courier New',
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


Autocorrelation.prototype.setIntradayAutocorrelation = function(data){
			let line_data = [["DATE","correlation coefficient"]];
			let set = [];
			for(var x =0; x<365;x++){
				line_data.push([x, data[x] ]);
				set.push(data[x]);
			};
			let options = {
						title: 'Price Autocorrelation',
						fontFamily: 'Courier New',
						titleTextStyle: {
					        color: 'black',    // any HTML string color ('red', '#cc00cc')
					        fontName: 'Courier New', // i.e. 'Times New Roman'
					        fontSize: 18, // 12, 18 whatever you want (don't specify px)
					        bold: false,    // true or false
					        italic: false   // true of false
					    },
						legend: "none",
						chartArea: {
						    backgroundColor: {
						        stroke: 'black',
						        strokeWidth: 1
						    }
						},
						backgroundColor: 'transparent',
						vAxis: {
							title: "Correlation Coefficient",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'transparent',
				        	minValue: Math.min.apply(null,set),
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Courier New',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 2,
						    	color: 'transparent'
						   }	
				        },
					 	hAxis: {
					 	title: 'Trading Days',
						baselineColor: 'transparent',
        				 // gridlineColor: 'transparent',
					 		textStyle:{
					       	   	color: 'black',
					       	   	fontName: 'Courier New',
					       	   	fontWeight: 700
				       	   	},

				       	   	gridlines: {
						    	color: 'transparent', 
						    	count: 2
						   	}	 
					 	}
			};

				return (				
					<div className="autocorrelationgraph_intraday">
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