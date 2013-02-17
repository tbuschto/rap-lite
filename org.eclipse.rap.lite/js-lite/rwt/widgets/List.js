(function(){
  'use strict';

  namespace( "rwt.widgets" );

  rwt.widgets.List = rwt.widgets.Control.extend( {

    name : "List",

    defaults : {
      items : [],
      selection : []
    },

    select : function( index ) {
      this.set( "selection", [ index ] );
    }

  } );

  rwt.remote.HandlerRegistry.add( "rwt.widgets.List", {

    factory : function( properties ) {
      var model = new rwt.widgets.List(
        _.pick( properties, [ "parent", "style", "customVariant" ] ),
        { parse : true }
      );
      model.view = rwt.views.ViewFactory.createView( "rwt.widgets.List", model );
      return model;
    },

    isPublic : true,

    properties : [ "bounds", "items" ],

    destructor : "destroy"

  } );

}());