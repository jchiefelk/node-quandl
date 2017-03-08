'use strict';
import React, {Component} from 'react';
import Chart from 'chart.js';
import {Line,Bar} from 'react-chartjs-2';
var StockDataStore = require('../../stores/stockdatastore');
var Loading = require('react-loading');
var Datetime = require('react-datetime');
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MarketPicker from './marketpicker';

var moment = require('moment');
require('../../css/react-datetime.css');

export default class IntraDayTicket extends Component {

			constructor(){
				super();
				this.state = {
					data: null,
					intraday: [],
					intraDayView: null,
					companyName: null,
					startDate: null,
					endDate: null, 
					rangeSelected: false,
					market: null
				};
			}

			companyName(e){
				this.setState({companyName: e.target.value.toUpperCase() })
			}

			sendRequest(){
				let code = this.state.companyName.split(' ');
				let params = {
					code: code[0],
					market: this.state.market,
					db: 'GOOG',
					apiKey: 'hp2sm_6zVAoffDrYgzBi',
					startDate: this.state.startDate,
					endDate: this.state.endDate

				};
				console.log(params);

				this.setState({
					intraDayView: (
						<div style={{display: 'flex',  justifyContent: 'center', marginTop: 100 }}>
							<Loading type='bubbles' color='#909090' style={{height: 200, width:500}}/>
						</div>
					)	
				});
			}

			componentDidUpdate(){

				this.companyInput = (
					<div style={{display: 'flex', alignItems:'center', justifyContent: 'center', marginTop: 100, flexDirection: 'column' }}>
						
						<div style={{display: 'flex',justifyContent: 'center',alignItems:'center', flexDirection: 'column'}}>
							<h2 style={{fontStyle: 14, fontWeight: '400', fontFamily: 'Courier New'}}>Enter in stock letter code for any company listed on the NYSE.</h2>
							<h2 style={{fontStyle: 14, fontWeight: '400', fontFamily: 'Courier New'}}>For example; DB, for Deutsche Bank.</h2>
						</div>

						<div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
							<input style={{fontSize: 18, fontWeight: '700',fontFamily: 'Courier New',height:30, width: 150}} onChange={(e) => this.companyName(e) } />
							<img src="https://s3-us-west-1.amazonaws.com/cointelmob/icons/enter_icon.png" style={{width: 30, height: 30, marginLeft: 10, cursor: 'pointer'}} onClick={()=> this.sendRequest() }/>
							
							<MarketPicker  />
						</div>
					</div>
				);


				if(this.state.rangeSelected==true) {
						this.setState({rangeSelected: false});
						this.sendRequest();
				}

				if(this.state.marketSelected==true) {
					this.setState({
						marketSelected: false,
						intraDayView: this.companyInput
					});
				}
				
				if(this.state.marketData.data.length>0){
					this.setState({
						marketData: null,
						intraDayView: this.setGraphView()
					});
				}
				
			}

			componentDidMount(){
				StockDataStore.addChangeListener(this._onChange.bind(this));
				

				this.datePicker = (
					<div style={{display: 'flex',position: 'absolute', right: window.innerWidth*(0.1),alignItems:'center', justifyContent:'center' }}>
								<div style={{width: 130}}>
									<p style={{fontSize: 12,marginBottom: 10, color: 'white',fontFamily: 'Courier New'}}>Start Date</p>
												<Datetime
													style={{width: 100}}
													onBlur={(selectedDate)=> this.setStartDate(selectedDate)}
													dateFormat="YYYY-MM-DD" timeFormat={false}
												/>
								</div>

								<div style={{marginLeft: 40, width: 130}}>
									<p style={{fontSize: 12,marginBottom: 10, color: 'white',fontFamily: 'Courier New'}}>End Date</p>
												<Datetime
													style={{width: 100}}
													onBlur={(selectedDate)=> this.setEndDate(selectedDate)}
													dateFormat="YYYY-MM-DD" timeFormat={false}
												/>
								</div>

							<img src="https://s3-us-west-1.amazonaws.com/cointelmob/icons/enter_icon.png" style={{backgroundColor: 'white',width: 30, height: 30, marginLeft: 10, marginTop: 25, cursor: 'pointer'}} onClick={()=> this.setState({rangeSelected: true}) }/>

					</div>
				);

				this.companyInput = (
					<div style={{display: 'flex', alignItems:'center', justifyContent: 'center', marginTop: 100, flexDirection: 'column' }}>
						
						<div style={{display: 'flex',justifyContent: 'center',alignItems:'center', flexDirection: 'column'}}>
							<h2 style={{fontStyle: 14, fontWeight: '400', fontFamily: 'Courier New'}}>Enter in stock letter code for any company listed on the NYSE.</h2>
							<h2 style={{fontStyle: 14, fontWeight: '400', fontFamily: 'Courier New'}}>For example; DB, for Deutsche Bank.</h2>
						</div>

						<div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
							<input style={{fontSize: 18, fontWeight: '700',fontFamily: 'Courier New',height:30, width: 150}} onChange={(e) => this.companyName(e) } />
							<img src="https://s3-us-west-1.amazonaws.com/cointelmob/icons/enter_icon.png" style={{width: 30, height: 30, marginLeft: 10, cursor: 'pointer'}} onClick={()=> this.sendRequest() }/>
							

							<MarketPicker  />
						
						</div>
					</div>
				);

				this.setState({
					intraDayView: this.companyInput
				});
			}

