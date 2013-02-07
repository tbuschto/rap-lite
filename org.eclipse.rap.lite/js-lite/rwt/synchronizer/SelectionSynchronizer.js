(function(){
  'use strict';

  namespace( "rwt.synchronizer" );

  rwt.synchronizer.SelectionSynchronizer = function( model ) {
    _.bindAll( this );
    this.model = model;
    this.model.on( "change:selection", this.onChangeSelection );
    this.model.on( "Selection", this.onSelection );
  };

  rwt.synchronizer.SelectionSynchronizer.prototype = {

    onChangeSelection : function() {
      rap.getRemoteObject( this.model ).set( "selection", this.model.get( "selection" ) );
    },

    onSelection : function() {
      rap.getRemoteObject( this.model ).notify( "Selection" );
    }

  };

}());