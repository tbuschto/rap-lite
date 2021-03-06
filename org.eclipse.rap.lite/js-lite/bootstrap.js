namespace = function( name, object ) { // clean up later
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
    parent[ part ] = object || {};
  }
};

rwt = {
  qx : {
    Class : {
      // supports only static classes
      define : function( name, object ) {
        namespace( name, object.statics );
        if( object.defer ) {
          object.defer( object.statics );
        }
      }
    }
  }
};

// touching built-in prototypes is bad, but we need it for some of the webclient scripts.
Array.prototype.indexOf = function( item ) {
  return _.indexOf( this, item );
};