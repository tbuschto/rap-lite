rap.init = function( element, url ) {
  new rwt.widgets.Display( element );
  $.get( url + "?lite=true", function( response ) {
    rwt.remote.MessageProcessor.processMessage( response );
  } );
};

namespace( "rwt.widgets.base" );

// widget is given special treatment by MessageProcessor
rwt.widgets.base.Widget = function() {};



rwt.remote.HandlerRegistry.add( "rwt.theme.ThemeStore", {

  factory : function( properties ) {
    return {};
  },

  service : true

} );


delete window.namespace;