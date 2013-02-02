rwt.remote.HandlerRegistry.add( "rwt.widgets.Label", {

  factory : function( properties ) {
    var model = new rwt.models.Label(
      _.pick( properties, [ "parent", "styles" ] )
    );
    var view = new rwt.views.Label( {
      "model" : model
    } );
    model.view = view;
    return model;
  },

  isPublic : true

} );