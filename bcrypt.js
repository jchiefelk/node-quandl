const bcrypt = require('bcrypt');

let root_password = 'Test@Password';
// verify the password later on
/* Synchronous Method
let hash = bcrypt.hashSync(root_password,10) // second input the number of rounds used to generate a salt
let user_password = 'test@Password'; 
if(bcrypt.compareSync(user_password,hash)){
	console.log('Passwords Match');
} else {
	console.log('Passwords Dont Match');
}
*/
// Asynchrounous Method for Hashing
var phash;
bcrypt.hash(root_password, 10, function(err,hash) {
	phash = hash;
	console.log(hash);
});
// Asynchronous Method for Comparing Hashes
let user_password = 'Test@Password'; 
bcrypt.compare(user_password, phash, function(err,res){
	if(res){
		console.log('passwords match');
	} else {
		console.log('passwords dont match');
	}
});