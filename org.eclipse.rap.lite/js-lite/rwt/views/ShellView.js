(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.ShellView = rwt.views.ControlView.extend( {

    name : "ShellView",

    applyParent : function() {
      var parent = rwt.widgets.Display.getCurrent().el;
      this.$el.appendTo( parent );
    }

  } );

  rwt.views.ViewProviderRegistry.add( {
    model : "rwt.widgets.Shell",
    create : function( model ) {
      return new rwt.views.ShellView( { "model" : model } );
    }
  } );

  rwt.theme.ThemeStore.add( {

    "Shell" : function( styleSheet, rules ) {
      var supported = [ "background-color", "border", "padding", "font" ];
      styleSheet.addRules( rules, { "addClass" : ".ShellView" }, supported );
    }

  } );

}());