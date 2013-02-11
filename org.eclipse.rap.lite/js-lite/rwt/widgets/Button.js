(function(){
  'use strict';

  namespace( "rwt.widgets" );

  rwt.widgets.Button = rwt.widgets.Control.extend( {

    defaults : {
      "selection" : false
    },

    select : function() {
      this.trigger( "logic:selection" );
      this.trigger( "selection" );
    }

  } );

  rwt.remote.HandlerRegistry.add( "rwt.widgets.Button", {

    factory : function( properties ) {
      var model = new rwt.widgets.Button(
        _.pick( properties, [ "parent", "style", "customVariant" ] ),
        { parse : true }
      );
      model.view = rwt.views.ViewFactory.createView( "rwt.widgets.Button", model );
      if( model.style.CHECK || model.style.TOGGLE ) {
        new rwt.logic.ToggleLogic( model );
      } else if( model.style.RADIO ) {
        new rwt.logic.RadioLogic( model );
      }
      new rwt.synchronizer.SelectionSynchronizer( model );
      return model;
    },

    isPublic : true,

    properties : [ "bounds", "text", "image", "selection" ],

    events : [ "Selection" ]

  } );

}());