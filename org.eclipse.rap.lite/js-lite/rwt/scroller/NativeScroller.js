(function(){
  'use strict';

  namespace( "rwt.scroller" );

  rwt.scroller.NativeScroller = function( view ) {
    this.wrapper = createWrapper();
    this.container = createContainer( this.wrapper );
  };

  rwt.scroller.NativeScroller.prototype = {
  };

  var createWrapper = function() {
    var result = document.createElement( "div" );
    var $wrapper = $( result );
    $wrapper.addClass( "NativeScroller wrapper" );
    return result;
  };

  var createContainer = function( wrapper ) {
    var result = document.createElement( "div" );
    var $container = $( result );
    $container.appendTo( wrapper );
    $container.addClass( "NativeScroller container" );
    return result;
  };

  rwt.scroller.ScrollerProviderRegistry.add( {
    create : function( view ) {
      return new rwt.scroller.NativeScroller( view );
    }
  } );

  rwt.theme.ThemeStore.add( {

    "NativeScroller" : function( styleSheet, rules ) {
      styleSheet.getRule( [ ".NativeScroller", ".wrapper" ] ).set( {
        "position" : "absolute",
        "overflow" : "auto",
        "left" : "0px",
        "top" : "0px",
        "width" : "100%",
        "height" : "100%"
      } );
      styleSheet.getRule( [ ".NativeScroller", ".container" ] ).set( {
        "position" : "absolute",
        "overflow" : "hidden",
        "left" : "0px",
        "top" : "0px",
        "min-width" : "100%",
        "min-height" : "100%"
      } );
    }

  } );

}());