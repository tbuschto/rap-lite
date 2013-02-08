(function(){
  'use strict';

  namespace( "rwt.widgets" );

  rwt.widgets.Button = rwt.widgets.Control.extend( {

    defaults
     : {
      "selection" : false
    },

    select : function() {
      if( !this.style.PUSH ) {
        this.set( "selection", !this.get( "selection" ) );
      }
      this.trigger( "Selection" );
    }

  } );

  rwt.remote.HandlerRegistry.add( "rwt.widgets.Button", {

    factory : function( properties ) {
      var model = new rwt.widgets.Button(
        _.pick( properties, [ "parent", "style" ] ),
        { parse : true }
      );
      model.view = new rwt.views.ButtonView( { "model" : model } );
      new rwt.synchronizer.SelectionSynchronizer( model );
      return model;
    },

    isPublic : true,

    properties : [ "bounds", "text", "image" ],

    events : [ "Selection" ]

  } );

}());