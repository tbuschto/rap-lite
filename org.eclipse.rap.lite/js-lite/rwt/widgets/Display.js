(function(){
  'use strict';

  namespace( "rwt.widgets" );

  var server = rwt.remote.Server.getInstance();

  rwt.remote.HandlerRegistry.add( "rwt.widgets.Display", {
    factory : function( properties ) {
      return rwt.widgets.Display.getCurrent();
    }
  } );

  rwt.widgets.Display = function( element ) {
    this.el = element;
    $( this.el ).addClass( rwt.theme.StyleUtil.DISPLAY_CLASS );
    this._attachSelectionHandler();
    rwt.widgets.Display._current = this;
  };

  rwt.widgets.Display.getCurrent = function() {
    return this._current;
  };

  rwt.widgets.Display.prototype = {

    applyObjectId : function() {
      this.initialize();
    },

    initialize : function() {
      server.getMessageWriter().appendHead( "rwt_initialize", true );
      this._appendWindowSize();
    //  this._appendSystemDPI();
    //  this._appendColorDepth();
    //  this._appendInitialHistoryEvent();
    //  this._appendTimezoneOffset();
    //  this._attachListener();
      server.send();
    },

    _appendWindowSize : function() {
      var width = $( this.el ).innerWidth();
      var height = $( this.el ).innerHeight();
      rap.getRemoteObject( this ).set( "bounds", [ 0, 0, width, height ] );
    },

    _attachSelectionHandler : function() {
      $( this.el ).on( "select", this._onSelection );
      $( document ).on( "selectstart", this._onSelection );
      $( document ).on( "selectionchange", this._onSelection );
    },

    _onSelection : function( event ) {
      event.preventDefault();
    }

  };

}());