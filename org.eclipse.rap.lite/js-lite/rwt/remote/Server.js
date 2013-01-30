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

  setRequestCounter : function() {
  },

  setUrl : function() {
  }

};

}());