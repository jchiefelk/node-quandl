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
	}

	setMarketGoogleGraph(data){

				let line_data = [["DATE","valuation"]];
				for(var x =0; x<data.xValues.length;x++){
					line_data.push([data.xValues[x], data.yValues[x] ]);
				};

				let options = {
						title: data.name,
						legend: "none",
						backgroundColor: 'transparent',
						
						vAxis: {
							title: "USD $",	
							titleTextStyle: { color: '#FFF' },
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

					 		textStyle:{
					       	   	color: 'black',
					       	   	fontName: 'Courier New',
					       	   	fontWeight: 700
				       	   	},

				       	   	gridlines: {
						    	color: 'black', 
						    	count: 5
						   	}	 
					 	
					 	}
					
				};

			return (
				<div className="marketgraph">
					<Chart
						chartType="LineChart"
						data={line_data}
						width="100%"
						height="100%"
						options={options}
						/>
				</div>
			);



	}


	setIntradayGraphGoogleView(data,autocorr,name){
				let line_data = [["DATE","val1"]];
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