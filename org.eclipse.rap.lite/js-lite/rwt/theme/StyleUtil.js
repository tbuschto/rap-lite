(function(){
  'use strict';

  namespace( "rwt.theme" );

  var Client = rwt.client.Client;
  var StyleSelector = rwt.theme.StyleSelector;
  var StyleSelectorItem = rwt.theme.StyleSelectorItem;

  rwt.theme.StyleUtil = {

    DISPLAY_CLASS : "rap-display",

    BROWSER_PREFIX : ( function() {
      var result;
      switch( Client.getEngine() ) {
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

    _activeFix : Client.isMshtml() || Client.isNewMshtml(),
    _keyframesPrefix : !Client.isMshtml(),

    createSelectorString : function( selectorArr, prefixed ) {
      if( selectorArr.length === 0 ) {
        throw new Error( "Empty selector list" );
      }
      var result = [];
      _.forEach( selectorArr, function( selector ) {
        result.push( selector.toString( prefixed ) );
      } );
      return result.join( ", " );
    },

    parseIconRules : function( styleSheet, rules, widgetClass, viewClass ) {
      _.forEach( rules, function( rule ) {
        var bgImage = rule.get( "background-image" );
        if( bgImage ) {
          var newSelector = rule.selector.clone( {
            replaceElement : widgetClass,
            addClass : viewClass,
            addChildItem : [ rule.selector.getFirstElement() ]
          } );
          styleSheet.getRule( newSelector ).set( {
            "background-image" : bgImage,
            "width" : bgImage[ 1 ],
            "height" : bgImage[ 2 ]
          } );
        }
      } );
    },

    parseSpacing : function( styleSheet, rules, subWidgets ) {
      // TODO use margin-left instead, overwrite with :first-child to 0
      _.forEach( rules, function( rule ) {
        var selector = rule.selector;
        if( rule.has( "spacing" ) ) {
          styleSheet.getRule( subWidgets ).set( {
            "margin-right" : rule.get( "spacing" )
          } );
        }
      } );
    },

    toCssString : function( property, value ) {
      var result = value;
      if( this._cssStringCreator[ property ] ) {
        var result = this._cssStringCreator[ property ]( value );
      }
      if( result instanceof Object ) {
        result = this.ruleBodyToString( value, false, "  " );
      }
      return result;
    },

    fixPropertyName : function( property ) {
      var result = property;
      var map = this._cssPropertyMapping[ Client.getEngine() ];
      if( map && map[ property ] ) {
        result = map[ property ];
      } else if( property.slice( 0, 10 ) === "@keyframes" ) {
        result = "@keyframes";
      }
      return result;
    },

    ruleBodyToString : function( attributes, isKeyframes, indent ) {
      var result = [ " {\n" ];
      for( var property in attributes ) {
        var cssValue = this.toCssString( property, attributes[ property ] );
        var cssProperty = this.fixPropertyName( property );
        if( cssValue != null && cssProperty != null ) {
          if( isKeyframes ) {
            result.push( indent, "  ", cssProperty, " ", cssValue, "\n" );
          } else {
            result.push( indent, "  ", cssProperty, ": ", cssValue, ";\n" );
          }
        }
      }
      result.push( indent + "}" );
      return result.join( "" );
    },

    applyBrowserFixes : function( $el ) {
      if( this._activeFix ) {
        this._fixActivePseudoClass( $el );
      }
    },

    _fixActivePseudoClass : function( $el ) {
      $el.on( "mousedown", this._eventHandler.addActiveClass );
      $el.on( "mouseup", this._eventHandler.removeActiveClass );
      $el.on( "mouseleave", this._eventHandler.addAbandonedClass );
      $el.on( "mouseenter", this._eventHandler.removeAbandonedClass );
    },

    fixSelector : function( selectorItemArray ) {
      var pressed = _.indexOf( selectorItemArray, ":pressed" );
      if( pressed !== -1 ) {
        if( this._activeFix ) {
          selectorItemArray[ pressed ] = ":hover.active";
        } else {
          selectorItemArray[ pressed ] = ":hover:active";
        }
      }
    },

    fixKeyframesSelector : function( str ) {
      var prefix = this._keyframesPrefix ? this.BROWSER_PREFIX : "";
      return "@" + prefix + str.slice( 1 );
    },

    _eventHandler : {
      addActiveClass : function( event ) {
        $( this ).addClass( "active" );
      },
      removeActiveClass : function( event ) {
        $( this ).removeClass( "active" );
      },
      addAbandonedClass : function( event ) {
        if( $( this ).hasClass( "active" ) ) {
          $( this ).removeClass( "active" );
          $( this ).addClass( "abandoned" );
        }
      },
      removeAbandonedClass : function( event ) {
        if( $( this ).hasClass( "abandoned" ) ) {
          $( this ).addClass( "active" );
          $( this ).removeClass( "abandoned" );
        }
      },
      clearAbandonedClass : function( event ) {
        $( this ).removeClass( "abandoned" );
      }
    },

    _init : function() {
      $( document ).on( "mouseup", ".abandoned", this._eventHandler.clearAbandonedClass );
    },

    _cssStringCreator : {
      "background-image" : function( imageArr ) {
        return "url(/" + imageArr[ 0 ] + ")";
      },
      "background-color" : function( rgba ) {
        var result = _.isString( rgba ) ? rgba : "#" + rwt.util.Colors.rgbToHexString( rgba );
        return result === "undefined" ? "transparent" : result;
      },
      "color" : function( rgba ) {
        var result = _.isString( rgba ) ? rgba : "#" + rwt.util.Colors.rgbToHexString( rgba );
        return result === "undefined" ? "inherit" : result;
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
      "width" : function( value ) {
        return numericConvert( value );
      },
      "border-width" : function( px ) {
        return px + "px";
      },
      "height" : function( value ) {
        return numericConvert( value );
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
        if( font.italic ) {
          result.push( "italic" );
        }
        result.push( font.size + "px" );
        result.push( "'" + font.family.join( "','" ) + "'" );
        return result.join( " " );
      },
      "background" : function( gradientObject ) {
        var result = null;
        if( Client.supportsCss3() ) {
          result = rwt.theme.StyleUtil._createCssGradient( gradientObject );
        } else if( Client.supportsSvg() ) {
          result = rwt.theme.StyleUtil._createSvgGradient( gradientObject );
        }
        return result;
      },
      "border-radius" : function( radii ) {
        return radii.join( "px " ) + "px";
      }
    },

    _cssPropertyMapping : {
      "webkit" : {
        "user-select" : "-webkit-user-select",
        "animation" : "-webkit-animation",
        "animation-fill-mode" : "-webkit-animation-fill-mode",
        "transform" : "-webkit-transform",
        "transition" : "-webkit-transition"
      },
      "gecko" : {
        "user-select" : "-moz-user-select",
        "animation" : "-moz-animation",
        "animation-fill-mode" : "-moz-animation-fill-mode",
        "transition" : "-moz-transition"
      }
    },

    _createCssGradient : function( gradientObject ) {
      var args = [ gradientObject.horizontal === true ? "0deg" : "-90deg" ];
      for( var i = 0; i < gradientObject.colors.length; i++ ) {
        var position = gradientObject.percents[ i ] + "%";
        var color = gradientObject.colors[ i ];
        args.push( color + " " + position );
      }
      return rwt.theme.StyleUtil.BROWSER_PREFIX + "linear-gradient( " + args.join() + ")";
    },

    _createSvgGradient : function( gradientObject ) {
      var result = [ "url(/lite/gradient.svg?colors=" ];
      var colors = [];
      for( var i = 0; i < gradientObject.colors.length; i++ ) {
        colors[ i ] = gradientObject.colors[ i ].slice( 1 );
      }
      result.push( colors.join( "," ) );
      result.push( "&stops=", gradientObject.percents.join( "," ) );
      if( gradientObject.horizontal === true  ) {
        result.push( "&horizontal=true" );
      }
      result.push( ")" );
      return result.join("");
    }

  };

  var numericConvert = function( value ) {
    if( _.isString( value ) ) {
      return value;
    } else {
      return value + "px";
    }
  };

  rwt.theme.StyleUtil._init();

}());
