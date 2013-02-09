(function(){
  'use strict';

  namespace( "rwt.theme" );

  rwt.theme.StyleSheetGenerator = {

    _parser : null,

    _valueMapping : {
      "background-color" : "colors",
      "border" : "borders",
      "padding" : "boxdims",
      "font" : "fonts",
      "cursor" : "cursors",
      "background-gradient" : "gradients",
      "background-image" : "images",
      "border-radius" : "boxdims",
      "spacing" : "dimensions"
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
        parser[ element ]( styleSheet, widgetSheet ? widgetSheet.getRules() : null );
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
            var selectorItem = rwt.theme.StyleSelectorItem.fromTheme( element, condValue[ 0 ] );
            var rule = result.getRule( selectorItem );
            var value  = this._resolveValue( property, condValue[ 1 ], theme );
            if( property === "background-image" ) {
              if( value ) {
                value = [ "rwt-resources/themes/images/" + condValue[ 1 ] ].concat( value );
                rule.set( property, value );
              }
              value  = this._resolveValue( "background-gradient", condValue[ 1 ], theme );
              if( value ) {
                rule.set( "background", value );
              }
            } else {
              rule.set( property, value );
            }
          }
        }
      }
      return result;
    },

    _resolveValue : function( property, value, theme ) {
      var result;
      if( this._valueMapping[ property ] ) {
        result = theme.values[ this._valueMapping[ property ] ][ value ];
      } else {
        result = value;
      }
      return result;
    }

  };

}());