(function(){
  'use strict';

  namespace( "rwt.widgets" );

  rwt.widgets.ScrollBar = Backbone.Model.extend( {

    name : "ScrollBar"

  } );

  rwt.remote.HandlerRegistry.add( "rwt.widgets.ScrollBar", {

    factory : function( properties ) {
      var model = new rwt.widgets.Label(
        _.pick( properties, [ "parent", "style" ] ),
        { parse : true }
      );
      return model;
    },

    isPublic : true,

    properties : [ "selection" ],

    destructor : "destroy"

  } );

}());