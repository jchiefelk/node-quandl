'use strict';
import React, {Component} from 'react';
var Quandl = require('../../api_utls/quandl');
import Chart from 'chart.js';
import {Line,Bar} from 'react-chartjs-2';
var StockDataStore = require('../../stores/stockdatastore');
var Loading = require('react-loading');

export default class IntraDayTicket extends Component {

			constructor(){
				super();
				this.state = {
					data: null,
					intraday: [],
					intraDayView: null,
					companyName: null
				};
			}

			companyName(e){
				this.setState({companyName: e.target.value.toUpperCase() })
			}

			sendRequest(){
				let code = this.state.companyName.split(' ');
				let params = {
					code: code[0],
					market: 'NYSE',
					db: 'GOOG',
					apiKey: 'hp2sm_6zVAoffDrYgzBi'
				};
				Quandl.getIntraDayTicket(params);
				this.setState({
					intraDayView: (
						<div style={{display: 'flex',  justifyContent: 'center', marginTop: 100 }}>
							<Loading type='bubbles' color='#909090' style={{height: 200, width:500}}/>
						</div>
					)	
				});
			}

			componentDidMount(){
				StockDataStore.addChangeListener(this._onChange.bind(this));
				this.companyInput = (
					<div style={{display: 'flex',  justifyContent: 'center', marginTop: 100, flexDirection: 'column' }}>

						<h2 style={{fontStyle: 14, fontWeight: '400', fontFamily: 'Courier New'}}>Enter in stock letter code for any company listed on the NYSE.</h2>
						<h2 style={{fontStyle: 14, fontWeight: '400', fontFamily: 'Courier New'}}>For example; DB, for Deutsche Bank.</h2>
						
						<div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
							<input style={{fontSize: 18, fontWeight: '700',fontFamily: 'Courier New',height:30, width: 150}} onChange={(e) => this.companyName(e) } />
							<img src="https://s3-us-west-1.amazonaws.com/cointelmob/icons/enter_icon.png" style={{width: 30, height: 30, marginLeft: 10, cursor: 'pointer'}} onClick={()=> this.sendRequest() }/>
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

			_onChange(){

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
				    	 display: true,
					     scaleLabel: {
					     	fontSize: 14,
					     	fontColor: 'red',
					     	fontFamily: 'Courier New',
					        display: true
					     },
	  					 ticks: {
	  					 	fontSize: 14, 
	  					 	fontColor: 'red',
	  					 	fontFamily: 'Courier New',

	  					 },
	  					 gridLines: {
	  					 		display: false,
	                   			color: "rgba(0, 0, 0, 0)"
	               		 }
				    }],
		            xAxes: [{
		                display: false, 
		                type: 'time',
					    ticks: {
							fontFamily: 'Courier New',
					    	fontSize: 18, 
					    	fontColor: 'red'
					    },
		                time: {
		                    displayFormats: {
		                        quarter: 'MMM YYYY'
		                    }
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
					        labelString: 'Date Year'
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

				let baroptions = {
					fullWidth: false,

				    legend: {
				            display: false
				    },
				
				    scales: {
 							
				            xAxes: [{
				                display: true, 
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
							     display: true,
							     scaleLabel: {
							     	fontSize: 10,
							     	fontColor: 'red',
							     	fontFamily: 'Courier New',
							        display: true,
							        labelString: 'Volume',
							        maxRotation: 180
							     },
			  					 ticks: {
			  					 	fontSize: 8, 
			  					 	fontColor: 'red',
			  					 	fontFamily: 'Courier New'
			  					 },
			  					 gridLines: {
			  					 		display: false,
			                   			color: "rgba(0, 0, 0, 0)"
			               		 }

						    }]
				    	}
				};


				this.setState({
					intraDayView: (
						<div style={{display: 'flex',flexDirection: 'column', backgroundColor: '#414a4c', alignItems: 'center'}}>
							


							<Line data={this.data} options={this.options}  width={window.innerWidth*(0.4)} height={window.innerHeight*(0.27)}/>
							<Bar data={bardata} options={baroptions} width={window.innerWidth*(0.7)} height={window.innerHeight*(0.2)} />
    					</div>
    				)
				});
			}

			render(){
				return(this.state.intraDayView);
			}
}