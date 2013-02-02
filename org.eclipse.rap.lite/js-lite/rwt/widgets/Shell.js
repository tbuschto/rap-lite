rwt.remote.HandlerRegistry.add( "rwt.widgets.Shell", {

  factory : function( properties ) {
    var model = new rwt.models.Shell();
    var view = new rwt.views.Shell( {
      "model" : model
    } );
    model.view = view;
    return model;
  },

  isPublic : true

} );