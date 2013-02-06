(function(){
  'use strict';

  namespace( "rwt.theme" );

  rwt.theme.StyleUtil = {

    DISPLAY_SELECTOR : [ {
      "element" : ".rap-display",
      "classes" : []
    } ],

    DISPLAY_CLASS : "rap-display",

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
        //var item = item.concat();
        var itemStr = item.element ? item.element  : "";
        itemStr += item.classes.sort().join( "" );
        result.push( itemStr );
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
      }
    }

  };

}());