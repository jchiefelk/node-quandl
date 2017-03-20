
const returnobject = require('../build/Release/returnobject');
 
function Correlation(){
	this.obj1 = returnobject('fuck');
	this.obj2 = returnobject('This Feeling');
}; 

Correlation.prototype.autocorrelation = function() {
		console.log(this.obj1, this.obj2);
};


module.exports = new Correlation();