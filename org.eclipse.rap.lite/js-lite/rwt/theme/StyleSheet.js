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
      var selectorStr;
      if( _.isString( selector ) ) {
        selectorStr = selector;
      } else {
        selectorStr = rwt.theme.StyleUtil.createSelectorString( selector );
      }
      if( !this._rules[ selectorStr ] ) {
        this._rules[ selectorStr ] = new rwt.theme.StyleRule( selector );
      }
      return this._rules[ selectorStr ];
    },

    addRules : function( rules, selectorMod, propertyFilter, callback ) {
      for( var i = 0; i < rules.length; i++ ) {
        var rule = rules[ i ];
        var selector = selectorMod ? rule.selector.clone( selectorMod ) : rule.selector;
        this.getRule( selector ).set( _.pick( rule.attributes, propertyFilter || {} ) );
        if( callback ) {
          callback( this.getRule( selector ) );
        }
      }
    },

    addRule : function( rule ) {
      var selectorStr = rule.selectorString;
      if( this._rules[ selectorStr ] ) {
        throw new Error( selectorStr + " is already defined" );
      }
      this._rules[ selectorStr ] = rule;
    },

    getRules : function() {
      return _.values( this._rules );
    },

    render : function() {
      var sheet = [];
      _.forEach( this._rules, function( rule ) {
        if( !_.isEmpty( rule.attributes ) ) {
          sheet.push( rule.toString() );
        }
      } );
      var result = "\n" + sheet.join( "\n\n" ) + "\n";
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