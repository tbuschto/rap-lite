(function(){
  'use strict';

  namespace( "rwt.theme" );

  var StyleUtil = rwt.theme.StyleUtil;

  rwt.theme.StyleRule = Backbone.Model.extend( {

    /**
     *
     * @returns {}
     */
    constructor : function( selectors, attributes ) {
      Backbone.Model.apply( this, [ attributes ] );
      this._selectorArr = rwt.theme.StyleUtil.createSelectorsArray( selectors );
      this.selectorString = rwt.theme.StyleUtil.createSelectorString( this._selectorArr );
    },

    getSelector : function( index ) {
      if( _.isNumber( index ) ) {
        return this._selectorArr[ index ];
      } else {
        return this._selectorArr.concat();
      }
    },

    toString : function() {
      var selectorStr = rwt.theme.StyleUtil.createSelectorString( this._selectorArr, true );
      var result = [ selectorStr + " {\n" ];
      for( var property in this.attributes ) {
        result.push( "  ", StyleUtil.fixPropertyName( property ), ": " );
        result.push( StyleUtil.toCssString( property, this.get( property ) ), ";\n" );
      }
      result.push( "}" );
      return result.join( "" );
    }

  } );

}());