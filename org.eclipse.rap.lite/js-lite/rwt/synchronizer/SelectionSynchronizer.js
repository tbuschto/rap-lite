(function(){
  'use strict';

  namespace( "rwt.synchronizer" );

  rwt.synchronizer.SelectionSynchronizer = function( model ) {
    model.on( "change:selection", this.onChangeSelection );
    model.on( "selection", _.partial( this.onSelection, model ) );
  };

  rwt.synchronizer.SelectionSynchronizer.prototype = {

    onChangeSelection : function( model, value, options ) {
      if( !options.nosync ) {
        rap.getRemoteObject( model ).set( "selection", value );
      }
    },

    onSelection : function( model ) {
      rap.getRemoteObject( model ).notify( "Selection" );
    }

  };

}());