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

	changeBitcoinOptions(range) {
		Actions.updateBitcoinHistoryOptions(range);
		API.getBitcoinData(range);
	}

	renderBitcoinAPIOptions(){
		return(
				<div className="history_options">
								<label onClick={()=> this.changeBitcoinOptions('daily')}>
									 Daily
								</label>
								<label onClick={()=> this.changeBitcoinOptions('monthly')}>
									Monthly
								</label> 
								<label onClick={()=> this.changeBitcoinOptions('alltime')}>
									All-time
								</label>
				</div>
		);
	}

	setBitcoinVolumeGraph(data,historyoptions){

	      		let volume_data = [["DATE", 'Volume']];
			    for(var x =data.length-1; x>=0;x--){
					volume_data.push([ new Date(data[x].time), data[x].volume ]);
				};

			    let options = {
				    	title: "Volume",
						titleTextStyle: {
							color: 'black',    // any HTML string color ('red', '#cc00cc')
							fontName: 'Arial', // i.e. 'Times New Roman'
							fontSize: 18, // 12, 18 whatever you want (don't specify px)
							bold: false,    // true or false
							italic: false   // true of false
						},

						isStacked:true,
						fontFamily: 'Arial',
						backgroundColor: 'transparent',

						vAxis: {
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 2,
						    	color: 'transparent'
						   }	  
				        },
				        hAxis: {
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 5, 
						    	color: 'transparent'
						   }
				        },
				       legend: {position: 'none'}
				   };

			
					options.format = 'MMM d, y'
			
				   return(
							<div className="bitcoinCandleStickPlot">
											        <Chart
													  chartType="ColumnChart"
													  data={volume_data}
													  width="100%"
													  height="100%"
													  options={options}
											        />
						    </div>
				   	);
	}



	setBitcoinGraph(data,historyoptions){

			let line_data = [["DATE","Price"]];
			for(var x = data.length-1; x>=0; x--){
					line_data.push([new Date(data[x].time), data[x].average ]);
			};

			let options = {
				    	title: "Price",

						titleTextStyle: {
							color: 'black',    // any HTML string color ('red', '#cc00cc')
							fontName: 'Arial', // i.e. 'Times New Roman'
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
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 5,
						    	color: 'transparent'
						   	}
				        },
					 	hAxis: {
							title: "",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 5,
						    	color: 'transparent'
						   	},
						   	format:	null
					 	}
			};
			if(historyoptions=='monthly' || historyoptions=='alltime'){
				options.format = 'MMM d, y'
			}
			if(historyoptions=='daily'){
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

	setIntradayGraphGoogleView(data,name){
				let line_data = [["DATE","Price"]];

				for(var x =data.length-1; x>=0;x--){
						line_data.push([new Date(data[x].date), data[x].close ]);
				};
				let options = {
						title: name,
						/**
						chartArea: {
						    backgroundColor: {
						        stroke: 'black',
						        strokeWidth: 1
						    }
						},
						***/
					    titleTextStyle: {
					        color: 'black',    // any HTML string color ('red', '#cc00cc')
					        fontName: 'Arial', // i.e. 'Times New Roman'
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
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700
				        	},
				        	gridlines: {
						    	count: 2,
						    	color: 'transparent'
						   }	  
				        },
					 	hAxis: {
							title: "",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				        	},
				        	gridlines: {
						    	count: 3,
						    	color: 'transparent'
						   	},
						   	format:	null
					 	}
				};

					return (
							<div className="intradaylinegraph">
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

	setHistoryRangePicker(stocklistings){

			return (



					<div className="history_options">
									
								<label>
									 Intraday
									 <select onChange={(e) => this.setDateRange('intraday', e.target.value)}>
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
	      		let bar_data = [["DATE", 'Volume']];
			    for(var x =data.length-1; x>=0;x--){
					bar_data.push([ new Date(data[x].date), parseFloat(data[x].volume) ]);
				};
			    let baroptions = {
						isStacked:true,
						fontFamily: 'Arial',
						backgroundColor: 'transparent',
						/***
						chartArea: {
						    backgroundColor: {
						        stroke: 'black',
						        strokeWidth: 1
						    }
						},
						***/
						vAxis: {
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 2,
						    	color: 'transparent'
						   }	  
				        },
				        hAxis: {
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				        	},
				        	gridlines: {
						    	count: 5, 
						    	color: 'transparent'
						   }
				        },
				       legend: {position: 'none'}
				   };

				   return(
							<div  className="intradaylinegraph">
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
	
		
		let code = this.companyCode.split(' ');
		this.companyCode = null;	
		Actions.updateStockListings([]);
		let params = {
			code: code[0],
			timeSteps: null	
		};
		API.getStockPrice(params);	
		Actions.updatesendRequest();
	}

	pickCode(data){
		this.companyCode = data;
		Actions.updateStockListings([]);
	}

	setCompanyPicker(stocklistings){

		let stockchoices=[];
		if(stocklistings.stocklisting!=undefined){
				for(let x=0; x<stocklistings.stocklisting.length; x++){
					let choice = (
						<div key={Math.random(x)} onClick={() => this.pickCode(stocklistings.stocklisting[x].companycode)} className="stockcompany">
							{stocklistings.stocklisting[x].companycode} - {stocklistings.stocklisting[x].name}
						</div>
					);
					stockchoices.push(choice);
				};
		}
		return (
			<div className="pickercontainer">
						<div className="stockpicker">
							<input className="stockpickerinput" placeholder="Enter stock code" onChange={(e) => this.updatecompanyCode(e) } value={this.companyCode}/>
							<Link to="/intradaypage" onClick={()=> this.sendRequest()}>
								<img src={require("../img/enter_icon.png")}  className="enter_icons" />
							</Link>
						</div>

						<div className="stockchoices">
							{stockchoices}
						</div>
			</div>
		);
	}


	setLoadingAnimation(){
		return this.loadingAnimation;
	}

	updatecompanyCode(e){
		let apiInput = {
			companycode: e.target.value
		};
		API.getStockistings(apiInput);
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