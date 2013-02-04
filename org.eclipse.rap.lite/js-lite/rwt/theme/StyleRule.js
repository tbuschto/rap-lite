(function(){
  'use strict';

  namespace( "rwt.theme" );

  var StyleUtil = rwt.theme.StyleUtil;

  rwt.theme.StyleRule = function( selector ) {
    this._properties = {};
    this._selector = selector;
  };

  rwt.theme.StyleRule.prototype = {

    setProperty : function( property, value ) {
      this._properties[ property ] = value;
    },

    toString : function() {
      var result = "." + StyleUtil.DISPLAY_CLASS + " " + this._selector + " {\n";
      for( var property in this._properties ) {
        result += "  " + property + ": " + this._properties[ property ] + ";\n"
      }
      result += "}";
      return result;
    }

  };

}());