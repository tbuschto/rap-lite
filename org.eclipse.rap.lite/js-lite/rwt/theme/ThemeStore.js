(function(){
  'use strict';

  namespace( "rwt.theme" );

  rwt.theme.ThemeStore = Backbone.Model.extend( {} );

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
          converters :{
            "text application/json" : JSON.parse
          },
          dataType: "application/json",
          contentType : "application/json; charset=UTF-8",
          success : function( theme ){
            rwt.theme.StyleSheetGenerator.generateFromTheme( theme );
          }
        } );
      }
    }

  } );


}());