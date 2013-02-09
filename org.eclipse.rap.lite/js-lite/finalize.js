(function(){
  'use strict';

  namespace( "rwt.widgets.base" );
  delete window.namespace;
  // widget is given special treatment by MessageProcessor
  rwt.widgets.base.Widget = function() {};

  // method to start a ui session within an html element
  rap.init = function( element, url ) {
    new rwt.widgets.Display( element );
    $.get( url + "?lite=true", function( response ) {
      rwt.remote.MessageProcessor.processMessage( response );
    } );
  };

  var orgSet = rwt.remote.MessageProcessor._processSetImpl;

  rwt.remote.MessageProcessor._processSetImpl = function( targetObject, handler, properties ) {
    if( targetObject instanceof Backbone.Model ) {
      targetObject.set(
        targetObject.parse( _.pick( properties, handler.properties ) ),
        { "nosync" : true }
      );
    } else {
      orgSet.apply( this, targetObject, handler, properties );
    }
  };

  _.mixin( {
    "stuff" : function( obj ) {
      for( var key in obj ) {
        obj[ key ] = true;
      }
      return obj;
    }
  } );

}());