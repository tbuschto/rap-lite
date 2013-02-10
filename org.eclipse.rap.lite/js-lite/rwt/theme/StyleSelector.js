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

    getItem : function( index ) {
      return this._items[ index ];
    },

    toString : function( forBrowser ) {
      var result = forBrowser ? [ "." + rwt.theme.StyleUtil.DISPLAY_CLASS ] : [];
      _.forEach( this._items, function( item ) {
        result.push( item.toString( forBrowser ) );
      } );
      return result.join( " " );
    }

  };

}());