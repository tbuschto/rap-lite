(function(){
  'use strict';

  namespace( "rwt.widgets" );

  rwt.widgets.Shell = rwt.widgets.Control.extend( {

    name : "Shell",

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

  rwt.remote.HandlerRegistry.add( "rwt.widgets.Shell", {

    factory : function( properties ) {
      var model = new rwt.widgets.Shell(
        _.pick( properties, [ "parent", "style", "customVariant" ] ),// custom variant may be set later!
        { parse : true }
      );
      model.view = rwt.views.ViewFactory.createView( "rwt.widgets.Shell", model );
      return model;
    },

    isPublic : true,

    properties : rwt.widgets.Control.handlerProperties

  } );

}());