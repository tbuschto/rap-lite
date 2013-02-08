(function(){
  'use strict';

  namespace( "rwt.widgets" );

  rwt.widgets.Control = Backbone.Model.extend( {

    parse : function( attr, options ) {
      if( attr.style ) {
        attr.style = parseStyle( attr.style );
      }
      return attr;
    },

    initialize : function() {
      this.initializeControl();
    },

    initializeControl : function() {
      this.style = this.get( "style" );
      if( this.defaults ) {
        this.set( this.defaults );
      }
    }

  } );

  var parseStyle = function( stylesArr ) {
    var result = {};
    for( var i = 0; i < stylesArr.length; i++ ) {
      result[ stylesArr[ i ] ] = true;
    }
    return result;
  };

}());