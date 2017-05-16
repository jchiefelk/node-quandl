import React from 'react';
import { Chart } from 'react-google-charts';
require('../css/main.css');

function Autocorrelation(){
	this.graphView = null;
};

Autocorrelation.prototype.setGoogleAutocorr = function(data){
			let line_data = [["DATE","valuation"]];
			for(var x =0; x<data.xValues.length;x++){
					line_data.push([x, data.autocorrelation.yValues[x] ]);
			};
			let options = {
						title: 'Historical 1 year Momentum',
						legend: "none",
						backgroundColor: 'transparent',
						vAxis: {
							baselineColor: 'black',
							title: "Correlation Coefficient",	
							titleTextStyle: { color: 'black' },
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Courier New',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	color: 'transparent', 
						    	count: 5
						   }	
				        },
					 	hAxis: {
					 	baselineColor: 'black',
					 		textStyle:{
					       	   	color: 'black',
					       	   	fontName: 'Courier New',
					       	   	fontWeight: 700
				       	   	},
				       	   	gridlines: {
						    	color: 'transparent', 
						    	count: 10
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
			let line_data = [["DATE","valuation"]];
			let set = [];
			for(var x =0; x<365;x++){
				line_data.push([x, data[x] ]);
				set.push(data[x]);
			};
			
			console.log(Math.min.apply(null,set));

			let options = {
						title: 'Historical 1 year Momentum',
						legend: "none",
						backgroundColor: 'transparent',

						vAxis: {
							title: "Correlation Coefficient",	
							titleTextStyle: { color: 'black' },
							// gridlineColor: 'transparent',

							baselineColor: 'transparent',
				        	minValue: Math.min.apply(null,set),
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Courier New',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},

				        	gridlines: {
						    	count: 5
						   }	

				        },
					 	hAxis: {
						baselineColor: 'transparent',
        				 // gridlineColor: 'transparent',
					 		textStyle:{
					       	   	color: 'black',
					       	   	fontName: 'Courier New',
					       	   	fontWeight: 700
				       	   	},

				       	   	gridlines: {
						    	// color: 'transparent', 
						    	count: 5
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