(function(){
  'use strict';

  namespace( "rwt.theme" );

  rwt.theme.StyleUtil = {

    DISPLAY_SELECTOR : [ ".rap-display" ],

    DISPLAY_CLASS : "rap-display",

    BROWSER_PREFIX : ( function() {
      var result;
      switch( rwt.client.Client.getEngine() ) {
        case "gecko":
          result = "-moz-";
        break;
        case "webkit":
          result = "-webkit-";
        break;
        default:
          result = "";
        break;
      }
      return result;
    }() ),

    createSelectorArray : function( element, conditions ) {
      var selectorItem = {
        "element" : "." + element,
        "classes" : []
      };
      for( var i = 0; i < conditions.length; i++ ) {
        var condition = conditions[ i ];
        if( condition.charAt( 0 ) === "[" ) {
          condition = "." + condition.slice( 1 );
        }
        if( condition === ":pressed" ) {
          condition = ":hover:active";
        }
        selectorItem.classes.push( condition );
      }
      return [ selectorItem ];
    },

    createSelectorString : function( selectorArr ) {
      var result = [];
      if( selectorArr.length === 0 ) {
        throw new Error( "No items to select" );
      }
      _.forEach( selectorArr, function( item ) {
        if( _.isString( item ) ) {
          result.push( item );
        } else {
          var itemStr = item.element ? item.element  : "";
          itemStr += item.classes.sort().join( "" );
          result.push( itemStr );
        }
      } );
      return result.join( " " );
    },

    addRulesToSheet : function( styleSheet, rules, filter ) {
      _.forEach( rules, function( rule ) {
        var selector = rule.getSelector();
        var newRule = new rwt.theme.StyleRule( selector, _.pick( rule.attributes, filter ) );
        styleSheet.addRule( newRule );
      } );
    },

    toCssString : function( property, value ) {
      var result = value;
      if( this._cssStringCreator[ property ] ) {
        var result = this._cssStringCreator[ property ]( value );
      }
      return result;
    },

    fixPropertyName : function( property ) {
      var result = property;
      var map = this._cssPropertyMapping[ rwt.client.Client.getEngine() ];
      if( map && map[ property ] ) {
        result = map[ property ];
      }
      return result;
    },

    _cssStringCreator : {
      "background-color" : function( rgba ) {
        return "rgb(" + _.first( rgba, 3 ).join( "," ) + ")";
      },
      "border" : function( border ) {
        var result;
        if( border.width === 0 ) {
          result = "none";
        } else {
          result = border.width + "px " + border.style + " " + border.color;
        }
        return result;
      },
      "padding" : function( padding ) {
        return padding.join( "px " ) + "px";
      },
      "margin-right" : function( pixel ) {
        return pixel + "px";
      },
      "font" : function( font ) {
        var result = [];
        if( font.bold ) {
          result.push( "bold" );
        }
        if( font.italc ) {
          result.push( "italic" );
        }
        result.push( font.size + "px" );
        result.push( "'" + font.family.join( "','" ) + "'" );
        return result.join( " " );
      },
      "background" : function( gradientObject ) {
        var args = [ gradientObject.horizontal === true ? "0deg" : "-90deg" ];
        for( var i = 0; i < gradientObject.colors.length; i++ ) {
          var position = gradientObject.percents[ i ] + "%";
          var color = gradientObject.colors[ i ];
          args.push( color + " " + position );
        }
        return rwt.theme.StyleUtil.BROWSER_PREFIX + "linear-gradient( " + args.join() + ")";
      },
      "border-radius" : function( radii ) {
        return radii.join( "px " ) + "px";
      }
    },

    _cssPropertyMapping : {
      "webkit" : {
        "user-select" : "-webkit-user-select"
      },
      "gecko" : {
        "user-select" : "-moz-user-select"
      }
    }

  };

}());