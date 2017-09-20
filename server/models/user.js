var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Setting up a mongoose model and pass it using module.exports
var UserSchema = new Schema({
	name: String,
	password: String,
	admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);
