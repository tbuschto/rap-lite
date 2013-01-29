namespace = function( name ) { // cleaned up later
  var splits = name.split( "." );
  var parent = window;
  var part = splits[ 0 ];
  for( var i = 0, l = splits.length - 1; i < l; i++, part = splits[ i ] ) {
    if( !parent[ part ] ) {
      parent = parent[ part ] = {};
    } else {
      parent = parent[ part ];
    }
  }
  if( parent[ part ] === undefined ) {
    parent[ part ] = {};
  }
};

rap.init = function( element, url ) {
  $.get( url + "?lite=true", function( response ) {
    rwt.widgets.Display.currentElement = element;
    rwt.remote.MessageProcessor.processMessage( response );
    delete rwt.widgets.Display.currentElement;
  } );

};