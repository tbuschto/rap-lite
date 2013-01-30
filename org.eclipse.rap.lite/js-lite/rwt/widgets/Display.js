namespace( "rwt.widgets" );

(function(){
'use strict';

var server = rwt.remote.Server.getInstance();

rwt.widgets.Display = function( element ) {
  this._element = element;
  rwt.widgets.Display._current = this;
};

rwt.widgets.Display.getCurrent = function() {
  return this._current;
};

rwt.widgets.Display.prototype = {

  initialize : function() {
    server.getMessageWriter().appendHead( "rwt_initialize", true );
  //  this._appendWindowSize();
  //  this._appendSystemDPI();
  //  this._appendColorDepth();
  //  this._appendInitialHistoryEvent();
  //  this._appendTimezoneOffset();
  //  this._attachListener();
    server.send();
  }

};

rwt.remote.HandlerRegistry.add( "rwt.widgets.Display", {
  factory : function( properties ) {
    var display = rwt.widgets.Display.getCurrent()
    display.initialize();
    return display;
  }
} );

}());