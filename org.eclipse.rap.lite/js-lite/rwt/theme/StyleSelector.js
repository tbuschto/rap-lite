(function(){
  'use strict';

  namespace( "rwt.theme" );

  /**
   *
   * @param {string|StyleSelectorItem|[(string|StyleSelectorItem)*]} arg
   * @returns {}
   */
  rwt.theme.StyleSelector = function( arg ) {
    this._items = _.isArray( arg ) ? arg.concat() : [ arg ];
  };

  rwt.theme.StyleSelector.prototype = {

    toString : function( prefixed ) {
      var result = prefixed ? [ "." + rwt.theme.StyleUtil.DISPLAY_CLASS ] : [];
      _.forEach( this._items, function( item ) {
        result.push( item.toString() );
      } );
      return result.join( " " );
    }

  };

}());