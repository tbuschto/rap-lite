(function(){
  'use strict';

  namespace( "rwt.theme" );

  var StyleUtil = rwt.theme.StyleUtil;

  rwt.theme.StyleRule = Backbone.Model.extend( {

    constructor : function( selector, attributes ) {
      Backbone.Model.apply( this, [ attributes ] );
      if( selector instanceof rwt.theme.StyleSelector ) {
        this.selector = selector;
      } else {
        this.selector = new rwt.theme.StyleSelector( selector );
      }
      this.selectorString = this.selector.toString();
    },

    toString : function() {
      var selectorStr = this.selector.toString( true );
      var result = [ selectorStr + " {\n" ];
      for( var property in this.attributes ) {
        var cssValue = StyleUtil.toCssString( property, this.get( property ) );
        var cssProperty = StyleUtil.fixPropertyName( property );
        if( cssValue != null && cssProperty != null ) {
          result.push( "  ", cssProperty, ": ", cssValue, ";\n" );
        }
      }
      result.push( "}" );
      return result.join( "" );
    }

  } );

}());