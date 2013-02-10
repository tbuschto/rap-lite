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
      this.element = element;
    }
    if( _.isArray( classes ) ) {
      this._classes = classes.concat().sort();
    }
  };

  rwt.theme.StyleSelectorItem.prototype = {

    element : null,
    _classes : [],

    getClasses : function() {
      return this._classes.concat();
    },

    hasClass : function( className ) {
      return _.indexOf( this._classes, className, true ) !== -1;
    },

    toString : function( forBrowser ) {
      var result = [];
      if( this.element == null && this._classes.length === 0 ) {
        throw new Error( "Item selects nothing" );
      }
      if( this.element != null ) {
        result.push( this.element );
      }
      result = result.concat( this._classes );
      rwt.theme.StyleUtil.fixSelector( result );
      return result.join( "" );
    }

  };

  rwt.theme.StyleSelectorItem.fromTheme = function( element, conditions ) {
    var classes = [];
    for( var i = 0; i < conditions.length; i++ ) {
      var condition = conditions[ i ];
      if( !pseudoClasses[ condition ] ) {
        var firstChar = condition.charAt( 0 );
        if( firstChar === "[" || firstChar === ":" ) {
          condition = "." + condition.slice( 1 );
        }
      }
      classes.push( condition );
    }
    return new rwt.theme.StyleSelectorItem( "." + element, classes );
  };

  var pseudoClasses = {
    ":pressed" : true, // converted to active on render
    ":hover" : true,
    ":active" : true,
    ":disabled" : true
  };

}());