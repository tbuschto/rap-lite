(function(){
  'use strict';

  namespace( "rwt.theme" );

  /**
   * or [ element, classes ]
   * or [ classes ]
   * or [ element ]
   * @returns {}
   */
  rwt.theme.StyleSelectorItem = function() {
    var element, classes;
    if( _.isString( arguments[ 0 ] ) ) {
      element = arguments[ 0 ], classes = arguments[ 1 ];
    } else {
      classes = arguments[ 0 ];
    }
    if( _.isString( element ) ) {
      this._element = element;
    }
    if( _.isArray( classes ) ) {
      this._classes = classes.concat().sort();
    }
  };

  rwt.theme.StyleSelectorItem.prototype = {

    _element : null,
    _classes : [],

    toString : function() {
      var result = [];
      if( this._element == null && this._classes.length === 0 ) {
        throw new Error( "Item selects nothing" );
      }
      if( this._element != null ) {
        result.push( this._element );
      }
      result = result.concat( this._classes );
      return result.join( "" );
    }

  };

  rwt.theme.StyleSelectorItem.fromTheme = function( element, conditions ) {
    var classes = [];
    for( var i = 0; i < conditions.length; i++ ) {
      var condition = conditions[ i ];
      if( conditionToClass[ condition ] ) {
        condition = conditionToClass[ condition ];
      } else {
        var firstChar = condition.charAt( 0 );
        if( firstChar === "[" || firstChar === ":" ) {
          condition = "." + condition.slice( 1 );
        }
      }
      classes.push( condition );
    }
    return new rwt.theme.StyleSelectorItem( "." + element, classes );
  };

  var conditionToClass = {
    ":pressed" : ":hover:active"
  };


}());