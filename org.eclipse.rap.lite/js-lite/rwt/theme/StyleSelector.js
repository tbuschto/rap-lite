(function(){
  'use strict';

  namespace( "rwt.theme" );

  /**
   *                classes,   items,     selectores
   * @param {string|[class*]|[[class*]*|[[[classes]*]*]*} arg
   * @returns {}
   */
  rwt.theme.StyleSelector = function( arg ) {
    this._selectorList = this._createSelectorsArray( arg );
  };

  rwt.theme.StyleSelector.prototype = {

    toString : function( forBrowser ) {
      var result = [];
      for( var i = 0; i < this._selectorList.length; i++ ) {
        result.push( this._selectorToString( this._selectorList[ i ], forBrowser ) );
      }
      return result.join( ", " );
    },

    hasClass : function( str ) {
      return _.flatten( this._selectorList ).indexOf( str ) != -1;
    },

    /**
     *
     * mod.addChildItem : [ element ] // note affected by other mods
     * mod.ReplaceElement : string
     * mod.addClass : string
     */
    clone : function( mod ) {
      var result = cloneArrayDeep( this._selectorList );
      _.forEach( result, function( selector ) {
        _.forEach( selector, function( item ) {
          modSelectorItem( item, mod );
        } );
        modSelector( selector, mod );
      } );
      return result;
    },

    getFirstElement : function() {
      return this._selectorList[ 0 ][ 0 ][ 0 ];
    },

    isKeyframes : function() {
      return this.getFirstElement().slice( 0, 10 ) === "@keyframes";
    },

    _selectorToString : function( elements, prefix ) {
      var result;
      if( this.isKeyframes() ) {
        result = rwt.theme.StyleUtil.fixKeyframesSelector( this.getFirstElement() );
      } else {
        result = [];
        for( var i = 0; i < elements.length; i++ ) {
          rwt.theme.StyleUtil.fixSelector( elements[ i ] );
          result.push( elements[ i ].join( "" ) );
        }
        result = result.join( " > " );
        if( prefix ) {
          result = "." + rwt.theme.StyleUtil.DISPLAY_CLASS + " " + result;
        }
      }
      return result;
    },

    _createSelectorsArray : function( arg ) {
      var result;
      if( _.isString( arg ) ) {
        result = this._selectorFromString( arg );
      } else if( _.isArray( arg ) && arg.length > 0 ) {
        if( _.isArray( arg[ 0 ] ) ) {
          if( _.isArray( arg[ 0 ][ 0 ] ) ) {
            result = []; // first layer(list) is assumed to be already sorted
            for( var i = 0; i < arg.length; i++ ) {
              result[ i ] = this._sortClassesInElements( arg[ i ] );
            }
          } else {
            result = [ this._sortClassesInElements( arg ) ];
          }
        } else { // array of elements
          result = [ [ this._sortClasses( arg.concat() ) ] ];
        }
      } else {
        throw new Error( "Invalid selector input" );
      }
      return result;
    },

    _selectorFromString : function( str ) {
//      var result = str.split( "," );
//      for( var i = 0; i < result.length; i++ ) {
//        // TODO
//      }
      return [ [ [ str ] ] ];
    },

    _sortClassesInElements : function( elements ) {
      var result = [];
      for( var i = 0; i < elements.length; i++ ) {
        result[ i ] = this._sortClasses( elements[ i ].concat() );
      }
      return result;
    },

    _sortClasses : function( arr ) {
      var el = null;
      if( isElement( arr[ 0 ] ) ) {
        el = arr.shift();
      }
      var result = arr.sort();
      if( el ) {
        result.unshift( el );
      }
      return result;
    }


  };

  rwt.theme.StyleSelector.fromTheme = function( element, conditions ) {
    var classes = [ "." + element ];
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
    return new rwt.theme.StyleSelector( classes );
  };

  var pseudoClasses = {
    ":pressed" : true, // converted to active on render
    ":hover" : true,
    ":active" : true,
    ":disabled" : true
  };

  var cloneArrayDeep = function( arr ) {
    var result  = arr.concat();
    for( var i = 0; i < result.length; i++ ) {
      if( _.isArray( result[ i ] ) ) {
        result[ i ] = cloneArrayDeep( result[ i ] );
      }
    }
    return result;
  };

  var modSelector = function( selector, mod ) {
    if( mod.addChildItem ) {
      selector.push( mod.addChildItem );
    }
  };

  var modSelectorItem = function( item, mod ) {
    if( mod.replaceElement ) {
      if( isElement( item[ 0 ] ) ) {
        item[ 0 ] = mod.replaceElement;
      } else {
        item.unshift( mod.replaceElement );
      }
    }
    if( mod.addClass ) {
      item.push( mod.addClass );
    }
  };

  var isElement = function( str ) {
    var firstChar = str.charAt( 0 );
    var secondChar = str.charAt( 1 );
    var firstIsClass = firstChar === "." || firstChar === ":";
    var firstIsPseudoElement = firstChar === "." && secondChar === secondChar.toUpperCase();
    return !firstIsClass || firstIsPseudoElement;
  };

}());