(function(){
  'use strict';

  namespace( "rwt.theme" );


  /**
   * Since the order of the original StyleSheet/conditional values is not preserved,
   * it's theoretically possible for the behavior to be different here than for the WebClient
   */
  rwt.theme.StyleSheet = function() {
    this._rules = {};
  };

  rwt.theme.StyleSheet.prototype = {

    getRule : function( selector ) {
      var selectorStr = rwt.theme.StyleUtil.createSelectorString( selector );
      if( !this._rules[ selectorStr ] ) {
        this._rules[ selectorStr ] = [ selector.concat(), new rwt.theme.StyleRule() ];
      }
      return this._rules[ selectorStr ][ 1 ];
    },

    addRule : function( selector, rule ) {
      var selectorStr = rwt.theme.StyleUtil.createSelectorString( selector );
      if( this._rules[ selectorStr ] ) {
        throw new Error( selectorStr + " is already defined" );
      }
      this._rules[ selectorStr ] = [ selector.concat(), rule ];
    },

    getRules : function() {
      return _.values( this._rules );
    },

    render : function() {
      var sheet = [];
      for( var key in this._rules ) {
        sheet.push( this._rules[ key ][ 1 ].toString( this._rules[ key ][ 0 ] ) );
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