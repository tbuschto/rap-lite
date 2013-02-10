(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.ViewFactory = {

    createView : function( modelName, model ) {
      var result = null;
      var providers = rwt.views.ViewProviderRegistry.getProviders( modelName );
      if( providers ) {
        var i = 0;
        while( !result && i < providers.length ) {
          if( _.isFunction( providers[ i ].accept ) ) {
            if( providers[ i ].accept( model ) ) {
              result = providers[ i ].create( model );
            }
          } else {
            result = providers[ i ].create( model );
          }
          i++;
        }
      }
      return result;
    }

  };

}());