(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.CompositeView = rwt.views.ContainerView.extend( {

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
      var rule = styleSheet.getRule( [ [ ".CompositeView" ], [ ".container"] ] );
      rule.set( {
        "position" : "absolute",
        "overflow" : "hidden",
        "left" : "0px",
        "top" : "0px",
        "right" : "0px",
        "bottom" : "0px"
      } );
      styleSheet.getRule( ".CompositeView" ).set( {
        "overflow" : "visible"
      } );
    }

  } );

}());