var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config =  require('./config'); 
var User   = require('./models/user'); // get our mongoose model
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
var router = express.Router();
// const app = express();
//
// conncect to database
// mongoose.connect(config.database)
mongoose.connect(config.database, function(err,res){
  if(err){
    console.log('error connecting to: ' + config.database);
  } else {
    console.log('Succeeded connected to: '+ config.database);
  }
});
//
// Settup Authentication
router.post('/authenticate',function(req,res){
  User.findOne({
      name: req.body.name
    },function(err,user){
        if(err) throw err;

        if(!user){
              res.json({
                  success: false,
                  message: 'Authentication failed. User not found.'
              });
        } else if(user){
            // if user is found and password is right
            // create token
            var token = jwt.sign(user, app.get('superSecret'),{
               expiresInMinutes: 1440 // expires in 24 hours
            });
            //
            // return the information including token as JSON
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        }
    });
});
//

// create user of our choosing
router.post('/setup', function(req, res) {

  // create hash for password
  // req.body.userPassword
  bcrypt.hash(req.body.userPassword, 10, function(err,hash) {
      // create a sample user
      var nick = new User({ 
        name: req.body.userName, 
        password: hash,
        admin: false 
      });
      // save the sample user
      nick.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({ success: true });
      });
  });

});
// Settup MongoDB routes
router.get('/users',function(req,res){
    User.find({}, function(req,users){
      res.json(users);
    });
});


// route middleware to verify a token
router.use(function(req,res){

  //console.log(req)

// check header or url parameters or post parameters for token
var token = req.body.token || req.query.token || req.headers['x-access-token'];

// decode token
    if(token){
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded){ 
            if(err){
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is goog, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
    }

});
//





module.exports = router;