import React from 'react';
var Actions = require('../../actions/actions');
var moment = require('moment');
var Datetime = require('react-datetime');
var Loading = require('react-loading');
import MarketPicker from '../components/marketpicker';
import { Router, Route, Link } from 'react-router';
import { Chart } from 'react-google-charts';
let API = require('../../api_utls/api');


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
					<div className="intradaypage">
						<div style={{display: 'flex',  justifyContent: 'center', marginTop: 100 }}>
							<Loading type='bubbles' color='#909090' style={{height: 500, width:500}}/>
						</div>
					</div>
				);
	}
	setBitcoinGraph(data,daterange){

			let line_data = [["DATE","valuation"]];
			for(var x = data.length-1; x>=0; x--){
					line_data.push([new Date(data[x].time), data[x].average ]);
			};
			// title: data.name,
			let options = {
					    titleTextStyle: {
					        color: 'black',    // any HTML string color ('red', '#cc00cc')
					        fontName: 'Courier New', // i.e. 'Times New Roman'
					        fontSize: 18, // 12, 18 whatever you want (don't specify px)
					        bold: false,    // true or false
					        italic: false   // true of false
					    },
						legend: "none",
						backgroundColor: 'transparent',
						vAxis: {
							title: "",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 14,
				        		fontName: 'Courier New',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 5
						   	}	
				        },
					 	hAxis: {
							title: "",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 14,
				        		fontName: 'Courier New',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 5
						   	},
						   	format:	null
					 	}
			};
			if(daterange=='monthly' || daterange=='alltime'){
					options.format = 'MMM d, y'
			} else if(daterange=='daily'){
				options.format = ['HH:mm', 'ha']
			}
			return (
				<div className="bitcoingraph">
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
							title: "",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 10,
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
					 		textStyle:{
					       	   	color: 'black',
					       	   	fontName: 'Courier New',
					       	   	fontWeight: 700,
					       	   	fontSize: 10
				       	   	},
				       	   	gridlines: {
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

	setDateRange(dateRange,timeSteps){
		console.log(dateRange,timeSteps);
		Actions.updateStockHistoryOption(dateRange,timeSteps);
		Actions.updatesendRequest();
		let code = this.companyCode.split(' ');
		let params = {
			code: code[0],	
			daterange: dateRange,
			timeSteps: timeSteps
		};
		API.getStockPrice(params);	
	}

	setIntradayGraphGoogleView(data,name){
				let line_data = [["DATE","val1"]];
	      		let bar_data = [
				        ['Month', 'Volume']
			    ];
				for(var x =data.length-1; x>=0;x--){
						line_data.push([data[x].date, data[x].close ]);
						bar_data.push([data[x].date, parseFloat(data[x].volume) ]);
				};
	
				let options = {

						title: name,
					    titleTextStyle: {
					        color: 'black',    // any HTML string color ('red', '#cc00cc')
					        fontName: 'Courier New', // i.e. 'Times New Roman'
					        fontSize: 18, // 12, 18 whatever you want (don't specify px)
					        bold: false,    // true or false
					        italic: false   // true of false
					    },
	
						legend: "none",
						backgroundColor: 'transparent',
						vAxis: {
							title: "",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Courier New',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 4
						   }	  
				        },
					 	hAxis: {
					 		baselineColor: 'transparent',
					 		textStyle:{
					       	   	color: 'black',
					       	   	fontName: 'Courier New',
					       	   	fontWeight: 700,
					       	   	fontSize: 12
				       	   	},
				        	gridlines: {
						    	count: 2
						   },
						   format: 'MMM d, y'
					 	}
				};
				let baroptions = {
						isStacked:true,
						fontFamily: 'Courier New',
						backgroundColor: 'transparent',
						vAxis: {
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 0,
				        		fontName: 'Courier New',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 0
						   }	  
				        },
				        hAxis: {
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 8,
				        		fontName: 'Courier New',
				        		color: 'black',
				        		fontWeight: 700,
				        	},
				        	gridlines: {
						    	count: 2
						   },
						   format: 'MMM d, y'
				        },
				        legend: {position: 'none'}
				   };
				   	//
				   	//
				   	//
				   	// 
					return (
						<div>	
							
						


							

					
							<div className="intradaylinegraph">
											        <Chart
													  chartType="LineChart"
													  data={line_data}
													  width="100%"
													  height="100%"
													  options={options}
											        />
						    </div>

				    	
						</div>
	    			);
	}

	setHistoryRangePicker(){

			return (
					<div className="history_options">
					{this.setCompanyPicker()}		
								<label>
									 Intraday
									 <select onChange={(e) => this.setDateRange('intraday',e.target.value)}>
									 	<option>1min</option>
									 	<option>5min</option>
									 	<option>15min</option>
									 	<option>30min</option>
									 	<option>60min</option>
									 </select>

								</label>
								<label onClick={() => this.setDateRange('daily',null)}>
									Daily
								</label> 
								<label onClick={() => this.setDateRange('weekly',null)}>
									Weekly								
								</label>
					</div>
				);
	}


	setIntraDayBarGraph(data,name){
	      		let bar_data = [
				        ['Month', 'Volume']
			    ];

			    for(var x =data.length-1; x>=0;x--){
					bar_data.push([data[x].date, parseFloat(data[x].volume) ]);
				};

			    let baroptions = {
						isStacked:true,
						fontFamily: 'Courier New',
						backgroundColor: 'transparent',
						vAxis: {
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 0,
				        		fontName: 'Courier New',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 0
						   }	  
				        },
				        hAxis: {
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 8,
				        		fontName: 'Courier New',
				        		color: 'black',
				        		fontWeight: 700,
				        	},
				        	gridlines: {
						    	count: 2
						   },
						   format: 'MMM d, y'
				        },
				        legend: {position: 'none'}
				   };


				   return(
				
							<div className="intradaybargraph">
											        <Chart
													  chartType="ColumnChart"
													  data={bar_data}
													  width="100%"
													  height="100%"
													  options={baroptions}
											        />
						    </div>
			
				   	);

	}


	setDatePicker(){

		return (
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
							<img  className="submit-button" onClick={()=> Actions.updatesendRequest() }	/>
					</div>
		);
	}

	sendRequest(){
		console.log('send request');
		Actions.updatesendRequest();
		let code = this.companyCode.split(' ');
		let params = {
			code: code[0],
			timeSteps: null	
		};
		API.getStockPrice(params);			
	}

	setCompanyPicker(){
		//
		// 	
		//

		return (
					<div className="pickercontainer">
							<input className="homepage-input" placeholder="Enter stock code" onChange={(e) => this.updatecompanyCode(e) } />
							<Link to="/intradaypage" onClick={()=> this.sendRequest() }>
								<img src={require("../img/enter_icon.png")}  className="enter_icons" />
							</Link>
					</div>

		);
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