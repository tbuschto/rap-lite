(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.ViewProviderRegistry = {

    _map : {},

    add : function( provider ) {
      var model = provider.model;
      if( !this._map[ model ] ) {
        this._map[ model ] = [];
      }
      if( _.isFunction( provider.accept ) ) {
        this._map[ model ].unshift( provider );
      } else {
        this._map[ model ].push( provider );
      }
    },

    getProviders : function( model ) {
      return this._map[ model ];
    }

  };

}());