(function(){
  'use strict';

  namespace( "rwt.theme" );

  rwt.theme.StyleSheetGenerator = {

    _parser : null,

    // TODO: Make a class:
    _valueParser : {
      "background-color" : function( value, theme ) {
        var rgb = theme.values.colors[ value ];
        return "rgb(" + rgb.slice( 0, 3 ).join( "," ) + ")";
      }
    },

    getParser : function() {
      // TODO : allow multiple parser for one element
      if( this._parser == null ) {
        this._parser = {};
        for( var key in rwt.views ) {
          var View = rwt.views[ key ];
          if( View.themeParser ) {
            _.extend( this._parser, View.themeParser );
          }
        }
      }
      return this._parser;
    },

    generateFromTheme : function( theme ) {
      var styleSheet = new rwt.theme.StyleSheet();
      var parser = this.getParser();
      for( var element in parser ) {
        var widgetSheet = this._createWidgetSheet( theme, element );
        if( widgetSheet ) {
          var rules = widgetSheet.getRules();
          for( var i = 0; i < rules.length; i++ ) {
            parser[ element ]( styleSheet, rules[ i ][ 0 ], rules[ i ][ 1 ] );
          }
        }
      }
      styleSheet.render();
    },

    _createWidgetSheet : function( theme, element ) {
      var result = null;
      var props = theme.theme[ element ];
      if( props ) {
        result = new rwt.theme.StyleSheet();
        for( var property in props ) {
          var conditionalValues = props[ property ];
          for( var i = 0; i < conditionalValues.length; i++ ) {
            var condValue = conditionalValues[ i ];
            var selector = rwt.theme.StyleUtil.createSelectorArray( element, condValue[ 0 ] );
            var value  = this._parseValue( property, condValue[ 1 ], theme );
            result.getRule( selector ).set( property, value );
          }
        }
      }
      return result;
    },

    _parseValue : function( property, value, theme ) {
      var result;
      if( this._valueParser[ property ] ) {
        result = this._valueParser[ property ]( value, theme );
      } else {
        result = value;
      }
      return result;
    }

  };

}());