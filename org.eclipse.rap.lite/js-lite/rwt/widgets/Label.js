(function(){
  'use strict';

  namespace( "rwt.widgets" );

  rwt.widgets.Label = rwt.widgets.Control.extend( {} );

  rwt.remote.HandlerRegistry.add( "rwt.widgets.Label", {

    factory : function( properties ) {
      var model = new rwt.widgets.Label(
        _.pick( properties, [ "parent", "styles" ],
        { parse : true } )
      );
      var view = new rwt.views.LabelView( {
        "model" : model
      } );
      model.view = view;
      return model;
    },

    isPublic : true,

    properties : [ "bounds", "text" ]

  } );

}());