(function(){
  'use strict';

  namespace( "rwt.theme" );

  var StyleUtil = rwt.theme.StyleUtil;

  rwt.theme.StyleRule = Backbone.Model.extend( {

    toString : function( selector ) {
      var prefixedSelector = [ "." + StyleUtil.DISPLAY_CLASS ].concat( selector );
      var selectorStr = rwt.theme.StyleUtil.createSelectorString( prefixedSelector );
      var result = [ selectorStr + " {\n" ];
      for( var property in this.attributes ) {
        result.push( "  ", property, ": " );
        result.push( StyleUtil.toCssString( property, this.get( property ) ), ";\n" );
      }
      result.push( "}" );
      return result.join( "" );
    }

  } );

}());