(function(){
  'use strict';

  namespace( "rwt.scroller" );

  rwt.scroller.ScrollerProviderRegistry = {

    _provider : [],

    add : function( provider ) {
      if( _.isFunction( provider.accept ) ) {
        this._provider.unshift( provider );
      } else {
        this._provider.push( provider );
      }
    },

    getProviders : function( model ) {
      return this._provider;
    }

  };

}());