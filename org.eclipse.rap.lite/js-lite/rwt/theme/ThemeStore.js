(function(){
  'use strict';

  rwt.remote.HandlerRegistry.add( "rwt.theme.ThemeStore", {

    factory : function(){ return {}; },

    service : true,

    methods : [
      "loadActiveTheme"
    ],

    methodHandler : {
      "loadActiveTheme" : function( object, params ) {
        $.ajax( {
          type : "GET",
          url : params.url,
          success : function( theme ){
            rwt.theme.StyleSheetGenerator.generateFromTheme( JSON.parse( theme ) );
          }
        } );
      }
    }

  } );


}());