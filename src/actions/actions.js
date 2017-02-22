var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var _ = require( 'lodash' );
var _store = {
  firstname: null,
  lastname: null,
  subjects: null,
  abstract: null,
  article: null,
  submissiondate: null
};
var getSecret = function(){
    let urlParams = new URLSearchParams(window.location.search);
    if( urlParams.has( 'secret' ) ){
        return urlParams.get( 'secret' );
    }
    return null;
};
var addSecretToObjectIfAvailable = function( object ){
    let secret = getSecret();
    if( secret !== null ){
        object.secret = secret;
        return true;
    }
    return false;
};
var makeGETRequest = function() {
     console.log('Get Engage');
     fetch('/api', {
          method: 'get',
          accept: 'application/json',
        }).then(function(response) {
          if(response.status!=undefined){
              Actions.setStatus(response.status);
          }
          return response.json();
        }).then(function(data) {
        }).catch(function(error) {
          console.log(error);
        }); 
};
var makePOSTRequest = function(){
    let payload = _store;
    addSecretToObjectIfAvailable( payload );
    fetch('/api', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
            })
            .then( (response) => {
                  if(response.status!=undefined){
                      Actions.setStatus(response.status);
                  }
                  return response.json(); 
                }).then(function(data) {
                }).catch((err) => {
                    console.log(err)
                });
};

var Actions = {


  saveIntradDayData: function(item){
    // console.log(item)
    AppDispatcher.handleAction({
      actionType: appConstants.INTRADAYTICKET,
      data: item
    });

  },

  postToPending: function(item){
    _store = item;
    makePOSTRequest();
  },
  setStatus: function(item) {
    AppDispatcher.handleAction({
      actionType: appConstants.HTTPSTATUS,
      data: item 
    });
  },
  SaveClick: function(event){

    AppDispatcher.handleAction({
      actionType: appConstants.SAVE_CLICKED,	
      data: event
    });
  },
  setFirstName: function(item){
    AppDispatcher.handleAction({
        actionType: appConstants.FIRSTNAME,
        data: item
    });
  },
  setLastName: function(item){
    AppDispatcher.handleAction({
        actionType: appConstants.LASTNAME,
        data: item
    });
  },
  setSubjects: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.SUBJECTS,
      data: item
    });
  },
  setArticle: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.ARTICLE,
      data: item
    });
  },
  setAbstract: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.ABSTRACT,
      data: item
    });
  }
  
};
module.exports = Actions;