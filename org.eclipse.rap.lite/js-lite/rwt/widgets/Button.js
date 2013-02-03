(function(){
  'use strict';

  namespace( "rwt.widgets" );

  rwt.widgets.Button = Backbone.Model;

  rwt.remote.HandlerRegistry.add( "rwt.widgets.Button", {

    factory : function( properties ) {
      var model = new rwt.widgets.Button(
        _.pick( properties, [ "parent", "styles" ] )
      );
      var view = new rwt.views.ButtonView( {
        "model" : model
      } );
      model.view = view;
      return model;
    },

    isPublic : true

  } );

}());