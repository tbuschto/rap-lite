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

    addRulesToSheet : function( styleSheet, rules, filter ) {
      _.forEach( rules, function( rule ) {
        var selector = rule.selector;
        var newRule = new rwt.theme.StyleRule( selector, _.pick( rule.attributes, filter ) );
        styleSheet.addRule( newRule );
      } );
    },

    parseIconRules : function( styleSheet, rules, widgetClass ) {
      _.forEach( rules, function( rule ) {
        var bgImage = rule.get( "background-image" );
        if( bgImage ) {
          var newSelector = rule.selector.clone( {
            replaceElement : widgetClass,
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
      return result;
    },

    fixPropertyName : function( property ) {
      var result = property;
      var map = this._cssPropertyMapping[ Client.getEngine() ];
      if( map && map[ property ] ) {
        result = map[ property ];
      }
      return result;
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
        return "#" + rwt.util.Colors.rgbToHexString( rgba );
      },
      "color" : function( rgba ) {
        return "#" + rwt.util.Colors.rgbToHexString( rgba );
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
        if( font.italc ) {
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
        "user-select" : "-webkit-user-select"
      },
      "gecko" : {
        "user-select" : "-moz-user-select"
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