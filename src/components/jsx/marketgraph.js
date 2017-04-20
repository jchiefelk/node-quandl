import React from 'react';
import {Line,Bar} from 'react-chartjs-2';
var Actions = require('../../actions/actions');
var moment = require('moment');
var Datetime = require('react-datetime');
var Loading = require('react-loading');
import MarketPicker from '../components/marketpicker';
import { Router, Route, Link } from 'react-router';
import { Chart } from 'react-google-charts';
require('../css/react-datetime.css');
require('../css/marketpicker.css');
require('../css/main.css');

class MarketGraph {

	constructor(){
				this.dates=[];
				this.close=[];
				this.volume=[];
				this.startDate = null;
				this.endDate = null;
				this.companyCode = null;
				this.test=(<div id="chart_div"/>);
				this.loadingAnimation = (
						<div style={{display: 'flex',  justifyContent: 'center', marginTop: 100 }}>
							<Loading type='bubbles' color='#909090' style={{height: 500, width:500}}/>
						</div>
				);
				//
				//
				this.baroptions = {
									fullWidth: false,
								    legend: {
								            display: false
								    },
								    scales: {
				 							
								            xAxes: [{ 
								                barThickness: 2,
								                type: 'time',
											    ticks: {
											    	fontFamily: 'Courier New',
											    	fontColor: 'red',
											    	fontSize: 12,
											    	maxRotation: 0, // angle in degrees
											    	display: true,
											    	maxTicksLimit: 3, 
											    	autoSkip: true
											    },
						
								                time: {
								                    displayFormats: {
								                        quarter: 'MMM YYYY'
								                    }
								                },

								                gridLines: {
								                	 display: false,
						               		 	}
								            }],

										    yAxes: [{
											     scaleLabel: {
											     	fontSize: 24,
											     	fontColor: 'red',
											     	fontFamily: 'Courier New',
											        display: false,
											        labelString: 'Volume',
											        maxRotation: 90
											     },
							  					 ticks: {
							  					 	fontSize: 18, 
							  					 	fontColor: 'red',
							  					 	fontFamily: 'Courier New',
							  					 	stepSize: 0,
							  					 	maxRotation: 90,
							  					 	autoSkip: true,
				        							maxTicksLimit: 1,
				        							display: false
							  					 },
							  					 gridLines: {
							  					 		display: false,
							                   			color: "rgba(0, 0, 0, 0)"
							               		 }
										    }]
								    	}
				};
				//
				//
				this.lineoptions = {
					      title: {
					            display: true,
					            text: '',
					            fontColor: 'red',
					            fontSize: 30,
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
							     	fontSize: 24,
							     	fontColor: 'red',
							     	fontFamily: 'Courier New',
							        display: true,
							        labelString: 'Price (USD)'
							     },
			  					 ticks: {
			  					 	fontSize: 18, 
			  					 	fontColor: 'red',
			  					 	fontFamily: 'Courier New',
			  					 	display: true,
			  					 },
			  					 gridLines: {
			  					 		display: false,
			                   			color: "red"
			               		 }
						    }],
				            xAxes: [{
				                display: true, 
				                type: 'time',
		     					unit: 'quarter',
							    ticks: {
									fontFamily: 'Courier New',
							    	fontSize: 12, 
							    	fontColor: 'red',
							    	maxRotaion: 180,
									autoSkip: true,
		        					maxTicksLimit: 10,
		        					display: false
							       
							    },
				                time: {
				                    displayFormats: {
				                        quarter: 'MMM YYYY',
		  								maxRotaion: 0,
				                    },
				                    maxRotaion: 0,
				                 	unitStepSize: 5,
				                },
				                gridLines: {
				                	 display: false,
		                   			 color: "red"
		               		 	},
		               		 	scaleLabel: {
							     	fontSize: 20,
							     	fontColor: 'red',
							     	fontFamily: 'Courier New',
							        display: true,
							        maxRotaion: 0,
							     }
				            }]
						  }
				};
				//
				//
				this.linedata = {
					  labels: this.dates,
					  animation: false,
					  datasets: [
					    { 
				      	  fill: false,
					      lineTension: 0.1,
					      backgroundColor: 'black',
					      borderColor: 'black',
					      borderCapStyle: 'butt',
					      borderDash: [],
					      borderDashOffset: 0.0,
					      borderJoinStyle: 'miter',
					      pointBorderColor: 'black',
					      pointBackgroundColor: 'black',
					      pointBorderWidth: 1,
					      pointHoverRadius: 5,
					      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
					      pointHoverBorderColor: 'rgba(220,220,220,1)',
					      pointHoverBorderWidth: 2,
					      pointRadius: 1,
					      pointHitRadius: 10,
					      data: this.close
					    }
					  ]
				};
				//
				//
				this.bardata = {
				  labels: this.dates,
				  datasets: [
				    {
				      backgroundColor: '#909090',
				      borderColor: 'rgba(255,99,132,1)',
				      borderWidth: 1,
				      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				      hoverBorderColor: 'rgba(255,99,132,1)',
				      data: this.volume
				    }
				  ]
				};
	}


	setMarketFundGraph(data){
		
		let d = {
		  labels: data.xValues,
		  datasets: [
		    {
		      label: data.name,
		      fill: false,
		      lineTension: 0.1,
		     //  backgroundColor: 'white',
		      // borderColor: 'white', // line color
		      backgroundColor: 'rgba(75,192,192,0.4)',
		      borderColor: 'rgba(75,192,192,1)',

		     //  borderColor: 'rgba(255,99,132,1)',
		      borderCapStyle: 'butt',
		      borderDash: [],
		      borderDashOffset: 0.0,
		      borderJoinStyle: 'miter',
		      pointBorderHeight: 100,
		      pointBorderColor: 'rgba(75,192,192,1)',
		      pointBackgroundColor: '#fff',
		      pointBorderWidth: 1,
		      pointHoverRadius: 5,
		      pointHoverBackgroundColor: 'black',
		      pointHoverBorderColor: 'black',
		      pointHoverBorderWidth: 2,
		      pointRadius: 1,
		      pointHitRadius: 10,
		      data: data.yValues
		    }
		  ]
		};	


		let options = {

						  responsive: true,
					      title: {
					            display: true,
					            text: data.name,
					            fontColor: 'white',
					            fontSize: 14,
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
							        labelString: 'Price (USD)'
							     },
			  					 ticks: {
			  					 	fontSize: 12, 
			  					 	fontColor: 'white',
			  					 	fontFamily: 'Courier New',
			  					 	display: true,
			  					 },
			  					 gridLines: {
			  					 		display: false,
			                   			color: "white"
			               		 }
						    }],

							xAxes: [{  
								                type: 'time',
											    ticks: {
											    	fontFamily: 'Courier New',
											    	fontColor: 'white',
											    	fontSize: 12,
											    	maxRotation: 0, // angle in degrees
											    	display: true,
											    	maxTicksLimit: 4, 
											    	autoSkip: true
											    },
						
								                time: {
								                    displayFormats: {
								                        quarter: 'MMM YYYY'
								                    },
								                },

								                gridLines: {
								                	 display: false,
								                	 color: "white"
						               		 	},
								}],
						  }
		};

		return (				
				<div className="marketgraph">
					<Line data={d} options={options} height={window.innerHeight*(0.22)} weight={window.innerWidth*(0.4)}/>
				</div>				
    	);
	}

	setAutocorrelationGraph(data){

		this.linedata.datasets.data = data.autocorrelation.yValues; // y-values
		this.linedata.labels = data.autocorrelation.xValues; // x-values
		this.lineoptions.title.text = data.name; // chart-name
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
							<Line data={d} options={options} height={window.innerHeight*(0.1)}/>
						</div>
		    	);
	}



	setIntradayAutocorrelation(data){

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
	}





	setIntradayGraphView(data,autocorr,name){
				this.dates=[];
				this.close=[];
				this.volume=[];
				//
				let linedata = {
					  labels: this.dates,
					  animation: false,
					  datasets: [
					    { 
				      	  fill: true,
					      lineTension: 0.1,
					      lineTension: 0.1,
					      backgroundColor: "transparent",
					      borderColor: 'rgba(255,99,132,1)',
					      borderCapStyle: 'butt',
					      borderDash: [],
					      borderDashOffset: 0.0,
					      borderJoinStyle: 'miter',
					      pointBorderColor: 'black',
					      pointBackgroundColor: 'black',
					      pointBorderWidth: 1,
					      pointHoverRadius: 5,
					      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
					      pointHoverBorderColor: 'rgba(220,220,220,1)',
					      pointHoverBorderWidth: 2,
					      pointRadius: 2,
					      pointHitRadius: 10,
					      data: this.close
					    }
					  ]
				};
				let lineoptions = {
					      title: {
					            display: true,
					            text: '',
					            fontColor: 'white',
					            fontSize: 30,
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
							        labelString: 'Price (USD)'
							     },
			  					 ticks: {
			  					 	fontSize: 12, 
			  					 	fontColor: 'white',
			  					 	fontFamily: 'Courier New',
			  					 	display: true,
			  					 },
			  					 gridLines: {
			  					 		display: false,
			                   			color: "rgba(0, 0, 0, 0)"
			               		 }
						    }],
							xAxes: [{
								              
								                type: 'time',
											    ticks: {
											    	fontFamily: 'Courier New',
											    	fontColor: 'white',
											    	fontSize: 12,
											    	maxRotation: 0, // angle in degrees
											    	display: true,
											    	maxTicksLimit: 4, 
											    	autoSkip: true
											    },
						
								                time: {
								                    displayFormats: {
								                        quarter: 'MMM YYYY'
								                    },
								                },

								                gridLines: {
								                	 display: false,
						               		 	},
								}]
						  }
				};

				
				let baroptions = {
									fullWidth: false,
								    legend: {
								            display: false
								    },
								    scales: {
				 							
								            xAxes: [{ 
								                barThickness: 2,
								                type: 'time',
											    ticks: {
											    	fontFamily: 'Courier New',
											    	fontColor: 'red',
											    	fontSize: 12,
											    	maxRotation: 90, // angle in degrees
											    	display: false,
											    	maxTicksLimit: 3, 
											    	autoSkip: true
											    },
						
								                time: {
								                    displayFormats: {
								                        quarter: 'MMM YYYY'
								                    }
								                },

								                gridLines: {
								                	 display: false,
						               		 	}
								            }],

										    yAxes: [{
											     scaleLabel: {
											     	fontSize: 24,
											     	fontColor: 'red',
											     	fontFamily: 'Courier New',
											        display: false,
											        labelString: 'Volume',
											        maxRotation: 90
											     },
							  					 ticks: {
							  					 	fontSize: 18, 
							  					 	fontColor: 'red',
							  					 	fontFamily: 'Courier New',
							  					 	stepSize: 0,
							  					 	maxRotation: 90,
							  					 	autoSkip: true,
				        							maxTicksLimit: 1,
				        							display: false
							  					 },
							  					 gridLines: {
							  					 		display: false,
							                   			color: "rgba(0, 0, 0, 0)"
							               		 }
										    }]
								    	}
				};

				let bardata = {
				  labels: this.dates,
				  datasets: [
				    {
				      backgroundColor: '#909090',
				      borderColor: 'rgba(255,99,132,1)',
				      borderWidth: 1,
				      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				      hoverBorderColor: 'rgba(255,99,132,1)',
				      data: this.volume
				    }
				  ]
				};
				for(var x =0;x<data.length;x++){
					this.dates.push(data[x].date);
					this.close.push(data[x].close);
					this.volume.push(data[x].volume);
				};
				linedata.datasets.data = this.close;
				linedata.labels = this.dates;
				this.lineoptions.title.text = name;
				this.bardata.datasets.data = this.volume;
				this.bardata.labels = this.dates;
				this.baroptions.scales.yAxes[0].ticks.stepSize = Math.max(this.volume);

				return (
						<div style={{backgroundColor: 'transparent'}}>
								
								<div style={{display: 'flex', justifyContent: 'center'}}>
									{this.setCompanyPicker()}
									{this.setDatePicker()}
								</div>

								<div style={{display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
									<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
											<div className="intradaylinegraph">
												<Line data={linedata} options={lineoptions}  height={window.innerHeight*(0.25)}/>
											</div>
										
											<div className="intradaybargraph">
												<Bar data={bardata} options={baroptions} height={30} />
			    							</div>
			    					</div>

			    					<div style={{marginTop: window.innerHeight*(0.05)}}>
										{this.setIntradayAutocorrelation(autocorr)}
									</div>

		    					</div>
    					</div>
    				);

	}


	setIntradayGraphGoogleView(data,autocorr,name){

					// Math.max(this.volume);
					let line_data = [["DATE","val1"]];
					// let bar_data = [[ "DATE", "val1", { role: "style" }  ]];
	      			let bar_data = [
				        ['Month', 'Volume']
			      	];
					for(var x =0; x<data.length;x++){
						line_data.push([data[x].date, data[x].close ]);
						bar_data.push([data[x].date, parseFloat(data[x].volume) ]);
					};

					let options = {
						legend: "none",
						backgroundColor: 'transparent',
						vAxis: {
							title: "USD $",	
							titleTextStyle: { color: '#FFF' },
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Courier New',
				        		color: 'white',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	color: 'transparent', 
						    	count: 4
						   }	  
				        },
					 	hAxis: {
					 		 textStyle:{
					       	   	color: 'transparent',
					       	   	fontName: 'Courier New',
					       	   	fontWeight: 700
				       	   	},
					 	}
					
					};

			      var bardata = [
				        ['Month', 'Volume'],
				        ['Application', 5],
				        ['Friend', 4],
				        ['Newspaper', 6],
				        ['Radio', 8],
				        ['No Referral', 2]
			      ];

				  var baroptions = {
	
						 isStacked:true,
						 
				         vAxis: {	
				        	
				        	textStyle: {
				        		fontSize: 10,
				        		fontName: 'Courier New',
				        		color: 'white',
				        		fontWeight: 700,
				        		width: 100
				        	},
				        	gridlines: {
						    	color: 'transparent', 
						    	count: 4
						   }
						  
				        },
				     
				     	
				        hAxis: {
			
				        	textStyle: {
				        		fontSize: 10,
				        		fontName: 'Courier New',
				        		color: 'white',
				        		fontWeight: 700,
				        	},
				        	
				        	gridlines: {
						    	color: 'white', 
						    	count: 4
						   }
		
				        },

				        legend: {position: 'none'},
				        backgroundColor: 'transparent'
				    };

					return (
					


					<div style={{backgroundColor: 'transparent'}}>
								
								<div style={{display: 'flex', justifyContent: 'center'}}>
									{this.setCompanyPicker()}
									{this.setDatePicker()}
								</div>

								<div style={{display: 'flex', flexDirection: 'column'}}>
								
								<div className="intradaylinegraph">
								        <Chart
										  chartType="LineChart"
										  data={line_data}
										  width="100%"
										  height="100%"
										  options={options}
								        />
			    				</div>


								<div className="intradaybargraph">
								        <Chart
										  chartType="ColumnChart"
										  data={bar_data}
										  width="100%"
										  height="100%"
										  options={baroptions}
								        />
			    				</div>
			    				</div>
						</div>
	    			);
	}


	setDatePicker(){

		this.datePicker = (
					<div className="market-date-picker-container">

								<div className="date-input">
									<p className="date-text">Start Date</p>
											<Datetime
													className="date-input"
													onBlur={(selectedDate)=> this.setStartDate(selectedDate)}
													dateFormat="YYYY-MM-DD" timeFormat={false}
										/>
								</div>

								<div className="date-input">
									<p className="date-text">End Date</p>
												<Datetime
													className="date-input"
													onBlur={(selectedDate)=> this.setEndDate(selectedDate)}
													dateFormat="YYYY-MM-DD" timeFormat={false}
												/>
								</div>

							<img src="https://s3-us-west-1.amazonaws.com/cointelmob/icons/enter_icon.png" className="submit-button" onClick={()=> Actions.updatesendRequest() }	/>

					</div>
		);
		return this.datePicker;
	}


	setCompanyPicker(){

		this.companyPicker = (
					<div className="pickercontainer">
						
						<div className="marketpicker">
							<input className="homepage-input" placeholder="Enter stock code" onChange={(e) => this.updatecompanyCode(e) } />
							
							<Link to="/intradaypage" onClick={()=> Actions.updatesendRequest() }>
								<img src="https://s3-us-west-1.amazonaws.com/cointelmob/icons/enter_icon.png" style={{width: 30, height: 30, marginLeft: 10,marginTop: 4, cursor: 'pointer'}} />
							</Link>
							<MarketPicker  />
						</div>

					</div>
		);

		return this.companyPicker;
	}

	setLoadingAnimation(){
		return this.loadingAnimation;
	}

	updatecompanyCode(e){
		this.companyCode = e.target.value.toUpperCase();
		Actions.updateCompanyCode(this.companyCode);
	}
	// 
	// Worker Functions
	//
	setStartDate(selectedDate){
			this.startDate = moment(selectedDate._d).format('YYYY-MM-DD');	
			Actions.setStartDate(this.startDate);	
	}

	setEndDate(selectedDate){
			this.endDate = moment(selectedDate._d).format('YYYY-MM-DD');	
			Actions.setEndDate(this.endDate);
	}


};

module.exports = new MarketGraph();