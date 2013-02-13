(function(){
  'use strict';

  namespace( "rwt.theme" );

  rwt.theme.ThemeStore = {

   _map : {},

    add : function( parsers ) {
      for( var key in parsers ) {
        this._addParser( key, parsers[ key ] );
      }
    },

    _addParser : function( element, parser ) {
      if( !this._map[ element ] ) {
        this._map[ element ] = [];
      }
      this._map[ element ].push( parser );
    },

    getAllParser : function( element ) {
      return this._map;
    }

  };

  rwt.remote.HandlerRegistry.add( "rwt.theme.ThemeStore", {

    factory : function() {
      return rwt.theme.ThemeStore;
    },

    service : true,

    methods : [
      "loadActiveTheme"
    ],

    methodHandler : {
      "loadActiveTheme" : function( object, params ) {
        $.ajax( {
          type : "GET",
          url : "/" + params.url,
          converters :{
            "text application/json" : JSON.parse
          },
          dataType: "application/json",
          contentType : "application/json; charset=UTF-8",
          success : function( theme ) {
            rwt.theme.StyleSheetGenerator.generateFromTheme( theme );
          }
        } );
      }
    }

  } );


}());