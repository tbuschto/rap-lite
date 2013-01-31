namespace( "rwt.widgets" );

rwt.widgets.Shell = Backbone.View.extend( {

  initialize : function() {
    this.render = _.bind( this.render );
    rap.on( "render", this.render );
    var parent = rwt.widgets.Display.getCurrent().el;
    this.$el.appendTo( parent );
  },

  render : function() {

  }

} );

(function(){

rwt.remote.HandlerRegistry.add( "rwt.widgets.Shell", {

  factory : function( properties ){
    var model = new Backbone.Model();
    new rwt.widgets.Shell( {
      "model" : model
    } );
    return model;
  },

  isPublic : true,

  properties : [ "bounds", "visibility" ]

} );

}());