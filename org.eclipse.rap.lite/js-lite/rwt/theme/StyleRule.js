(function(){
  'use strict';

  namespace( "rwt.theme" );

  var StyleUtil = rwt.theme.StyleUtil;

  rwt.theme.StyleRule = Backbone.Model.extend( {

    constructor : function( selector, attributes ) {
      Backbone.Model.apply( this, [ attributes ] );
      if( _.isString( selector ) ) {
        this._selector = [ new rwt.theme.StyleSelectorItem( selector ) ];
        this.selectorString = selector;
      } else if( _.isArray( selector ) ) {
        this._selector = selector.concat();
        this.selectorString = rwt.theme.StyleUtil.createSelectorString( selector );
      } else {
        this._selector = [ selector ];
        this.selectorString = this._selector[ 0 ].toString();
      }
    },

    getSelector : function() {
      if( this._selector.length === 1 ) {
        return this._selector[ 0 ];
      } else {
        return this._selector.concat();
      }
    },

    toString : function() {
      var prefixedSelector = [ StyleUtil.DISPLAY_SELECTOR ].concat( this._selector );
      var selectorStr = rwt.theme.StyleUtil.createSelectorString( prefixedSelector );
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