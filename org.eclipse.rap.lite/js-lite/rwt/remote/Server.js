namespace( "rwt.remote" );

(function(){
'use strict';

rwt.remote.Server = function() {
};

rwt.remote.Server.getInstance = function() {
  if( !this._instance ) {
    this._instance = new this();
  }
  return this._instance;
};

rwt.remote.Server.prototype = {

  _writer : null,
  _requestCounter : null,
  _url : null,

  setRequestCounter : function( value ) {
    this._requestCounter = value;
  },


  getRemoteObject : function( target ) {
    return rwt.remote.RemoteObjectFactory.getRemoteObject( target );
  },

  setUrl : function( value ) {
    this._url = value;
  },

  getMessageWriter : function() {
    if( this._writer === null ) {
      this._writer = new rwt.remote.MessageWriter();
    }
    return this._writer;
  },

  send : _.throttle( function() {
    rwt.remote.Server.getInstance().sendImmediate();
  }, 60 ),

  sendImmediate : function( method ) {
    if( this._requestCounter === -1 ) {
      this.send();
    } else {
      rap._.notify( "send" );
      if( this._requestCounter !== null ) {
        this.getMessageWriter().appendHead( "requestCounter", this._requestCounter );
      }
      this._requestCounter = -1;
      var data = this.getMessageWriter().createMessage();
      this._writer.dispose();
      this._writer = null;
      $.ajax( {
        type: "POST",
        url: this._url,
        data: data,
        success : this._success,
        error : this._error,
        converters :{
          "text application/json" : JSON.parse
        },
        dataType: "application/json",
        contentType : "application/json; charset=UTF-8"
      } );
    }
  },

  _success : function( data, textStatus, jqXHR ) {
    rwt.remote.MessageProcessor.processMessage( data );
    rap._.notify( "render" );
  },

  _error : function( jqXHR, textStatus, errorThrown ) {
    alert( textStatus + ": " + errorThrown );
  }


};

}());