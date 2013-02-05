(function(){
  'use strict';

  namespace( "rwt.theme" );

  rwt.theme.StyleUtil = {

    DISPLAY_CLASS : "rap-display",

    createSelectorArray : function( element, conditions ) {
      var selectorItem = [ element ];
      for( var i = 0; i < conditions.length; i++ ) {
        var condition = conditions[ i ];
        if( condition.charAt( 0 ) === "[" ) {
          condition = "." + condition.slice( 1 );
        }
        selectorItem.push( condition );
      }
      return [ selectorItem ];
    },

    createSelectorString : function( selectorArr ) {
      var result = [];
      if( selectorArr.length === 0 ) {
        throw new Error( "No items to select" );
      }
      for( var i = 0; i < selectorArr.length; i++ ) {
        if( selectorArr[ i ] instanceof Array ) {
          var item = selectorArr[ i ].concat();
          if( item.length === 0 ) {
            throw new Error( "Item may not be empty" );
          }
          var element = [];
          if( item[ 0 ].charAt( 0 ) !== "." && item[ 0 ].charAt( 0 ) !== ":" ) {
            element.push( item.shift() );
          }
          var classes = item.sort();
          item = element.concat( classes );
          result.push( item.join( "" ) );
        } else {
          result.push( selectorArr[ i ] );
        }
      }
      return result.join( " " );
    }

  };

}());