(function(){
  'use strict';

  namespace( "rwt.widgets" );

  rwt.widgets.Composite = rwt.widgets.Control.extend( {

    name : "Composite",

    defaults : {
      children : []
    },

    getChildren : function() {
      var result = this.get( "children" ).concat();
      _.forEach( result, function( id, i ) {
        result[ i ] = rap.getObject( id );
      } );
      return result;
    }

  } );

  rwt.remote.HandlerRegistry.add( "rwt.widgets.Composite", {

    factory : function( properties ) {
      var model = new rwt.widgets.Composite(
        _.pick( properties, [ "parent", "style", "customVariant" ] ),
        { parse : true }
      );
      model.view = rwt.views.ViewFactory.createView( "rwt.widgets.Composite", model );
      return model;
    },

    isPublic : true,

    properties : rwt.widgets.Control.handlerProperties

  } );

}());