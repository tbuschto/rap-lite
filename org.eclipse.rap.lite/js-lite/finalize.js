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

// Type Handler stubs:
var dummyTypeHandler = {
  factory : function(){ return {}; }
};
var dummyServiceHandler = {
  factory : function(){ return {}; },
  service : true
};
var HandlerRegistry = rwt.remote.HandlerRegistry;
HandlerRegistry.add( "rwt.widgets.Shell", dummyTypeHandler );
HandlerRegistry.add( "rwt.widgets.Label", dummyTypeHandler );
HandlerRegistry.add( "rwt.widgets.Button", dummyTypeHandler );
HandlerRegistry.add( "rwt.theme.ThemeStore", dummyServiceHandler );
HandlerRegistry.add( "rwt.client.TextSizeMeasurement", dummyServiceHandler );

}());