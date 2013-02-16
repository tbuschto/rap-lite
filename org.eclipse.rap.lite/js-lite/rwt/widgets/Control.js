(function(){
  'use strict';

  namespace( "rwt.widgets" );

  rwt.widgets.Control = Backbone.Model.extend( {

    parse : function( attr, options ) {
      if( attr.style ) {
        attr.style = parseStyle( attr.style );
      }
      if( attr.customVariant ) {
        attr.customVariant = attr.customVariant.slice( 8 );
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
    },

    getParent : function() {
      return rap.getObject( this.get( "parent" ) );
    },

    sync : function(){}

  } );

  rwt.widgets.Control.handlerProperties = [
    "children",
    //"tabIndex",
    //"toolTip",
    "visibility",
    "enabled",
//    "foreground",
    "background",
//    "backgroundImage",
//    "cursor",
    "customVariant",
//    "font",
//    "menu",
//    "activeKeys",
//    "cancelKeys"
    "bounds"
  ];

  var parseStyle = function( stylesArr ) {
    var result = {};
    for( var i = 0; i < stylesArr.length; i++ ) {
      result[ stylesArr[ i ] ] = true;
    }
    return result;
  };

}());