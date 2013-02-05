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
      var supported = [ "background-color", "border", "padding", "font" ];
      var attributes = _.pick( rule.attributes, supported );
      styleSheet.getRule( selector ).set( attributes );
    }

  };

}());