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
	}

	setUserName(item){
		this.userName = item;
	}

	setPasswordStatus(item){
		this.passwordStatus = item
	}
};

let User = new User();

var GeneralStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
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
    default:
      return true;
  }
});