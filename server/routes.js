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
let secret = express();
secret.set('superSecret', config.secret); 
//
// Settup Authentication
router.post('/authenticate',function(req,res){
  // 1) First Check to see if user name exsts
  // 2) If user exists, check to see if passwords are correct (compare has of input password to that of stored hash)
  // 3) Create token if passwords match, and return as JSON
  // req.body structrure
  // { userName: 'ddd', userPassword: 'ddd' }
  User.findOne({
      name: req.body.userName
    },function(err,user){
        if(err) throw err;
        if(!user){
              res.json({
                  success: false,
                  message: 'Authentication failed. User not found.'
              });
        } else if(user){
        
              // if user is found, check password first
              if(bcrypt.compareSync(req.body.userPassword,user.password)){

                  let token = jwt.sign({
                    data: user
                  }, config.secret, { expiresIn: '1h' });
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
            
                } else {

                    res.json({
                        success: false,
                        message: 'Password invalid'
                    });
                }
        }
  });
  //
  //
});
//

// create user of our choosing
router.post('/setup', function(req, res) {
  // 1) First check in username already exists in the DB
  // 2) if User name doesn't exist, hash password and create and then
  // 3) Insert in user into the DB
  User.findOne({
    name: req.body.userName
  }, function(err, user){
      if(err) throw err;

      if(user){
            
            //
            res.json({
                  success: false,
                  message: 'User Name already exists'
            });

      } else if(!user){

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
    
                  res.json({ 
                    success: true,
                    message: 'User saved successfully' 
                  });
                });
            });
      
      }
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