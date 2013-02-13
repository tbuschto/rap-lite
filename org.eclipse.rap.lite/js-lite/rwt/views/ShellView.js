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

  rwt.views.ViewProviderRegistry.add( {
    model : "rwt.model.Shell",
    create : function( model ) {
      return new rwt.views.ShellView( model );
    }
  } );

  rwt.theme.ThemeStore.add( {

    "Shell" : function( styleSheet, rules ) {
      var supported = [ "background-color", "border", "padding", "font" ];
      rwt.theme.StyleUtil.addRulesToSheet( styleSheet, rules, supported );
    }

  } );

}());