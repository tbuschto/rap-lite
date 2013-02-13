(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.CompositeView = rwt.views.ControlView.extend( {

    name : "CompositeView"

  } );

  rwt.views.ViewProviderRegistry.add( {
    model : "rwt.widgets.Composite",
    create : function( model ) {
      return new rwt.views.CompositeView(  { "model" : model }  );
    }
  } );

  rwt.theme.ThemeStore.add( {

    "Composite" : function( styleSheet, rules ) {
      var supported = [ "background-color", "border", "padding", "font" ];
      styleSheet.addRules( rules, { "addClass" : ".CompositeView" }, supported );
    }

  } );

}());