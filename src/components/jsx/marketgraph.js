import React from 'react';
import Chart from 'chart.js';
import {Line,Bar} from 'react-chartjs-2';
var Actions = require('../../actions/actions');
var moment = require('moment');
var Datetime = require('react-datetime');
var Loading = require('react-loading');
import MarketPicker from '../components/marketpicker';

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
				this.loadingAnimation = (
						<div style={{display: 'flex',  justifyContent: 'center', marginTop: 100 }}>
							<Loading type='bubbles' color='#909090' style={{height: 200, width:500}}/>
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
											    	maxRotation: 90, // angle in degrees
											    	display: true,
											    	maxTicksLimit: 10, 
											    	autoSkip: true
											    },
						
								                time: {
								                    displayFormats: {
								                        quarter: 'MMM YYYY'
								                    }
								                },

								                gridLines: {
								                	 display: false,
						               		 	},
								            }],

										    yAxes: [{
											     scaleLabel: {
											     	fontSize: 24,
											     	fontColor: 'red',
											     	fontFamily: 'Courier New',
											        display: true,
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
			                   			color: "rgba(0, 0, 0, 0)"
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
		                   			 color: "rgba(0, 0, 0, 0)"
		               		 	},
		               		 	scaleLabel: {
							     	fontSize: 20,
							     	fontColor: 'red',
							     	fontFamily: 'Courier New',
							        display: true,
							        maxRotaion: 0,
							     },

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
					      fill: true,
					      lineTension: 0.1,
					      backgroundColor: '#909090',
					      borderColor: 'red',
					      borderCapStyle: 'butt',
					      borderDash: [],
					      borderDashOffset: 0.0,
					      borderJoinStyle: 'miter',
					      pointBorderColor: 'red',
					      pointBackgroundColor: 'red',
					      pointBorderWidth: 1,
					      pointHoverRadius: 5,
					      pointHoverBackgroundColor: 'red',
					      pointHoverBorderColor: 'red',
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


	setGraphView(data,name){
				// console.log(data);
				for(var x =0;x<data.length;x++){
					this.dates.push(data[x].date);
					this.close.push(data[x].close);
					this.volume.push(data[x].volume);
				};
				this.linedata.datasets.data = this.close;
				this.linedata.labels = this.dates;
				this.lineoptions.title.text = name;
				this.bardata.datasets.data = this.volume;
				this.bardata.labels = this.dates;
				this.baroptions.scales.yAxes[0].ticks.stepSize = Math.max(this.volume);

		
				return (
						<div className="graph-page">
								
								{this.setDatePicker()}
								
								<div className="linegraph">
									<Line data={this.linedata} options={this.lineoptions}  />
						
								</div>
							
								<div className="bargraph">
									<Bar data={this.bardata} options={this.baroptions} height={50}/>
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

							<img src="https://s3-us-west-1.amazonaws.com/cointelmob/icons/enter_icon.png" onClick={()=> Actions.updatesendRequest() }	className="submit-button"/>

					</div>
		);
		return this.datePicker;
	}


	setCompanyPicker(){
		this.companyPicker = (
					<div className="homepage">
						
						<div className="homepage-instructions">
							<div>Enter in stock letter code for any company listed on the NYSE.</div>
							<div>For example; DB, for Deutsche Bank.</div>
						</div>

						<div className="homepage-marketpicker">
							<input className="homepage-input" onChange={(e) => this.updatecompanyCode(e) } />
							<img src="https://s3-us-west-1.amazonaws.com/cointelmob/icons/enter_icon.png" style={{width: 30, height: 30, marginLeft: 10, cursor: 'pointer'}} onClick={()=> Actions.updatesendRequest() }/>
							
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
	}

	setEndDate(selectedDate){
			this.endDate = moment(selectedDate._d).format('YYYY-MM-DD');	
	}


};

module.exports = new MarketGraph();