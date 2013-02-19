(function(){
  'use strict';

  namespace( "rwt.scroller" );

  rwt.scroller.ScrollerFactory = {

    createScroller : function( view ) {
      var result = null;
      var providers = rwt.scroller.ScrollerProviderRegistry.getProviders();
      if( providers ) {
        var i = 0;
        while( !result && i < providers.length ) {
          if( _.isFunction( providers[ i ].accept ) ) {
            if( providers[ i ].accept( view ) ) {
              result = providers[ i ].create( view );
            }
          } else {
            result = providers[ i ].create( view );
          }
          i++;
        }
      }
      return result;
    }

  };

}());