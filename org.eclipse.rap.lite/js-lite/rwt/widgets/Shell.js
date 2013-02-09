(function(){
  'use strict';

  namespace( "rwt.widgets" );

  rwt.widgets.Shell = rwt.widgets.Control.extend( {

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
        _.pick( properties, [ "parent", "style" ] ),
        { parse : true }
      );
      var view = new rwt.views.ShellView( {
        "model" : model
      } );
      model.view = view;
      return model;
    },

    isPublic : true,

    properties : [ "bounds", "children" ]

  } );

}());