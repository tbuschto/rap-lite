(function(){
  'use strict';

  namespace( "rwt.widgets.base" );
  try {
   delete window.namespace;
  } catch( ex ) {
    window.namespace = undefined;
  }
  // widget is given special treatment by MessageProcessor
  rwt.widgets.base.Widget = function() {};

  // method to start a ui session within an html element
  rap.init = function( args ) {
    args = args ? args : {};
    var element = args.element? args.element : document.body;
    var url = args.url ? args.url : getParam( "app" ) ? getParam( "app" ) : "/application";
    var errMsg = null;
    var Client = rwt.client.Client;
    if( Client.isInQuirksMode() ) {
      errMsg = "Quirksmode currently not supported";
    }
    if( Client.isMshtml() && Client.getVersion() < 8 ) {
      errMsg = "IE " + Client.getVersion() + " not supported. Seriously, Dude, it's time to upgrade!";
    }
    if( errMsg ) {
      if( element ) {
        element.innerHTML = errMsg;
      }
      throw new Error( errMsg );
    }
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
      orgSet.apply( this, [ targetObject, handler, properties ] );
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

  var getParam = function( name ) {
    var result = null;
    var href = window.location.href;
    var hashes = href.slice( href.indexOf( "?" ) + 1 ).split( "&" );
    for( var i = 0; i < hashes.length; i++ ) {
      var hash = hashes[ i ].split( "=" );
      if( hash[ 0 ] === name ) {
        result = hash[ 1 ];
      }
    }
    return result;
  };

}());