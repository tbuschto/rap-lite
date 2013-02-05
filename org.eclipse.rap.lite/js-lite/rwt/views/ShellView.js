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

    "Shell" : function( styleSheet, selector, rule ) {
      styleSheet.addRule( selector, rule );
    }

  };

}());