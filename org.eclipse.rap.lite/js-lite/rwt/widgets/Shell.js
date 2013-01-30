(function(){

rwt.remote.HandlerRegistry.add( "rwt.widgets.Shell", {

  factory : function( properties ){
    var model = new Backbone.Model();
    return model;
  },

  isPublic : true,

  properties : [ "bounds", "visibility" ]

} );

}());