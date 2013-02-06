(function(){
  'use strict';

  namespace( "rwt.theme" );

  var StyleUtil = rwt.theme.StyleUtil;

  rwt.theme.StyleRule = Backbone.Model.extend( {

    constructor : function( selector, attributes ) {
      Backbone.Model.apply( this, [ attributes ] );
      if( _.isString( selector ) ) {
        this._selector = [ {
          "element" : selector,
          "classes" : []
        } ];
        this.selectorString = selector;
      } else {
        this._selector = selector.concat();
        this.selectorString = rwt.theme.StyleUtil.createSelectorString( selector );
      }
    },

    getSelector : function() {
      return this._selector.concat();
    },

    toString : function() {
      var prefixedSelector = StyleUtil.DISPLAY_SELECTOR.concat( this._selector );
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