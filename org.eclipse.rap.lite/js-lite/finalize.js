(function(){
'use strict';

namespace( "rwt.widgets.base" );
delete window.namespace;

// method to start a ui session within an html element
rap.init = function( element, url ) {
  new rwt.widgets.Display( element );
  $.get( url + "?lite=true", function( response ) {
    rwt.remote.MessageProcessor.processMessage( response );
  } );
};

// widget is given special treatment by MessageProcessor
rwt.widgets.base.Widget = function() {};

// make MessageProcessor backbone firendly:
rwt.remote.MessageProcessor._processSetImpl = function( targetObject, handler, properties ) {
  if( properties && handler.properties instanceof Array ) {
    for( var i = 0; i < handler.properties.length; i++ ) {
      var property = handler.properties [ i ];
      var value = properties[ property ];
      if( value !== undefined ) {
        if( handler.propertyHandler && handler.propertyHandler[ property ] ) {
          handler.propertyHandler[ property ].call( window, targetObject, value );
        } else {
          var setterName = this._getSetterName( property );
          if( targetObject[ setterName ] ) {
            targetObject[ setterName ]( value );
          } else {
            // new for RapLite:
            targetObject.set( property, value );
          }
        }
      }
    }
  }
};

// Type Handler stubs:
var dummyTypeHandler = {
  factory : function(){ return {}; }
};
var dummyServiceHandler = {
  factory : function(){ return {}; },
  service : true
};
var HandlerRegistry = rwt.remote.HandlerRegistry;
HandlerRegistry.add( "rwt.widgets.Label", dummyTypeHandler );
HandlerRegistry.add( "rwt.widgets.Button", dummyTypeHandler );
HandlerRegistry.add( "rwt.theme.ThemeStore", dummyServiceHandler );
HandlerRegistry.add( "rwt.client.TextSizeMeasurement", dummyServiceHandler );

}());