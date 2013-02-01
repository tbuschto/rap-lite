namespace( "rwt.widgets" );

rwt.widgets.Shell = Backbone.Model;

rwt.widgets.Shell.View = Backbone.View.extend( {

  initialize : function() {
    var parent = rwt.widgets.Display.getCurrent().el;
    this.$el.appendTo( parent );
    this.model.on( "change:bounds", this.renderBounds, this );
  },

  renderBounds : function( model, bounds ) {
    this.$el.css( {
      "left" : bounds[ 0 ],
      "top" : bounds[ 1 ],
      "width" : bounds[ 2 ],
      "height" : bounds[ 3 ]
    } );
  }

} );

(function(){

rwt.remote.HandlerRegistry.add( "rwt.widgets.Shell", {

  factory : function( properties ){
    var model = new rwt.widgets.Shell();
    var view = new rwt.widgets.Shell.View( {
      "model" : model
    } );
    model.view = view;
    return model;
  },

  isPublic : true,

  properties : [ "bounds", "visibility" ]

} );

}());