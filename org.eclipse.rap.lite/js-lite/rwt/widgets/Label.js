rwt.remote.HandlerRegistry.add( "rwt.widgets.Label", {

  factory : function( properties ) {
    var model = new rwt.models.LabelModel(
      _.pick( properties, [ "parent", "styles" ] )
    );
    var view = new rwt.views.LabelView( {
      "model" : model
    } );
    model.view = view;
    return model;
  },

  isPublic : true

} );