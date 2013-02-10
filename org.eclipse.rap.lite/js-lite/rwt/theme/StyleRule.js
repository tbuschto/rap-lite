(function(){
  'use strict';

  namespace( "rwt.theme" );

  var StyleUtil = rwt.theme.StyleUtil;

  rwt.theme.StyleRule = Backbone.Model.extend( {

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
        var cssValue = StyleUtil.toCssString( property, this.get( property ) );
        var cssProperty = StyleUtil.fixPropertyName( property );
        if( property === "background-color" ) {
//          console.log( this.selectorString, cssProperty, cssValue );
        }
        if( cssValue != null && cssProperty != null ) {
          result.push( "  ", cssProperty, ": ", cssValue, ";\n" );
        }
      }
      result.push( "}" );
      return result.join( "" );
    }

  } );

}());