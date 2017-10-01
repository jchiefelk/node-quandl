'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


let updateUserName = function(item){
	console.log(item);
};

class UserInfo {

	constructor(){
		this.userName = ''
		this.passwordStatus = null;
    this.status = {success: false, message: "first load"};
	}

	setUserName(item){
		this.userName = item;
	}

	setPasswordStatus(item){
		this.passwordStatus = item
	}

	setSubmitStatus(item){
		console.log(item);
    this.status = item;
	}
};

let User = new UserInfo();

var GeneralStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  getSubmitStatus: function(){
    return User.status;
  }

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.USERNAME:
      User.setUserName(action.data);
      GeneralStore.emitChange(CHANGE_EVENT);
      break;
    case appConstants.PASSWORD:
      User.setPasswordStatus(action.data);
      GeneralStore.emitChange(CHANGE_EVENT);
      break;
     case appConstants.UPDATE_USER_SUBMIT_STATUS:
     	console.log(action.data);
     	User.setSubmitStatus(action.data);
     	GeneralStore.emitChange(CHANGE_EVENT);
     	break;
    default:
      return true;
  }
});
module.exports = GeneralStore;