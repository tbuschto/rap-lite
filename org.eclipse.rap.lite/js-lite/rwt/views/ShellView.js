(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.ShellView = rwt.views.ControlView.extend( {

    name : "Shell",

    applyParent : function() {
      var parent = rwt.widgets.Display.getCurrent().el;
      this.$el.appendTo( parent );
    }

  } );


  rwt.views.ShellView.themeParser = {

    "Shell" : function( styleSheet, widgetTheme ) {
      var backgroundColors = widgetTheme[ "background-color" ];
      for( var i = 0; i < backgroundColors.length; i++ ) {
        var selector = [ ".Shell " ].concat( backgroundColors[ i ][ 0 ] );
       styleSheet.getRule( selector.join( "" ) ).setProperty( "background-color", backgroundColors[ i ][ 1 ] );
      }
    }

  };

}());