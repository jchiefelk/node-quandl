import React from 'react';
import {Line,Bar} from 'react-chartjs-2';
require('../css/main.css');

function Autocorrelation(){
	this.graphView = null;
};

Autocorrelation.prototype.setAutocorrelationGraph = function(data){

		console.log(data);
		let d = {
		  labels: data.autocorrelation.xValues,
		  datasets: [
		    {
		      fill: false,
		      lineTension: 0.1,
		      backgroundColor: 'white',
		      borderColor: 'white', // line color
		      borderCapStyle: 'butt',
		      borderDash: [],
		      borderDashOffset: 0.0,
		      borderJoinStyle: 'miter',
		      pointBorderColor: 'white',
		      pointBackgroundColor: 'black',
		      pointBorderWidth: 1,
		      pointHoverRadius: 5,
		      pointHoverBackgroundColor: 'black',
		      pointHoverBorderColor: 'black',
		      pointHoverBorderWidth: 1,
		      pointRadius: 0.7,
		      pointHitRadius: 10,
		      data: data.autocorrelation.yValues
		    }
		  ]
		};	
		let options = {
			 			  responsive: true,
					      title: {
					            display: true,
					            text: 'Historical 200-day Autocorrelation',
					            fontColor: 'white',
					            fontSize: 10,
					            fontFamily: 'Courier New',
					            fontWeight: '200'
					      },
						  showLines: true, 
					      legend: {
					            display: false,
					      },

						  scales: {
						    yAxes: [{
							     scaleLabel: {
							     	fontSize: 8,
							     	fontColor: 'white',
							     	fontFamily: 'Courier New',
							        display: false,
							        labelString: 'Autocorrelation'
							     },
			  					 ticks: {
			  					 	fontSize: 8, 
			  					 	fontColor: 'white',
			  					 	fontFamily: 'Courier New',
			  					 	display: true,
			  					 	max: 1.4,    
                        			min: 0
			  					 },
			  					 gridLines: {
			  					 		display: false,
			                   			color: "white"
			               		 }
						    }],
							xAxes: [{  
									ticks: {
										fontFamily: 'Courier New',
										fontColor: 'white',
										fontSize: 8,
										maxRotation: 0, // angle in degrees
										display: true,
										maxTicksLimit: 5, 
										autoSkip: true,
										max: 200,    
                        				min: 0
									},
								    gridLines: {
								         display: false,
								         color: "white"
						            },
							}]
						  }
		};

		return (
			<div className="autocorrelationgraph">
				<Line data={d} options={options} height={window.innerHeight*(0.13)}/>
			</div>
		);
	
};


Autocorrelation.prototype.setIntradayAutocorrelation = function(data){
		let tau = [];
		for(var x=0; x<1500;x++){
			tau.push(x);
		};
		let d = {
		  labels: tau,
		  datasets: [
		    {
		      fill: false,
		      lineTension: 0.1,
		      backgroundColor: 'white',
		      borderColor: 'white', // line color
		      borderCapStyle: 'butt',
		      borderDash: [],
		      borderDashOffset: 0.0,
		      borderJoinStyle: 'miter',
		      pointBorderColor: 'white',
		      pointBackgroundColor: 'black',
		      pointBorderWidth: 1,
		      pointHoverRadius: 5,
		      pointHoverBackgroundColor: 'black',
		      pointHoverBorderColor: 'black',
		      pointHoverBorderWidth: 1,
		      pointRadius: 2,
		      pointHitRadius: 10,
		      data: data
		    }
		  ]
		};	
		let options = {
			 			  responsive: true,
					      title: {
					            display: true,
					            text: 'Historical 200-day Autocorrelation',
					            fontColor: 'white',
					            fontSize: 12,
					            fontFamily: 'Courier New',
					            fontWeight: '200'
					      },
						  showLines: true, 
					      legend: {
					            display: false,
					      },

						  scales: {
						    yAxes: [{
							     scaleLabel: {
							     	fontSize: 12,
							     	fontColor: 'white',
							     	fontFamily: 'Courier New',
							        display: false,
							        labelString: 'Autocorrelation'
							     },
			  					 ticks: {
			  					 	fontSize: 12, 
			  					 	fontColor: 'white',
			  					 	fontFamily: 'Courier New',
			  					 	display: true,
			  					 	max: 1.4,    
                        			min: 0
			  					 },
			  					 gridLines: {
			  					 		display: false,
			                   			color: "white"
			               		 }
						    }],
							xAxes: [{  
									ticks: {
										fontFamily: 'Courier New',
										fontColor: 'white',
										fontSize: 12,
										maxRotation: 0, // angle in degrees
										display: true,
										maxTicksLimit: 5, 
										autoSkip: true,
										max: 200,    
                        				min: 0
									},
								    gridLines: {
								         display: false,
								         color: "white"
						            },
							}]
						  }
				};

				return (				
						<div className="autocorrelationgraph_intraday">
							<Line data={d} options={options} height={window.innerHeight*(0.2)}/>
						</div>
		    	);
};






module.exports = new Autocorrelation();