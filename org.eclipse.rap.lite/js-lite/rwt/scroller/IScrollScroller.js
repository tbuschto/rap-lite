(function(){
  'use strict';

  namespace( "rwt.scroller" );

  rwt.scroller.IScrollScroller = function( view ) {
    this.wrapper = createWrapper();
    this.container = createContainer( this.wrapper );
    this.iscroll = new iScroll( this.wrapper, options );
    view.on( "render", function() {
      this.iscroll.refresh();
    }, this );
  };

  rwt.scroller.IScrollScroller.prototype = {

    setTop : function( value ) {
      this.iscroll.scrollTo( 0, value * -1, 400 ); //fix horizontal pos
    }

  };

  var createWrapper = function() {
    var result = document.createElement( "div" );
    var $wrapper = $( result );
    $wrapper.addClass( "IScrollScroller wrapper" );
    return result;
  };

  var createContainer = function( wrapper ) {
    var result = document.createElement( "div" );
    var $container = $( result );
    $container.appendTo( wrapper );
    $container.addClass( "IScrollScroller container" );
    return result;
  };

  var options = {
    hideScrollbar : false,
    fadeScrollbar : false,
    bounce : true
    // TODO: can iscroll be hacked to better work with wheel?
  };

  var transitionDuration = "-webkit-transition-duration";

  rwt.scroller.ScrollerProviderRegistry.add( {
    create : function( view ) {
      return new rwt.scroller.IScrollScroller( view );
    },
    accept : function() {
      return !rwt.client.Client.isMshtml() && !rwt.client.Client.isNewMshtml();
    }
  } );

  rwt.theme.ThemeStore.add( {

    "IScrollScroller" : function( styleSheet, rules ) {
      styleSheet.getRule( [ ".IScrollScroller", ".wrapper" ] ).set( {
        "position" : "absolute",
        "left" : "0px",
        "top" : "0px",
        "right" : "0px",
        "bottom" : "0px"
      } );
      styleSheet.getRule( [ ".IScrollScroller", ".container" ] ).set( {
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