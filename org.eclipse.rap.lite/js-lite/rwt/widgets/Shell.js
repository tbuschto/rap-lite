(function(){
  'use strict';

  namespace( "rwt.widgets" );

  rwt.widgets.Shell = Backbone.Model;

  rwt.remote.HandlerRegistry.add( "rwt.widgets.Shell", {

    factory : function( properties ) {
      var model = new rwt.widgets.Shell();
      var view = new rwt.views.ShellView( {
        "model" : model
      } );
      model.view = view;
      return model;
    },

    isPublic : true

  } );

}());