const correlation = require('../build/Release/correlation');
function Correlation(){

	this.data = [];
}; 
Correlation.prototype.autocorrelation = function(obj) {
	// let msg = 'Fuck Shit';

	/**
	callback((msg) => {
		console.log(msg);
	});
	**/  
	for(var x = obj.dataset.data.length-1; x >=0 ; x--){
	        let data = {
	          date: obj.dataset.data[x][0],
	          close: obj.dataset.data[x][4],
	          volume: null
	        }; 
	        if(obj.dataset.data[x][5]!=null){
	          	data.volume = obj.dataset.data[x][5].toExponential(2);
	        } 
	        this.data.push(obj.dataset.data[x][4]);
	};
	correlation(this.data);

};

module.exports = new Correlation();