			componentWillUnmount(){
				StockDataStore.removeChangeListener(this._onChange.bind(this));
			}

			setStartDate(selectedDate){
				this.setState({
					startDate: moment(selectedDate._d).format('YYYY-MM-DD')
				});
			}

			setEndDate(selectedDate){
				this.setState({
					endDate: moment(selectedDate._d).format('YYYY-MM-DD')
				});
			}


			_onChange(){

				this.setState({
					market: StockDataStore.getMarket(),
					marketSelected: true, 
					marketData: StockDataStore.getInradayTicketData()
				});
				console.log(this.state.market);
			}


			setGraphView(){
				let dates=[],
					close=[],
					volume=[]
					;
				for(var x =0;x<StockDataStore.getInradayTicketData().data.length;x++){
					dates.push(StockDataStore.getInradayTicketData().data[x].date);
					close.push(StockDataStore.getInradayTicketData().data[x].close);
					volume.push(StockDataStore.getInradayTicketData().data[x].volume);
				};
				this.data = {
				  labels: dates,
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
				      data: close
				    }
				  ]
				};

				this.options = {
			      title: {
			            display: true,
			            text: StockDataStore.getInradayTicketData().name,
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
					        // labelString: 'Date Year',
					        maxRotaion: 0,
					     },

		            }]
				  }
				};

				const bardata = {
				  labels: dates,
				  datasets: [
				    {
				      backgroundColor: '#909090',
				      borderColor: 'rgba(255,99,132,1)',
				      borderWidth: 1,
				      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				      hoverBorderColor: 'rgba(255,99,132,1)',
				      data: volume
				    }
				  ]
				};

				this.baroptions = {
					fullWidth: false,

				    legend: {
				            display: false
				    },
				
				    scales: {
 							
				            xAxes: [{
				                display: false, 
				                barThickness: 2,
				                type: 'time',
							    ticks: {
							    	fontFamily: 'Courier New',
							    	fontColor: 'red',
							    	fontSize: 12,
							    	maxRotation: 90 // angle in degrees
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
							     	fontSize: 16,
							     	fontColor: 'red',
							     	fontFamily: 'Courier New',
							        display: true,
							        labelString: 'Volume',
							        maxRotation: 90
							     },
			  					 ticks: {
			  					 	fontSize: 8, 
			  					 	fontColor: 'red',
			  					 	fontFamily: 'Courier New',
			  					 	stepSize: Math.max(volume),
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

				return (
						<div style={{display: 'flex',flexDirection: 'column', backgroundColor: '#414a4c', alignItems: 'center'}}>
								{this.datePicker}
							<div>
								<Line data={this.data} options={this.options} width={window.innerWidth*(0.95)} height={window.innerWidth*(0.46)} />
							</div>

							<div>
								<Bar data={bardata} options={this.baroptions} width={window.innerWidth*(0.91)} height={window.innerHeight*(0.14)}/>
    						</div>

    					</div>
    				);

			}



			render(){
				return(this.state.intraDayView);
			}
}