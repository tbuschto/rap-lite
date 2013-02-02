rwt.remote.HandlerRegistry.add( "rwt.widgets.Shell", {

  factory : function( properties ) {
    var model = new rwt.models.ShellModel();
    var view = new rwt.views.ShellView( {
      "model" : model
    } );
    model.view = view;
    return model;
  },

  isPublic : true

} );