(function(){
  'use strict';

  namespace( "rwt.theme" );

  rwt.theme.StyleSheet = function() {
    this._rules = {};
  };

  rwt.theme.StyleSheet.prototype = {

    getRule : function( selector ) {
      if( !this._rules[ selector ] ) {
        this._rules[ selector ] = new rwt.theme.StyleRule( selector );
      }
      return this._rules[ selector ];
    },

    render : function() {
      var sheet = [];
      for( var key in this._rules ) {
        sheet.push( this._rules[ key ].toString() );
      }
      var result = "\n" + sheet.join( "\n\n" ) + "\n";
      console.log( result );

      var styleEl = document.createElement( 'style' ); // USE JQUERY
      styleEl.type = "text/css";
      if( styleEl.styleSheet ) {
        styleEl.styleSheet.cssText = result;
      } else {
        styleEl.appendChild( document.createTextNode( result ) );
      }
      var head = document.getElementsByTagName( "head" )[ 0 ];
      head.appendChild( styleEl );
    }

  };

}());