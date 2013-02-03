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
    },

    onSelection : function() {
      rap.getRemoteObject( this.model ).notify( "Selection" );
    }

  };

}());