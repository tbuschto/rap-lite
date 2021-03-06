(function(){
  'use strict';

  namespace( "rwt.widgets" );

  rwt.widgets.Label = rwt.widgets.Control.extend( {

    name : "Label"

  } );

  rwt.remote.HandlerRegistry.add( "rwt.widgets.Label", {

    factory : function( properties ) {
      var model = new rwt.widgets.Label(
        _.pick( properties, [ "parent", "style", "customVariant" ] ),
        { parse : true }
      );
      model.view = rwt.views.ViewFactory.createView( "rwt.widgets.Label", model );
      return model;
    },

    isPublic : true,

    properties : [ "bounds", "text" ],

    destructor : "destroy"

  } );

}());