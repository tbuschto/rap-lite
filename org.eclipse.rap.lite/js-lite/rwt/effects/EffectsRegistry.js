namespace( "rwt.effects" );

(function(){
  'use strict';

  rwt.effects.EffectsRegistry = {

    _store : [],

    add : function( provider ) {
      this._store.push( provider );
    },

    hook : function( view ) {
      for( var i = 0; i < this._store.length; i++ ) { // OPtimize
        if( this._store[ i ].supported.indexOf( view.name ) !== -1 ) {
          this._store[ i ].accept( view );
        }
      }
    }

  };

}());